import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { ProductArtwork } from "@/components/product/ProductArtwork";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type HeroSectionProps = {
  featuredProduct?: Product;
};

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  return (
    <section className="container grid gap-6 py-5 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-12">
      <div className="min-w-0">
        <h1 className="break-words text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Cari perlengkapan bayi preloved di Palu.
        </h1>
        <p className="mt-3 hidden max-w-xl text-base leading-6 text-muted-foreground sm:block md:text-lg">
          Temukan stroller, car seat, box bayi, dan mainan anak dari orang tua
          lokal di sekitarmu.
        </p>

        <div className="mt-4 max-w-2xl min-w-0 sm:mt-6">
          <SearchBar />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:gap-3">
          <Button asChild size="lg">
            <Link href="/products">
              Cari Barang
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sell">Jual Barang Bayimu</Link>
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 gap-3">
        <div className="rounded-2xl border border-border bg-white p-2.5 shadow-sm sm:p-3">
          {featuredProduct ? (
            <>
              <ProductArtwork
                product={featuredProduct}
                className="min-h-48 sm:min-h-72"
              />
              <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-emerald-700 sm:text-sm">
                    Baru di Coddies
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-lg font-semibold sm:text-xl">
                    {featuredProduct.title}
                  </h2>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground sm:mt-2">
                    <MapPin className="size-4" />
                    {featuredProduct.location}
                  </div>
                </div>
                <p className="shrink-0 text-lg font-bold">
                  {formatPrice(featuredProduct.price)}
                </p>
              </div>
            </>
          ) : (
            <div className="grid min-h-48 place-items-center rounded-xl bg-muted p-5 text-center sm:min-h-72 sm:p-6">
              <div>
                <p className="text-lg font-semibold">Belum ada listing</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Produk Supabase yang aktif akan muncul di sini.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
