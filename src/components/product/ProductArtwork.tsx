import {
  Armchair,
  Baby,
  BedDouble,
  Bike,
  Car,
  Footprints,
  LucideIcon,
  Moon,
  Puzzle,
  Shirt,
  Soup,
} from "lucide-react";

import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Armchair,
  Baby,
  BedDouble,
  Bike,
  Car,
  Footprints,
  Moon,
  Puzzle,
  Shirt,
  Soup,
};

const toneClass: Record<Product["photoTone"], string> = {
  yellow: "bg-[#FFF0B8] text-[#7A4E00]",
  blue: "bg-[#DDF2FF] text-[#185D82]",
  green: "bg-[#DFF5EA] text-[#1F6B4D]",
  peach: "bg-[#FFE2D2] text-[#8E4022]",
  mint: "bg-[#E7F7F1] text-[#27664C]",
};

function isPhotoUrl(value: string | undefined) {
  return Boolean(value?.startsWith("http://") || value?.startsWith("https://"));
}

type ProductArtworkProps = {
  product: Product;
  label?: string;
  className?: string;
  compact?: boolean;
  showCaption?: boolean;
};

export function ProductArtwork({
  product,
  label,
  className,
  compact = false,
  showCaption = true,
}: ProductArtworkProps) {
  const category = product.category;
  const Icon = iconMap[category?.icon ?? "Baby"] ?? Baby;
  const imageUrl = isPhotoUrl(label) ? label : product.photos.find(isPhotoUrl);

  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-xl",
        compact ? "aspect-square min-h-0" : "aspect-[4/3] min-h-44",
        toneClass[product.photoTone],
        className,
      )}
      role="img"
      aria-label={`${product.title} - ${label ?? category?.name ?? "Produk"}`}
    >
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-white/20" />
      {!imageUrl ? (
        <div
          className={cn(
            "relative m-auto flex items-center justify-center rounded-2xl bg-white/65 shadow-sm",
            compact ? "size-12" : "size-20 sm:size-28",
          )}
        >
          <Icon
            className={compact ? "size-6" : "size-10 sm:size-14"}
            strokeWidth={1.8}
          />
        </div>
      ) : null}
      {!compact && showCaption ? (
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/78 px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur">
          {product.title}
        </div>
      ) : null}
    </div>
  );
}
