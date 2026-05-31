import { Badge } from "@/components/ui/badge";
import type { ProductCondition } from "@/lib/types";

type ProductConditionBadgeProps = {
  condition: ProductCondition;
};

export function ProductConditionBadge({
  condition,
}: ProductConditionBadgeProps) {
  const variantByCondition = {
    "Seperti Baru": "green",
    "Sangat Baik": "green",
    Baik: "blue",
    "Ada Minus Ringan": "amber",
    "Perlu Perbaikan": "muted",
  } as const;

  return <Badge variant={variantByCondition[condition]}>{condition}</Badge>;
}
