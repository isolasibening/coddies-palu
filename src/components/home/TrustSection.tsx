import { Camera, MapPinned, MessageCircle, Sparkles } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";

const items = [
  {
    title: "Foto lengkap",
    description: "Barang dilihat dari beberapa sisi.",
    icon: Camera,
  },
  {
    title: "Kondisi jelas",
    description: "Minus dan kelengkapan ditulis terbuka.",
    icon: Sparkles,
  },
  {
    title: "Lokasi Palu",
    description: "Kecamatan terlihat sejak kartu produk.",
    icon: MapPinned,
  },
  {
    title: "WhatsApp langsung",
    description: "Pembeli menghubungi penjual tanpa chat internal.",
    icon: MessageCircle,
  },
];

export function TrustSection() {
  return (
    <section className="container py-8 md:py-12">
      <SectionHeader
        eyebrow="Lebih tenang"
        title="Kenapa pilih Coddies"
        description="Fokus pada foto, kondisi, lokasi, dan kontak penjual."
      />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-5"
            >
              <Icon className="size-5 text-emerald-700 sm:size-6" />
              <h3 className="mt-3 text-sm font-semibold sm:mt-4 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
