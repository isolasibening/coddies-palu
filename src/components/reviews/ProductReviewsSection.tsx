import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductReview } from "@/lib/services/reviews";

import { ReviewForm } from "./ReviewForm";

type ProductReviewsSectionProps = {
  productId: string;
  reviews: ProductReview[];
  isLoggedIn: boolean;
  isOwner: boolean;
  isSold: boolean;
};

function formatReviewDate(date: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function RatingLine({ label, value }: { label: string; value: number }) {
  return (
    <p className="flex items-center justify-between gap-3 rounded-xl bg-muted px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{value}/5</span>
    </p>
  );
}

export function ProductReviewsSection({
  productId,
  reviews,
  isLoggedIn,
  isOwner,
  isSold,
}: ProductReviewsSectionProps) {
  return (
    <section className="mt-8 grid gap-4 md:mt-10 md:gap-5">
      <div>
        <p className="text-sm font-semibold text-sky-700">Review</p>
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">Review pembeli</h2>
        <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
          Review sederhana setelah transaksi selesai.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="grid content-start gap-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatReviewDate(review.createdAt)}
                    </p>
                  </div>
                  <p className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-sky-700">
                    <Star className="size-3 fill-current" />
                    {review.averageRating.toFixed(1)}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-5 text-muted-foreground sm:mt-4 sm:leading-6">
                  {review.comment}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <RatingLine
                    label="Akurasi"
                    value={review.productAccuracyRating}
                  />
                  <RatingLine label="Kebersihan" value={review.hygieneRating} />
                  <RatingLine
                    label="Komunikasi"
                    value={review.communicationRating}
                  />
                  <RatingLine label="Keamanan" value={review.safetyRating} />
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white/70 p-4 text-sm leading-5 text-muted-foreground sm:p-6 sm:leading-6">
              Belum ada review untuk produk ini.
            </div>
          )}
        </div>

        <aside className="grid content-start gap-3">
          {isSold && isLoggedIn && !isOwner ? (
            <ReviewForm productId={productId} />
          ) : (
            <div className="rounded-2xl border border-border bg-white p-4 text-sm leading-5 text-muted-foreground shadow-sm sm:p-5 sm:leading-6">
              {!isSold
                ? "Review bisa diberikan setelah produk ditandai terjual."
                : isOwner
                  ? "Penjual tidak bisa memberi review untuk produknya sendiri."
                  : "Login untuk memberi review setelah transaksi selesai."}
              {!isLoggedIn && isSold ? (
                <Button asChild className="mt-4 w-full">
                  <Link href={`/login?redirectTo=/products/${productId}`}>
                    Login
                  </Link>
                </Button>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
