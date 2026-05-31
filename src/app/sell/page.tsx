import { SellProductForm } from "@/components/forms/SellProductForm";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { requireCurrentUser } from "@/lib/services/auth";
import { getCategories } from "@/lib/services/categories";

export const dynamic = "force-dynamic";

export default async function SellPage() {
  await requireCurrentUser("/sell");
  const categories = await getCategories();

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Jual barang"
        title="Unggah barang"
        description="Foto, kondisi, lokasi, harga, dan WhatsApp."
      />
      <div className="mt-5 max-w-4xl sm:mt-6">
        <SellProductForm categories={categories} />
      </div>
    </div>
  );
}
