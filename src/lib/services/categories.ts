import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Category, CategoryRow } from "@/lib/types";

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name ?? "Kategori",
    slug: row.slug ?? row.id,
    icon: row.icon ?? "Baby",
    priority: row.priority ?? 99,
    featured: row.featured ?? (row.priority ?? 99) <= 7,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("priority", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapCategoryRow);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapCategoryRow(data);
}
