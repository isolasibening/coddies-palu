"use server";

import { revalidatePath } from "next/cache";

import { requireCurrentUser } from "@/lib/services/auth";
import {
  getProductStatusLabel,
  isProductLifecycleStatus,
} from "@/lib/product-status";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Database, ProductLifecycleStatus } from "@/lib/types";
import {
  cancelProductTransaction,
  recordCompletedTransaction,
} from "./transactions";

export type ProductStatusActionState = {
  error: string | null;
  success: string | null;
  status: ProductLifecycleStatus | null;
};

const defaultStatusActionState: ProductStatusActionState = {
  error: null,
  success: null,
  status: null,
};

type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export async function updateProductStatusAction(
  _previousState: ProductStatusActionState,
  formData: FormData,
): Promise<ProductStatusActionState> {
  if (!isSupabaseConfigured()) {
    return {
      ...defaultStatusActionState,
      error: "Supabase belum dikonfigurasi.",
    };
  }

  const user = await requireCurrentUser("/account");

  const productId = formData.get("product_id");
  const status = formData.get("status");

  if (
    typeof productId !== "string" ||
    typeof status !== "string" ||
    !isProductLifecycleStatus(status)
  ) {
    return {
      ...defaultStatusActionState,
      error: "Status produk tidak valid.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const now = new Date().toISOString();
  const updatePayload: ProductUpdate = {
    status,
    sold_at: status === "sold" ? now : null,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", productId)
    .eq("seller_id", user.id)
    .select("id, seller_id, price")
    .maybeSingle();

  if (error) {
    return {
      ...defaultStatusActionState,
      error: error.message,
    };
  }

  if (!data) {
    return {
      ...defaultStatusActionState,
      error: "Status belum bisa diubah. Pastikan produk ini milik akunmu.",
    };
  }

  const transactionResult =
    status === "sold"
      ? await recordCompletedTransaction(supabase, {
          productId: data.id,
          sellerId: data.seller_id ?? user.id,
          finalPrice: data.price ?? 0,
          completedAt: now,
        })
      : await cancelProductTransaction(
          supabase,
          data.id,
          data.seller_id ?? user.id,
          now,
        );

  if (transactionResult.error) {
    revalidatePath("/account");
    revalidatePath("/account/products");
    revalidatePath("/account/transactions");
    revalidatePath(`/products/${productId}`);
    revalidatePath("/products");

    return {
      ...defaultStatusActionState,
      error: `Status produk sudah diubah, tetapi transaksi belum tercatat: ${transactionResult.error.message}`,
      status,
    };
  }

  revalidatePath("/account");
  revalidatePath("/account/products");
  revalidatePath("/account/transactions");
  revalidatePath("/account/reviews");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/products");

  return {
    error: null,
    success: `Status berhasil diubah menjadi ${getProductStatusLabel(status)}.`,
    status,
  };
}
