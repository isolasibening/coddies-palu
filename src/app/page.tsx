import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestProducts } from "@/components/home/LatestProducts";
import { TrustSection } from "@/components/home/TrustSection";
import { CategoryChips } from "@/components/shared/CategoryChips";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getCategories } from "@/lib/services/categories";
import { getLatestProducts } from "@/lib/services/products";
import { getWishlistProductIds } from "@/lib/services/wishlist";

export default async function HomePage() {
  const [categories, latestProducts, wishlistProductIds] = await Promise.all([
    getCategories(),
    getLatestProducts(4),
    getWishlistProductIds(),
  ]);
  const [featuredProduct] = latestProducts;

  return (
    <>
      <HeroSection featuredProduct={featuredProduct} />

      <section className="container py-4 md:py-6">
        <SectionHeader
          title="Kategori cepat"
          description="Barang besar bayi lebih mudah dicari."
        />
        <CategoryChips categories={categories} featuredOnly className="mt-4" />
      </section>

      <LatestProducts
        products={latestProducts}
        wishlistProductIds={wishlistProductIds}
      />
      <CTASection />
      <TrustSection />
    </>
  );
}
