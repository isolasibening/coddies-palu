"use client";

import { useState } from "react";

import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

import { ProductArtwork } from "./ProductArtwork";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhoto = product.photos[activeIndex] ?? product.photos[0];

  return (
    <div className="grid gap-3">
      <ProductArtwork
        product={product}
        label={activePhoto}
        className="min-h-56 sm:min-h-72"
      />
      <div className="grid grid-cols-4 gap-2">
        {product.photos.map((photo, index) => (
          <button
            key={`${photo}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "overflow-hidden rounded-xl border bg-white text-left shadow-sm transition",
              activeIndex === index ? "border-primary" : "border-border",
            )}
          >
            <ProductArtwork
              product={product}
              label={photo.startsWith("http") ? `Foto ${index + 1}` : photo}
              className="min-h-20 rounded-none"
              compact
            />
          </button>
        ))}
      </div>
    </div>
  );
}
