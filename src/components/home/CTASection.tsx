import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-y border-border bg-primary/25">
      <div className="container grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center md:py-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 sm:text-sm">
            <Heart className="size-4" />
            Barang bagus bisa lanjut dipakai.
          </div>
          <h2 className="mt-2 text-xl font-semibold sm:text-2xl md:text-3xl">
            Jual barang bayi yang sudah tidak dipakai.
          </h2>
          <p className="mt-2 hidden max-w-2xl text-sm leading-5 text-muted-foreground sm:block md:text-base">
            Unggah detail barang, tulis kondisi apa adanya, lalu biarkan calon
            pembeli menghubungi via WhatsApp.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/sell">
            Mulai jual
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
