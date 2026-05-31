import { Star } from "lucide-react";

import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/services/auth";
import { getAccountReviews, type AccountReview } from "@/lib/services/reviews";

export const dynamic = "force-dynamic";

function ReviewCard({ review }: { review: AccountReview }) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">{review.userName}</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {review.comment}
            </p>
          </div>
          <Badge variant="blue">{review.averageRating.toFixed(1)}/5</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AccountReviewsPage() {
  const user = await requireCurrentUser("/account/reviews");
  const reviews = await getAccountReviews(user.id);
  const hasReviews = reviews.given.length > 0 || reviews.received.length > 0;

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Review Saya"
        description="Review yang kamu berikan dan terima."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        {hasReviews ? (
          <div className="grid gap-6">
            <section className="grid gap-3">
              <h2 className="text-lg font-semibold">Review yang saya berikan</h2>
              {reviews.given.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {reviews.given.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm text-muted-foreground">
                  Belum ada review yang kamu berikan.
                </p>
              ) : null}
            </section>
            <section className="grid gap-3">
              <h2 className="text-lg font-semibold">Review yang saya terima</h2>
              {reviews.received.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {reviews.received.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm text-muted-foreground">
                  Belum ada review yang kamu terima.
                </p>
              ) : null}
            </section>
          </div>
        ) : (
          <EmptyState
            icon={Star}
            title="Belum ada review."
            description="Review muncul setelah transaksi selesai."
          />
        )}
      </div>
    </div>
  );
}
