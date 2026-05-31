import Link from "next/link";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { WishlistTabs } from "@/components/wishlist/WishlistTabs";
import { getCategories } from "@/lib/services/categories";
import { requireCurrentUser } from "@/lib/services/auth";
import { getSavedSearches } from "@/lib/services/saved-searches";
import {
  getWishlistProductIds,
  getWishlistProducts,
} from "@/lib/services/wishlist";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  await requireCurrentUser("/wishlist");
  const [wishlistProductIds, savedSearches, categories] = await Promise.all([
    getWishlistProductIds(),
    getSavedSearches(),
    getCategories(),
  ]);
  const products = await getWishlistProducts(wishlistProductIds);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Wishlist"
        title="Barang yang kamu simpan"
        description="Produk dan pencarian favoritmu."
        action={
          <Button asChild variant="outline">
            <Link href="/products">Cari barang</Link>
          </Button>
        }
      />

      <div className="mt-5 lg:mt-6">
        <WishlistTabs
          products={products}
          wishlistProductIds={wishlistProductIds}
          savedSearches={savedSearches}
          categories={categories}
        />
      </div>
    </div>
  );
}
