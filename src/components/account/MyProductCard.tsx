import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { ProductConditionBadge } from "@/components/product/ProductConditionBadge";
import { ProductArtwork } from "@/components/product/ProductArtwork";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

import { ProductStatusForm } from "./ProductStatusForm";
import { ProductDeleteButton } from "./ProductDeleteButton";

type MyProductCardProps = {
  product: Product;
};

function formatUploadedDate(date: string) {
  if (!date) {
    return "Tanggal belum tersedia";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Tanggal belum tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export function MyProductCard({ product }: MyProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-[136px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)]">
        <Link
          href={`/products/${product.id}`}
          aria-label={product.title}
          className="block min-w-0"
        >
          <ProductArtwork
            product={product}
            className="h-36 w-full rounded-xl sm:h-full"
            compact
            showCaption={false}
          />
        </Link>

        <div className="grid min-w-0 gap-3">
          <div className="grid gap-2">
            <div className="flex flex-wrap gap-2">
              <ProductStatusBadge status={product.status} />
              <ProductConditionBadge condition={product.condition} />
            </div>
            <div>
              <Link
                href={`/products/${product.id}`}
                className="line-clamp-2 text-base font-semibold leading-snug hover:underline"
              >
                {product.title}
              </Link>
              <p className="mt-1 text-lg font-bold">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              <span className="truncate">{product.location}</span>
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0" />
              <span>{formatUploadedDate(product.createdAt)}</span>
            </p>
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
            <ProductStatusForm
              productId={product.id}
              currentStatus={product.statusKey ?? "available"}
            />
            <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/products/${product.id}`}>Lihat Detail</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/account/products/${product.id}/edit`}>Edit</Link>
              </Button>
              <ProductDeleteButton productId={product.id} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
