import { ProductCatalogClient } from "@/components/product/ProductCatalogClient";
import { getCategories } from "@/lib/services/categories";
import { getProducts } from "@/lib/services/products";
import { getWishlistProductIds } from "@/lib/services/wishlist";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories, wishlistProductIds] = await Promise.all([
    getProducts(),
    getCategories(),
    getWishlistProductIds(),
  ]);

  return (
    <ProductCatalogClient
      products={products}
      categories={categories}
      wishlistProductIds={wishlistProductIds}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? ""}
    />
  );
}
