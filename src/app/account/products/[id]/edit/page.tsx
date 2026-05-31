import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductEditForm } from "@/components/account/ProductEditForm";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/services/auth";
import { getCategories } from "@/lib/services/categories";
import { getProductById } from "@/lib/services/products";

export const dynamic = "force-dynamic";

type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = await params;
  const user = await requireCurrentUser(`/account/products/${id}/edit`);
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product || product.sellerId !== user.id) {
    notFound();
  }

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Barang Saya"
        title="Edit Produk"
        description="Ubah data penting produk. Foto belum diedit dari halaman ini."
        action={
          <Button asChild variant="outline">
            <Link href="/account/products">Kembali</Link>
          </Button>
        }
      />
      <div className="mt-5 max-w-3xl rounded-2xl border border-border bg-white/90 p-4 shadow-sm sm:p-5">
        <ProductEditForm product={product} categories={categories} />
      </div>
    </div>
  );
}
