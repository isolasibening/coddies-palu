import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "@/lib/types";

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const variantByStatus = {
    Tersedia: "green",
    "Sedang Dinego": "amber",
    Booking: "blue",
    Terjual: "muted",
    Dibatalkan: "muted",
  } as const;

  return <Badge variant={variantByStatus[status]}>{status}</Badge>;
}
