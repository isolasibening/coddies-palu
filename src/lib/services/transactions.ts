"use server";

import type { SupabaseClient } from "@supabase/supabase-js";

import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getProductsByIds } from "@/lib/services/products";
import type { Database, TransactionRow } from "@/lib/types";

type TypedSupabaseClient = SupabaseClient<Database>;
type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

type SoldTransactionInput = {
  productId: string;
  sellerId: string;
  finalPrice: number;
  completedAt: string;
};

export type AccountTransaction = {
  id: string;
  productId: string;
  productTitle: string;
  productPhoto: string | null;
  sellerId: string;
  buyerId: string | null;
  finalPrice: number;
  status: string;
  role: "penjual" | "pembeli";
  date: string;
};

function mapTransactionRow(row: TransactionRow, userId: string) {
  const sellerId = row.seller_id ?? row.sellerId ?? "";
  const buyerId = row.buyer_id ?? row.buyerId ?? null;

  return {
    id: row.id,
    productId: row.product_id ?? row.productId ?? "",
    sellerId,
    buyerId,
    finalPrice: row.final_price ?? row.finalPrice ?? 0,
    status: row.status ?? "completed",
    role: sellerId === userId ? "penjual" : "pembeli",
    date: row.completed_at ?? row.completedAt ?? row.created_at ?? row.createdAt ?? "",
  } satisfies Omit<AccountTransaction, "productTitle" | "productPhoto">;
}

export async function recordCompletedTransaction(
  supabase: TypedSupabaseClient,
  input: SoldTransactionInput,
) {
  const { data: existingTransactions, error: lookupError } = await supabase
    .from("transactions")
    .select("id")
    .eq("product_id", input.productId)
    .eq("seller_id", input.sellerId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (lookupError) {
    return { error: lookupError };
  }

  const existingTransaction = existingTransactions?.[0];

  if (existingTransaction) {
    const updatePayload: TransactionUpdate = {
      buyer_id: null,
      final_price: input.finalPrice,
      status: "completed",
      completed_at: input.completedAt,
      updated_at: input.completedAt,
    };
    const { error } = await supabase
      .from("transactions")
      .update(updatePayload)
      .eq("id", existingTransaction.id)
      .eq("seller_id", input.sellerId);

    return { error };
  }

  const insertPayload: TransactionInsert = {
    product_id: input.productId,
    seller_id: input.sellerId,
    buyer_id: null,
    final_price: input.finalPrice,
    status: "completed",
    completed_at: input.completedAt,
    updated_at: input.completedAt,
  };

  const { error } = await supabase.from("transactions").insert(insertPayload);

  return { error };
}

export async function cancelProductTransaction(
  supabase: TypedSupabaseClient,
  productId: string,
  sellerId: string,
  updatedAt: string,
) {
  const updatePayload: TransactionUpdate = {
    status: "cancelled",
    completed_at: null,
    updated_at: updatedAt,
  };

  const { error } = await supabase
    .from("transactions")
    .update(updatePayload)
    .eq("product_id", productId)
    .eq("seller_id", sellerId);

  return { error };
}

export async function getCompletedTransactionCountBySellerId(
  sellerId: string,
): Promise<number | null> {
  if (!sellerId || !isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { count, error } = await supabase
    .from("transactions")
    .select("id", { count: "exact", head: true })
    .eq("seller_id", sellerId)
    .eq("status", "completed");

  if (error) {
    return null;
  }

  return count ?? 0;
}

export async function getAccountTransactions(
  userId: string,
): Promise<AccountTransaction[]> {
  if (!userId || !isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const baseTransactions = data.map((row) => mapTransactionRow(row, userId));
  const products = await getProductsByIds(
    baseTransactions.map((transaction) => transaction.productId),
  );
  const productMap = new Map(products.map((product) => [product.id, product]));

  return baseTransactions.map((transaction) => {
    const product = productMap.get(transaction.productId);

    return {
      ...transaction,
      productTitle: product?.title ?? "Produk Coddies",
      productPhoto: product?.photos.find((photo) => photo.startsWith("http")) ?? null,
    };
  });
}
