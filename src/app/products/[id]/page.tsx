import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  Star,
} from "lucide-react";

import { ProductConditionBadge } from "@/components/product/ProductConditionBadge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import { ProductReviewsSection } from "@/components/reviews/ProductReviewsSection";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { WishlistButton } from "@/components/shared/WishlistButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProductById,
  getSimilarProducts,
} from "@/lib/services/products";
import { getCurrentUser } from "@/lib/services/auth";
import { getProductReviews } from "@/lib/services/reviews";
import { getWishlistProductIds } from "@/lib/services/wishlist";
import { formatPrice, makeWhatsAppLink } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const [product, wishlistProductIds, currentUser, reviews] = await Promise.all([
    getProductById(id),
    getWishlistProductIds(),
    getCurrentUser(),
    getProductReviews(id),
  ]);

  if (!product) {
    return (
      <div className="container py-6 md:py-10">
        <Button asChild variant="ghost" className="mb-4 px-0">
          <Link href="/products">
            <ArrowLeft />
            Kembali ke katalog
          </Link>
        </Button>
        <EmptyState
          icon={PackageSearch}
          title="Produk belum tersedia"
          description="Produk ini belum ada di katalog Supabase atau sudah tidak aktif."
          action={{ label: "Cari Barang", href: "/products" }}
        />
      </div>
    );
  }

  const category = product.category;
  const similarProducts = await getSimilarProducts(product.categoryId, product.id);
  const isOwner = currentUser?.id === product.sellerId;
  const isSold = product.statusKey === "sold";
  const conditionChecklist = [
    "Foto asli tersedia",
    "Kondisi dijelaskan",
    "Bisa COD",
    product.isNegotiable ? "Bisa nego" : "Harga pas",
  ];

  return (
    <div className="container py-6 md:py-10">
      <Button asChild variant="ghost" className="mb-4 px-0">
        <Link href="/products">
          <ArrowLeft />
          Kembali ke katalog
        </Link>
      </Button>

      {query.created === "1" ? (
        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          Produk berhasil dibuat dan sudah masuk katalog.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr] lg:gap-8">
        <ProductGallery product={product} />

        <section className="grid content-start gap-5">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">{category?.name ?? "Kategori"}</Badge>
              {product.isNegotiable ? <Badge variant="amber">Bisa nego</Badge> : null}
            </div>
            <h1 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
              {formatPrice(product.price)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ProductConditionBadge condition={product.condition} />
              <ProductStatusBadge status={product.status} />
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {product.location}
            </div>
            <p className="line-clamp-4 text-sm leading-5 text-muted-foreground sm:line-clamp-none sm:leading-6">
              {product.description}
            </p>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <p>
                <span className="font-bold">Merek:</span> {product.brand}
              </p>
              <p>
                <span className="font-bold">Usia:</span> {product.ageRange}
              </p>
            </div>
            <div className="rounded-xl bg-muted p-3 text-sm">
              <span className="font-bold">Minus:</span> {product.defects}
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-lg font-semibold">Penjual</h2>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-sky-700">
                {product.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{product.seller.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.seller.location}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-xl bg-muted p-3">
                <p className="font-bold">{product.seller.responseRate}%</p>
                <p className="text-xs text-muted-foreground">Respons</p>
              </div>
              <div className="rounded-xl bg-muted p-3">
                <p className="font-bold">
                  {product.seller.completedTransactions}
                </p>
                <p className="text-xs text-muted-foreground">Selesai</p>
              </div>
              <div className="rounded-xl bg-muted p-3">
                <p className="flex items-center justify-center gap-1 font-bold">
                  <Star className="size-3 fill-current" />
                  {product.rating}
                </p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            {product.seller.phone ? (
              <Button asChild size="lg">
                <a
                  href={makeWhatsAppLink(product.seller.phone, product.title)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle />
                  Hubungi Penjual
                </a>
              </Button>
            ) : (
              <Button size="lg" disabled>
                <MessageCircle />
                Nomor WhatsApp belum tersedia
              </Button>
            )}
            <WishlistButton
              productId={product.id}
              initialSaved={wishlistProductIds.includes(product.id)}
              label
              className="h-12"
            />
          </div>
        </section>
      </div>

      <section className="mt-8 grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm md:mt-10 md:grid-cols-[0.8fr_1.2fr] md:p-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-700">
            <ShieldCheck className="size-5" />
            <h2 className="font-semibold">Cek sebelum COD</h2>
          </div>
          <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
            Cek detail barang dan sepakati COD di lokasi yang nyaman.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {conditionChecklist.map((signal) => (
            <div
              key={signal}
              className="flex items-center gap-2 rounded-xl bg-accent p-3 text-sm font-semibold text-accent-foreground"
            >
              <CheckCircle2 className="size-4" />
              {signal}
            </div>
          ))}
        </div>
      </section>

      <ProductReviewsSection
        productId={product.id}
        reviews={reviews}
        isLoggedIn={Boolean(currentUser)}
        isOwner={isOwner}
        isSold={isSold}
      />

      {similarProducts.length > 0 ? (
        <section className="mt-10">
          <SectionHeader title="Produk serupa" />
          <div className="mt-5">
            <ProductGrid
              products={similarProducts}
              wishlistProductIds={wishlistProductIds}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
