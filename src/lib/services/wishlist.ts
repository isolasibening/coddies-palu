"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/services/auth";
import { getProductsByIds } from "@/lib/services/products";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type WishlistActionResult = {
  ok: boolean;
  isSaved: boolean;
  reason: string | null;
};

function revalidateWishlistViews(productId: string) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/wishlist");
}

export async function getWishlistProductIds(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => item.product_id ?? "").filter(Boolean);
}

export async function getWishlistProducts(productIds?: string[]) {
  const ids = productIds ?? (await getWishlistProductIds());

  if (ids.length === 0) {
    return [];
  }

  return getProductsByIds(ids);
}

export async function addWishlistItem(
  productId: string,
): Promise<WishlistActionResult> {
  if (!productId || !isSupabaseConfigured()) {
    return { ok: false, isSaved: false, reason: "not-configured" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, isSaved: false, reason: "unauthenticated" };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("wishlists").upsert(
    {
      user_id: user.id,
      product_id: productId,
    },
    { onConflict: "user_id,product_id" },
  );

  if (error) {
    return { ok: false, isSaved: false, reason: error.message };
  }

  revalidateWishlistViews(productId);
  return { ok: true, isSaved: true, reason: null };
}

export async function removeWishlistItem(
  productId: string,
): Promise<WishlistActionResult> {
  if (!productId || !isSupabaseConfigured()) {
    return { ok: false, isSaved: false, reason: "not-configured" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, isSaved: false, reason: "unauthenticated" };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) {
    return { ok: false, isSaved: false, reason: error.message };
  }

  revalidateWishlistViews(productId);
  return { ok: true, isSaved: false, reason: null };
}

export async function toggleWishlistItem(
  productId: string,
): Promise<WishlistActionResult> {
  if (!productId || !isSupabaseConfigured()) {
    return { ok: false, isSaved: false, reason: "not-configured" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, isSaved: false, reason: "unauthenticated" };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    return { ok: false, isSaved: false, reason: error.message };
  }

  if (data) {
    return removeWishlistItem(productId);
  }

  return addWishlistItem(productId);
}
