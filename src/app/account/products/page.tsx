import Link from "next/link";
import { Package } from "lucide-react";

import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { MyProductCard } from "@/components/account/MyProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/services/auth";
import { getProductsBySellerId } from "@/lib/services/products";
import type { Product, ProductLifecycleStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

function productGroup(
  products: Product[],
  statuses: ProductLifecycleStatus[],
) {
  return products.filter((product) =>
    statuses.includes(product.statusKey ?? "available"),
  );
}

function ProductGroupSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold">
        {title} <span className="text-muted-foreground">({products.length})</span>
      </h2>
      {products.length > 0 ? (
        <div className="grid gap-4">
          {products.map((product) => (
            <MyProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm text-muted-foreground">
          Belum ada produk di status ini.
        </div>
      )}
    </section>
  );
}

export default async function AccountProductsPage() {
  const user = await requireCurrentUser("/account/products");
  const products = await getProductsBySellerId(user.id);

  const activeProducts = productGroup(products, ["available", "negotiating"]);
  const bookedProducts = productGroup(products, ["booked"]);
  const soldProducts = productGroup(products, ["sold"]);
  const cancelledProducts = productGroup(products, ["cancelled"]);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Barang Saya"
        description="Kelola listing, status, edit, dan hapus produk."
        action={
          <Button asChild>
            <Link href="/sell">Tambah Barang</Link>
          </Button>
        }
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        {products.length > 0 ? (
          <div className="grid gap-6">
            <ProductGroupSection title="Produk aktif" products={activeProducts} />
            <ProductGroupSection title="Produk booking" products={bookedProducts} />
            <ProductGroupSection title="Produk terjual" products={soldProducts} />
            <ProductGroupSection
              title="Produk dibatalkan"
              products={cancelledProducts}
            />
          </div>
        ) : (
          <EmptyState
            icon={Package}
            title="Kamu belum mengunggah barang."
            description="Jual barang si kecil di Coddies."
            action={{ label: "Jual Barang Sekarang", href: "/sell" }}
          />
        )}
      </div>
    </div>
  );
}
