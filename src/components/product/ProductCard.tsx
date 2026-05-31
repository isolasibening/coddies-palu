import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/shared/WishlistButton";

import { ProductArtwork } from "./ProductArtwork";
import { ProductConditionBadge } from "./ProductConditionBadge";
import { ProductStatusBadge } from "./ProductStatusBadge";

type ProductCardProps = {
  product: Product;
  isWishlisted?: boolean;
};

export function ProductCard({
  product,
  isWishlisted = false,
}: ProductCardProps) {
  const category = product.category;

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`} aria-label={product.title}>
          <ProductArtwork
            product={product}
            className="rounded-none"
            showCaption={false}
          />
        </Link>
        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} initialSaved={isWishlisted} />
        </div>
      </div>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700 sm:block">
              {category?.name ?? product.categoryId}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="mt-1 block line-clamp-2 text-sm font-semibold leading-snug hover:underline sm:text-base"
            >
              {product.title}
            </Link>
          </div>
        </div>

        <p className="mt-3 text-base font-bold sm:text-lg">
          {formatPrice(product.price)}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          <MapPin className="size-3.5 sm:size-4" />
          <span>{product.location}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <ProductConditionBadge condition={product.condition} />
          <ProductStatusBadge status={product.status} />
        </div>

        <Button asChild variant="outline" className="mt-3 w-full sm:mt-4" size="sm">
          <Link href={`/products/${product.id}`}>Detail</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
