import { getCategories } from "@/lib/services/categories";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  getProductStatusLabel,
  normalizeProductStatusKey,
} from "@/lib/product-status";
import type {
  Category,
  Json,
  Product,
  ProductCondition,
  ProductRow,
  ProfileRow,
  Seller,
} from "@/lib/types";

const productConditions: ProductCondition[] = [
  "Seperti Baru",
  "Sangat Baik",
  "Baik",
  "Ada Minus Ringan",
  "Perlu Perbaikan",
];

const photoTones: Product["photoTone"][] = [
  "yellow",
  "blue",
  "green",
  "peach",
  "mint",
];

function normalizeCondition(condition: string | null): ProductCondition {
  return productConditions.includes(condition as ProductCondition)
    ? (condition as ProductCondition)
    : "Baik";
}

function readStringArray(value: Json | string[] | null): string[] {
  if (Array.isArray(value)) {
    const items: unknown[] = value;
    return items.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return [value];
  }

  return [];
}

function choosePhotoTone(productId: string): Product["photoTone"] {
  const total = Array.from(productId).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  return photoTones[total % photoTones.length];
}

function mapSellerRow(row: ProfileRow | undefined, product: ProductRow): Seller {
  const sellerId = product.seller_id ?? product.sellerId ?? row?.id ?? "";
  const createdAt = product.created_at ?? product.createdAt ?? "";
  const productPhone = product.whatsapp_number ?? product.whatsappNumber ?? "";

  return {
    id: sellerId,
    name: row?.name ?? "Penjual Coddies",
    phone: productPhone || row?.phone || "",
    location: row?.location ?? product.location ?? "Palu",
    avatarUrl: row?.avatar_url ?? undefined,
    responseRate: 0,
    completedTransactions: 0,
    joinedAt: row?.created_at ?? row?.createdAt ?? createdAt,
  };
}

function buildCategoryMap(categories: Category[]) {
  return new Map(categories.map((category) => [category.id, category]));
}

async function getProfilesByIds(userIds: string[]) {
  if (userIds.length === 0 || !isSupabaseConfigured()) {
    return new Map<string, ProfileRow>();
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);

  if (error || !data) {
    return new Map<string, ProfileRow>();
  }

  return new Map(data.map((user) => [user.id, user]));
}

export function mapProductRow(
  row: ProductRow,
  categories: Category[],
  sellers: Map<string, ProfileRow>,
): Product {
  const sellerId = row.seller_id ?? row.sellerId ?? "";
  const categoryId = row.category_id ?? row.categoryId ?? "";
  const category = buildCategoryMap(categories).get(categoryId);
  const photos = readStringArray(row.photos);
  const statusKey = normalizeProductStatusKey(row.status);

  return {
    id: row.id,
    sellerId,
    title: row.title ?? "Produk Coddies",
    description: row.description ?? "",
    categoryId,
    brand: row.brand ?? "-",
    ageRange: row.age_range ?? row.ageRange ?? "-",
    condition: normalizeCondition(row.condition),
    price: row.price ?? 0,
    isNegotiable: row.is_negotiable ?? row.isNegotiable ?? false,
    isTradeAllowed: row.is_trade_allowed ?? row.isTradeAllowed ?? false,
    defects: row.defects ?? "Belum ada catatan minus.",
    location: row.location ?? "Palu",
    whatsappNumber: row.whatsapp_number ?? row.whatsappNumber ?? undefined,
    statusKey,
    status: getProductStatusLabel(statusKey),
    photos: photos.length > 0 ? photos : ["Foto utama"],
    photoTone: choosePhotoTone(row.id),
    createdAt: row.created_at ?? row.createdAt ?? "",
    seller: mapSellerRow(sellers.get(sellerId), row),
    category,
    trustSignals: ["Foto asli tersedia", "Kondisi dijelaskan"],
    rating: 0,
  };
}

async function mapProductRows(rows: ProductRow[]) {
  const categories = await getCategories();
  const sellerIds = Array.from(
    new Set(
      rows
        .map((product) => product.seller_id ?? product.sellerId ?? "")
        .filter(Boolean),
    ),
  );
  const sellers = await getProfilesByIds(sellerIds);

  return rows.map((row) => mapProductRow(row, categories, sellers));
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return mapProductRows(data);
}

export async function getLatestProducts(limit = 4): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return mapProductRows(data);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const [product] = await mapProductRows([data]);
  return product ?? null;
}

export async function getProductsByIds(productIds: string[]): Promise<Product[]> {
  const uniqueIds = Array.from(new Set(productIds)).filter(Boolean);

  if (uniqueIds.length === 0 || !isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", uniqueIds);

  if (error || !data) {
    return [];
  }

  const products = await mapProductRows(data);
  const productMap = new Map(products.map((product) => [product.id, product]));

  return uniqueIds
    .map((productId) => productMap.get(productId))
    .filter((product): product is Product => Boolean(product));
}

export async function getSimilarProducts(
  categoryId: string,
  excludedProductId: string,
  limit = 4,
): Promise<Product[]> {
  if (!categoryId || !isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", excludedProductId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return mapProductRows(data);
}

export async function getProductsBySellerId(sellerId: string): Promise<Product[]> {
  if (!sellerId || !isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return mapProductRows(data);
}
