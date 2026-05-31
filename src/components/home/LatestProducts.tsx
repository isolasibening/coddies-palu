import Link from "next/link";

import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

type LatestProductsProps = {
  products: Product[];
  wishlistProductIds?: string[];
};

export function LatestProducts({
  products,
  wishlistProductIds = [],
}: LatestProductsProps) {
  return (
    <section className="container py-8 md:py-12">
      <SectionHeader
        eyebrow="Produk terbaru"
        title="Barang yang baru masuk"
        description="Listing lokal dari Palu."
        action={
          <Button asChild variant="outline">
            <Link href="/products">Lihat semua</Link>
          </Button>
        }
      />
      <div className="mt-6">
        <ProductGrid
          products={products}
          wishlistProductIds={wishlistProductIds}
        />
      </div>
    </section>
  );
}
