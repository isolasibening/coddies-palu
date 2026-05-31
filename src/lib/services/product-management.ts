"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/lib/services/auth";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { Database } from "@/lib/types";

export type ProductEditActionState = {
  error: string | null;
  success: string | null;
};

type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parsePrice(value: string) {
  const price = Number(value);
  return Number.isFinite(price) && price > 0 ? Math.round(price) : null;
}

export async function updateProductDetailsAction(
  _previousState: ProductEditActionState,
  formData: FormData,
): Promise<ProductEditActionState> {
  const productId = readFormValue(formData, "product_id");
  const title = readFormValue(formData, "title");
  const categoryId = readFormValue(formData, "category_id");
  const price = parsePrice(readFormValue(formData, "price"));
  const condition = readFormValue(formData, "condition");
  const location = readFormValue(formData, "location");
  const whatsappNumber = readFormValue(formData, "whatsapp_number");
  const brand = readFormValue(formData, "brand");
  const ageRange = readFormValue(formData, "age_range");
  const description = readFormValue(formData, "description");
  const defects = readFormValue(formData, "defects");

  if (!productId) {
    return { error: "Produk tidak valid.", success: null };
  }

  if (!title || !categoryId || !price || !condition || !location || !whatsappNumber) {
    return {
      error: "Lengkapi nama, kategori, harga, kondisi, lokasi, dan WhatsApp.",
      success: null,
    };
  }

  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum dikonfigurasi.", success: null };
  }

  const user = await requireCurrentUser(`/account/products/${productId}/edit`);
  const supabase = await createServerSupabaseClient();
  const updatePayload: ProductUpdate = {
    title,
    category_id: categoryId,
    price,
    condition,
    location,
    whatsapp_number: whatsappNumber,
    brand: brand || null,
    age_range: ageRange || null,
    description,
    defects,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", productId)
    .eq("seller_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return { error: error.message, success: null };
  }

  if (!data) {
    return {
      error: "Produk belum bisa diubah. Pastikan produk ini milik akunmu.",
      success: null,
    };
  }

  revalidatePath("/account");
  revalidatePath("/account/products");
  revalidatePath(`/products/${productId}`);

  return { error: null, success: "Produk berhasil diperbarui." };
}

export async function deleteProductAction(formData: FormData) {
  const productId = readFormValue(formData, "product_id");

  if (!productId || !isSupabaseConfigured()) {
    return;
  }

  const user = await requireCurrentUser("/account/products");
  const supabase = await createServerSupabaseClient();

  await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("seller_id", user.id);

  revalidatePath("/account");
  revalidatePath("/account/products");
  revalidatePath("/products");
  redirect("/account/products");
}
