import { Heart, MessageCircle, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Cari barang",
    description: "Search dan filter.",
    icon: Search,
  },
  {
    title: "Cek kondisi",
    description: "Foto, minus, lokasi.",
    icon: ShieldCheck,
  },
  {
    title: "Simpan incaran",
    description: "Masuk wishlist.",
    icon: Heart,
  },
  {
    title: "Hubungi penjual",
    description: "Lanjut via WhatsApp.",
    icon: MessageCircle,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border/70 bg-white/55">
      <div className="container py-7 md:py-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
            Cara kerja
          </p>
          <h2 className="mt-1 text-xl font-semibold sm:text-2xl md:text-3xl">
            Cepat dan jelas
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-sky-700 sm:size-11">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold sm:mt-4 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
