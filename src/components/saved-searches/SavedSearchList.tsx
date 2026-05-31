import Link from "next/link";
import { Search, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteSavedSearchAction, type SavedSearch } from "@/lib/services/saved-searches";
import type { Category } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type SavedSearchListProps = {
  savedSearches: SavedSearch[];
  categories: Category[];
};

function buildProductUrl(savedSearch: SavedSearch) {
  const params = new URLSearchParams();

  if (savedSearch.keyword) {
    params.set("q", savedSearch.keyword);
  }

  if (savedSearch.categoryId) {
    params.set("category", savedSearch.categoryId);
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function SavedSearchList({
  savedSearches,
  categories,
}: SavedSearchListProps) {
  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  if (savedSearches.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="Belum ada pencarian tersimpan"
        description="Simpan filter dari katalog."
        action={{ label: "Cari Barang Sekarang", href: "/products" }}
      />
    );
  }

  return (
    <div className="grid gap-3">
      {savedSearches.map((savedSearch) => (
        <div
          key={savedSearch.id}
          className="rounded-2xl border border-border bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold">
                {savedSearch.keyword || "Pencarian katalog"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {savedSearch.categoryId ? (
                  <Badge variant="blue">
                    {categoryMap.get(savedSearch.categoryId) ??
                      savedSearch.categoryId}
                  </Badge>
                ) : null}
                {savedSearch.location ? (
                  <Badge variant="green">{savedSearch.location}</Badge>
                ) : null}
                {savedSearch.maxPrice ? (
                  <Badge variant="amber">
                    Maks {formatPrice(savedSearch.maxPrice)}
                  </Badge>
                ) : null}
              </div>
            </div>
            <form action={deleteSavedSearchAction}>
              <input
                type="hidden"
                name="saved_search_id"
                value={savedSearch.id}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Hapus pencarian tersimpan"
              >
                <Trash2 />
              </Button>
            </form>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full">
            <Link href={buildProductUrl(savedSearch)}>Buka Pencarian</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
