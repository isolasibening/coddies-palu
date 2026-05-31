import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/lib/services/product-management";

type ProductDeleteButtonProps = {
  productId: string;
};

export function ProductDeleteButton({ productId }: ProductDeleteButtonProps) {
  return (
    <ConfirmDialog
      title="Hapus produk?"
      description="Produk akan dihapus dari katalog Coddies. Aksi ini tidak bisa dibatalkan dari aplikasi."
      triggerLabel="Hapus"
    >
      <form action={deleteProductAction}>
        <input type="hidden" name="product_id" value={productId} />
        <Button
          type="submit"
          className="w-full border-red-200 bg-red-600 text-white hover:bg-red-700"
        >
          Ya, hapus
        </Button>
      </form>
    </ConfirmDialog>
  );
}
