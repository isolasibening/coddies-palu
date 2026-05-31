"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/services/auth";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Database, SavedSearchRow } from "@/lib/types";

export type SavedSearch = {
  id: string;
  userId: string;
  keyword: string;
  categoryId: string | null;
  location: string | null;
  maxPrice: number | null;
  createdAt: string;
};

export type SavedSearchActionState = {
  error: string | null;
  success: string | null;
};

type SavedSearchInsert =
  Database["public"]["Tables"]["saved_searches"]["Insert"];

const defaultSavedSearchActionState: SavedSearchActionState = {
  error: null,
  success: null,
};

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getSafeRedirectPath(value: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/products";
  }

  if (value.startsWith("/login") || value.startsWith("/register")) {
    return "/products";
  }

  return value;
}

function parseMaxPrice(value: string) {
  if (!value) {
    return null;
  }

  const maxPrice = Number(value);

  if (!Number.isFinite(maxPrice) || maxPrice <= 0) {
    return null;
  }

  return Math.round(maxPrice);
}

function mapSavedSearchRow(row: SavedSearchRow): SavedSearch {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId ?? "",
    keyword: row.keyword ?? "",
    categoryId: row.category_id ?? row.categoryId ?? null,
    location: row.location ?? null,
    maxPrice: row.max_price ?? row.maxPrice ?? null,
    createdAt: row.created_at ?? row.createdAt ?? "",
  };
}

export async function getSavedSearches(): Promise<SavedSearch[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("saved_searches")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapSavedSearchRow);
}

export async function createSavedSearchAction(
  _previousState: SavedSearchActionState,
  formData: FormData,
): Promise<SavedSearchActionState> {
  if (!isSupabaseConfigured()) {
    return {
      ...defaultSavedSearchActionState,
      error: "Supabase belum dikonfigurasi.",
    };
  }

  const redirectTo = getSafeRedirectPath(readFormValue(formData, "redirect_to"));
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  const keyword = readFormValue(formData, "keyword");
  const categoryId = readFormValue(formData, "category_id") || null;
  const location = readFormValue(formData, "location") || null;
  const maxPrice = parseMaxPrice(readFormValue(formData, "max_price"));

  if (!keyword && !categoryId && !location && !maxPrice) {
    return {
      ...defaultSavedSearchActionState,
      error: "Isi kata kunci atau pilih filter dulu.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const insertPayload: SavedSearchInsert = {
    user_id: user.id,
    keyword,
    category_id: categoryId,
    location,
    max_price: maxPrice,
  };
  const { error } = await supabase.from("saved_searches").insert(insertPayload);

  if (error) {
    return { ...defaultSavedSearchActionState, error: error.message };
  }

  revalidatePath("/wishlist");

  return {
    error: null,
    success: "Pencarian berhasil disimpan.",
  };
}

export async function deleteSavedSearchAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirectTo=%2Fwishlist");
  }

  const savedSearchId = readFormValue(formData, "saved_search_id");
  if (!savedSearchId) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  await supabase
    .from("saved_searches")
    .delete()
    .eq("id", savedSearchId)
    .eq("user_id", user.id);

  revalidatePath("/wishlist");
}
