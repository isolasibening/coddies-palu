"use client";

import { useState } from "react";

import { ProductGrid } from "@/components/product/ProductGrid";
import { SavedSearchList } from "@/components/saved-searches/SavedSearchList";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import type { SavedSearch } from "@/lib/services/saved-searches";
import type { Category, Product } from "@/lib/types";
import { Heart, Search } from "lucide-react";

type WishlistTabsProps = {
  products: Product[];
  wishlistProductIds: string[];
  savedSearches: SavedSearch[];
  categories: Category[];
};

export function WishlistTabs({
  products,
  wishlistProductIds,
  savedSearches,
  categories,
}: WishlistTabsProps) {
  const [activeTab, setActiveTab] = useState<"products" | "searches">(
    "products",
  );

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-white/90 p-1 shadow-sm">
        <Button
          type="button"
          variant={activeTab === "products" ? "default" : "ghost"}
          onClick={() => setActiveTab("products")}
        >
          Barang Disimpan
        </Button>
        <Button
          type="button"
          variant={activeTab === "searches" ? "default" : "ghost"}
          onClick={() => setActiveTab("searches")}
        >
          Pencarian Disimpan
        </Button>
      </div>

      {activeTab === "products" ? (
        products.length > 0 ? (
          <ProductGrid
            products={products}
            wishlistProductIds={wishlistProductIds}
          />
        ) : (
          <EmptyState
            icon={Heart}
            title="Wishlist masih kosong"
            description="Simpan barang yang kamu suka."
            action={{ label: "Cari Barang Sekarang", href: "/products" }}
          />
        )
      ) : (
        <section id="saved-searches">
          {savedSearches.length > 0 ? (
            <SavedSearchList
              savedSearches={savedSearches}
              categories={categories}
            />
          ) : (
            <EmptyState
              icon={Search}
              title="Belum ada pencarian tersimpan"
              description="Simpan filter dari katalog."
              action={{ label: "Cari Barang Sekarang", href: "/products" }}
            />
          )}
        </section>
      )}
    </div>
  );
}
