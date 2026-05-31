"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { CategoryChips } from "@/components/shared/CategoryChips";
import { EmptyState } from "@/components/shared/EmptyState";
import { SaveSearchButton } from "@/components/saved-searches/SaveSearchButton";
import { SearchBar } from "@/components/shared/SearchBar";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Category, Product, ProductFilters } from "@/lib/types";

import { ProductFilter } from "./ProductFilter";
import { ProductGrid } from "./ProductGrid";

type ProductCatalogClientProps = {
  products: Product[];
  categories: Category[];
  wishlistProductIds?: string[];
  initialQuery?: string;
  initialCategory?: string;
};

const defaultFilters: ProductFilters = {
  keyword: "",
  category: "",
  location: "",
  condition: "",
  status: "",
  priceRange: "",
  ageRange: "",
  sort: "newest",
};

function priceMatches(product: Product, priceRange: string) {
  if (!priceRange) {
    return true;
  }

  if (priceRange === "under-300") {
    return product.price < 300000;
  }

  if (priceRange === "300-700") {
    return product.price >= 300000 && product.price <= 700000;
  }

  if (priceRange === "700-1200") {
    return product.price > 700000 && product.price <= 1200000;
  }

  return product.price > 1200000;
}

export function ProductCatalogClient({
  products: initialProducts,
  categories,
  wishlistProductIds = [],
  initialQuery = "",
  initialCategory = "",
}: ProductCatalogClientProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    ...defaultFilters,
    keyword: initialQuery,
    category: initialCategory,
  });

  const locations = useMemo(
    () =>
      Array.from(
        new Set(initialProducts.map((product) => product.location).filter(Boolean)),
      ).sort(),
    [initialProducts],
  );

  const products = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase();

    return initialProducts
      .filter((product) => {
        const matchesKeyword =
          !keyword ||
          product.title.toLowerCase().includes(keyword) ||
          product.brand.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword);

        return (
          matchesKeyword &&
          (!filters.category || product.categoryId === filters.category) &&
          (!filters.location || product.location === filters.location) &&
          (!filters.condition || product.condition === filters.condition) &&
          (!filters.status || product.status === filters.status) &&
          (!filters.ageRange || product.ageRange.includes(filters.ageRange)) &&
          priceMatches(product, filters.priceRange)
        );
      })
      .sort((a, b) => {
        if (filters.sort === "lowest") {
          return a.price - b.price;
        }

        if (filters.sort === "highest") {
          return b.price - a.price;
        }

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [filters, initialProducts]);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Katalog Palu"
        title="Cari barang bayi preloved"
        description="Filter kategori, lokasi, harga, dan kondisi."
      />

      <div className="mt-6 grid gap-3">
        <SearchBar
          defaultValue={filters.keyword}
          onSearch={(keyword) => setFilters((current) => ({ ...current, keyword }))}
        />
        <CategoryChips
          categories={categories}
          activeCategory={filters.category}
          featuredOnly
          className="md:hidden"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[280px_1fr]">
        <ProductFilter
          categories={categories}
          locations={locations}
          filters={filters}
          onChange={setFilters}
          action={<SaveSearchButton filters={filters} />}
        />
        <section>
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
            <p className="text-sm font-semibold text-muted-foreground">
              {products.length} barang ditemukan
            </p>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Barang lokal siap COD.
            </p>
          </div>
          {products.length > 0 ? (
            <ProductGrid
              products={products}
              wishlistProductIds={wishlistProductIds}
            />
          ) : (
            <div className="grid gap-3">
              <EmptyState
                icon={SearchX}
                title="Barang belum ketemu"
                description="Simpan pencarian ini."
                action={{ label: "Lihat semua barang", href: "/products" }}
              />
              <SaveSearchButton filters={filters} className="justify-self-center" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
