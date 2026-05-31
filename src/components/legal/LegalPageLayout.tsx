import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type LegalPageLayoutProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPageLayout({
  eyebrow = "Coddies",
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <article className="grid gap-4 rounded-2xl border border-border bg-white/90 p-5 shadow-sm">
        {children}
      </article>
      <Button asChild variant="outline" className="mt-5">
        <Link href="/account">Kembali</Link>
      </Button>
    </div>
  );
}
