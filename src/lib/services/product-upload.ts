"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/services/auth";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Database, ProductCondition } from "@/lib/types";

const productPhotoBucket = "product-photos";
const missingProductPhotoBucketMessage =
  "Bucket product-photos belum dibuat di Supabase Storage.";
const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type CreateProductState = {
  error: string | null;
};

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type TypedSupabaseClient = SupabaseClient<Database>;

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function readPhotoFiles(formData: FormData) {
  const files = [
    ...formData.getAll("main_photo"),
    ...formData.getAll("extra_photos"),
  ];

  return files.filter(
    (file): file is File => file instanceof File && file.size > 0,
  );
}

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension && ["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {
    return extension;
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/gif") {
    return "gif";
  }

  return "jpg";
}

function isBucketNotFoundError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const details = [
    "message" in error ? error.message : "",
    "error" in error ? error.error : "",
    "name" in error ? error.name : "",
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  return details.includes("bucket not found");
}

function validateProductForm(formData: FormData, photos: File[]) {
  const title = readFormValue(formData, "title");
  const categoryId = readFormValue(formData, "category_id");
  const priceValue = readFormValue(formData, "price");
  const condition = readFormValue(formData, "condition");
  const location = readFormValue(formData, "location");
  const whatsappNumber = readFormValue(formData, "whatsapp_number");
  const price = Number(priceValue);

  if (!title) {
    return { error: "Nama barang wajib diisi." };
  }

  if (!categoryId) {
    return { error: "Kategori wajib dipilih." };
  }

  if (!priceValue || Number.isNaN(price) || price <= 0) {
    return { error: "Harga wajib diisi dengan angka lebih dari 0." };
  }

  if (!condition) {
    return { error: "Kondisi barang wajib dipilih." };
  }

  if (!location) {
    return { error: "Kecamatan wajib dipilih." };
  }

  if (!whatsappNumber) {
    return { error: "Nomor WhatsApp wajib diisi." };
  }

  if (photos.length === 0) {
    return { error: "Upload minimal 1 foto produk." };
  }

  if (photos.length > 6) {
    return { error: "Maksimal 1 foto utama dan 5 foto tambahan." };
  }

  const invalidPhoto = photos.find(
    (photo) => photo.type && !allowedImageTypes.has(photo.type),
  );

  if (invalidPhoto) {
    return { error: "Format foto harus JPG, PNG, WebP, atau GIF." };
  }

  return {
    error: null,
    values: {
      title,
      categoryId,
      price,
      condition: condition as ProductCondition,
      location,
      whatsappNumber,
    },
  };
}

async function uploadProductPhoto(
  supabase: TypedSupabaseClient,
  userId: string,
  file: File,
) {
  const fileName = file.name.trim() || `product-photo.${getFileExtension(file)}`;
  const path = `${userId}/products/${crypto.randomUUID()}-${fileName}`;

  const { error } = await supabase.storage
    .from(productPhotoBucket)
    .upload(path, file, {
      cacheControl: "3600",
      contentType: file.type || undefined,
      upsert: false,
    });

  if (error) {
    if (isBucketNotFoundError(error)) {
      throw new Error(missingProductPhotoBucketMessage);
    }

    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(productPhotoBucket).getPublicUrl(path);

  return { path, publicUrl };
}

async function removeUploadedPhotos(
  supabase: TypedSupabaseClient,
  paths: string[],
) {
  if (paths.length === 0) {
    return;
  }

  await supabase.storage.from(productPhotoBucket).remove(paths);
}

export async function createProductAction(
  _previousState: CreateProductState,
  formData: FormData,
): Promise<CreateProductState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum dikonfigurasi." };
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirectTo=%2Fsell");
  }

  const photos = readPhotoFiles(formData);
  const validation = validateProductForm(formData, photos);

  if (validation.error || !validation.values) {
    return { error: validation.error ?? "Data produk belum lengkap." };
  }

  const supabase = await createServerSupabaseClient();
  const productId = crypto.randomUUID();
  const uploadedPhotos: Array<{ path: string; publicUrl: string }> = [];

  try {
    for (const photo of photos) {
      uploadedPhotos.push(await uploadProductPhoto(supabase, user.id, photo));
    }
  } catch (error) {
    await removeUploadedPhotos(
      supabase,
      uploadedPhotos.map((photo) => photo.path),
    );

    if (
      error instanceof Error &&
      error.message === missingProductPhotoBucketMessage
    ) {
      return { error: missingProductPhotoBucketMessage };
    }

    return {
      error:
        error instanceof Error
          ? `Foto gagal diupload: ${error.message}`
          : "Foto gagal diupload.",
    };
  }

  const now = new Date().toISOString();
  const insertPayload: ProductInsert = {
    id: productId,
    seller_id: user.id,
    title: validation.values.title,
    description: readFormValue(formData, "description"),
    category_id: validation.values.categoryId,
    brand: readFormValue(formData, "brand"),
    age_range: readFormValue(formData, "age_range"),
    condition: validation.values.condition,
    price: validation.values.price,
    is_negotiable: readBoolean(formData, "is_negotiable"),
    is_trade_allowed: readBoolean(formData, "is_trade_allowed"),
    defects: readFormValue(formData, "defects"),
    location: validation.values.location,
    whatsapp_number: validation.values.whatsappNumber,
    status: "available",
    photos: uploadedPhotos.map((photo) => photo.publicUrl),
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("products")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error || !data) {
    await removeUploadedPhotos(
      supabase,
      uploadedPhotos.map((photo) => photo.path),
    );

    return {
      error: error?.message ?? "Produk belum bisa disimpan.",
    };
  }

  redirect(`/products/${data.id}?created=1`);
}
