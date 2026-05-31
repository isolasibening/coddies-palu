import Link from "next/link";
import {
  Mail,
  MapPin,
  Package,
  Phone,
  Settings,
  Star,
} from "lucide-react";

import { MyProductCard } from "@/components/account/MyProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/services/auth";
import { getAccountProfile } from "@/lib/services/profile";
import { getProductsBySellerId } from "@/lib/services/products";
import { getAccountReviews } from "@/lib/services/reviews";
import { getCompletedTransactionCountBySellerId } from "@/lib/services/transactions";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireCurrentUser("/account");
  const [profile, myProducts, completedTransactionCount, accountReviews] =
    await Promise.all([
      getAccountProfile(user),
      getProductsBySellerId(user.id),
      getCompletedTransactionCountBySellerId(user.id),
      getAccountReviews(user.id),
    ]);
  const uploadedCount = myProducts.length;
  const productSoldCount = myProducts.filter(
    (product) => product.statusKey === "sold",
  ).length;
  const soldCount = Math.max(completedTransactionCount ?? 0, productSoldCount);
  const initial = profile.name.trim().charAt(0).toUpperCase() || "C";
  const avatarUrl = profile.avatarUrl;
  const latestReviews = [
    ...accountReviews.received.map((review) => ({
      ...review,
      label: "Diterima",
    })),
    ...accountReviews.given.map((review) => ({
      ...review,
      label: "Diberikan",
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Akun kamu"
        description="Profil, statistik, dan barang jualanmu."
      />

      <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[320px_1fr]">
        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt=""
                    className="size-14 rounded-full border border-border bg-white object-cover"
                  />
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-xl font-bold text-sky-700">
                    {initial}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {profile.location}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="size-4 text-sky-700" />
                  <span className="min-w-0 truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="size-4 text-emerald-700" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-amber-600" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm">
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-lg font-bold">{uploadedCount}</p>
                  <p className="text-xs text-muted-foreground">Diunggah</p>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-lg font-bold">{soldCount}</p>
                  <p className="text-xs text-muted-foreground">Terjual</p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full">
                <Link href="/sell">Jual Barang</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/account/settings">
                  <Settings className="size-4" />
                  Pengaturan
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
            <h2 className="text-xl font-semibold">Barang saya</h2>
            <Button asChild variant="outline">
              <Link href="/sell">Tambah</Link>
            </Button>
          </div>
          {myProducts.length > 0 ? (
            <div className="grid gap-4">
              {myProducts.map((product) => (
                <MyProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="Kamu belum mengunggah barang."
              description="Jual barang si kecil di Coddies."
              action={{ label: "Jual Barang Sekarang", href: "/sell" }}
            />
          )}

          <div className="mt-6 grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Review terbaru</h2>
              <Button asChild variant="outline">
                <Link href="/account/reviews">Lihat semua</Link>
              </Button>
            </div>
            {latestReviews.length > 0 ? (
              <div className="grid gap-3">
                {latestReviews.map((review) => (
                  <Card key={`${review.label}-${review.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {review.label} - {review.userName}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-sky-700">
                          <Star className="size-3 fill-current" />
                          {review.averageRating.toFixed(1)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm text-muted-foreground">
                Belum ada review.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
