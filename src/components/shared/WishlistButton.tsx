"use client";

import { MouseEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toggleWishlistItem } from "@/lib/services/wishlist";
import { cn } from "@/lib/utils";

type WishlistButtonProps = {
  productId: string;
  initialSaved?: boolean;
  label?: boolean;
  className?: string;
};

export function WishlistButton({
  productId,
  initialSaved = false,
  label = false,
  className,
}: WishlistButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function toggleWishlist(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      const result = await toggleWishlistItem(productId);
      if (result.reason === "unauthenticated") {
        router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        return;
      }

      if (result.ok) {
        setIsSaved(result.isSaved);
        router.refresh();
      }
    });
  }

  return (
    <Button
      type="button"
      variant={isSaved ? "secondary" : "outline"}
      size={label ? "default" : "icon"}
      className={cn("shrink-0", className)}
      onClick={toggleWishlist}
      disabled={isPending}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Hapus dari wishlist" : "Simpan ke wishlist"}
    >
      <Heart className={cn(isSaved && "fill-current")} />
      {label
        ? isPending
          ? "Menyimpan"
          : isSaved
            ? "Tersimpan"
            : "Simpan"
        : null}
    </Button>
  );
}
