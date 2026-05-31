import { SearchX } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import type { Product } from "@/lib/types";

import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  wishlistProductIds?: string[];
};

export function ProductGrid({
  products,
  wishlistProductIds = [],
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Barang belum ketemu"
        description="Coba ubah kata kunci atau filter."
        action={{ label: "Lihat semua barang", href: "/products" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
}
