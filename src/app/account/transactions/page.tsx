import { ReceiptText } from "lucide-react";

import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/services/auth";
import { getAccountTransactions } from "@/lib/services/transactions";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AccountTransactionsPage() {
  const user = await requireCurrentUser("/account/transactions");
  const transactions = await getAccountTransactions(user.id);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Transaksi Saya"
        description="Catatan produk yang ditandai terjual."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        {transactions.length > 0 ? (
          <div className="grid gap-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
                  <div>
                    <p className="font-semibold">{transaction.productTitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(transaction.finalPrice)} · {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="green">{transaction.status}</Badge>
                    <Badge variant="outline">{transaction.role}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="Belum ada transaksi."
            description="Transaksi muncul saat produk ditandai terjual."
          />
        )}
      </div>
    </div>
  );
}
