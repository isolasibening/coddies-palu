import type { ProductLifecycleStatus, ProductStatus } from "@/lib/types";

export const productStatusOptions: Array<{
  value: ProductLifecycleStatus;
  label: ProductStatus;
}> = [
  { value: "available", label: "Tersedia" },
  { value: "negotiating", label: "Sedang Dinego" },
  { value: "booked", label: "Booking" },
  { value: "sold", label: "Terjual" },
  { value: "cancelled", label: "Dibatalkan" },
];

const legacyStatusMap: Record<string, ProductLifecycleStatus> = {
  tersedia: "available",
  "sedang dinego": "negotiating",
  booking: "booked",
  terjual: "sold",
  dibatalkan: "cancelled",
};

export function normalizeProductStatusKey(
  status: string | null | undefined,
): ProductLifecycleStatus {
  const normalized = status?.trim().toLowerCase();

  if (!normalized) {
    return "available";
  }

  if (productStatusOptions.some((option) => option.value === normalized)) {
    return normalized as ProductLifecycleStatus;
  }

  return legacyStatusMap[normalized] ?? "available";
}

export function isProductLifecycleStatus(
  status: string,
): status is ProductLifecycleStatus {
  return productStatusOptions.some((option) => option.value === status);
}

export function getProductStatusLabel(
  status: ProductLifecycleStatus,
): ProductStatus {
  return (
    productStatusOptions.find((option) => option.value === status)?.label ??
    "Tersedia"
  );
}
