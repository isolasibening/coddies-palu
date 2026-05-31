import { HelpAccordion } from "@/components/help/HelpAccordion";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const helpItems = [
  {
    title: "Cara membeli barang",
    content:
      "Cari produk dari katalog, buka detailnya, cek foto dan kondisi, lalu hubungi penjual lewat WhatsApp.",
  },
  {
    title: "Cara menjual barang",
    content:
      "Login, buka Jual Barang, isi data penting, upload foto asli, lalu produk akan tampil di katalog.",
  },
  {
    title: "Cara menghubungi penjual",
    content:
      "Gunakan tombol Hubungi Penjual di halaman detail produk. Komunikasi dilakukan langsung lewat WhatsApp.",
  },
  {
    title: "Cara COD dengan aman",
    content:
      "Pilih tempat ramai, cek barang sebelum membayar, dan sepakati waktu serta lokasi dengan jelas.",
  },
  {
    title: "Cara mengubah status produk",
    content:
      "Buka Akun, masuk ke Barang Saya, lalu ubah status listing sesuai kondisi terbaru.",
  },
  {
    title: "Cara menyimpan wishlist",
    content:
      "Tekan ikon hati di kartu atau detail produk. Kamu harus login untuk menyimpan wishlist.",
  },
  {
    title: "Cara melaporkan produk",
    content:
      "Buka halaman Laporkan Masalah dan kirim detail singkat agar tim Coddies bisa meninjau.",
  },
  {
    title: "Masalah akun",
    content:
      "Coba login ulang atau gunakan reset password dari halaman Keamanan Akun.",
  },
  {
    title: "Masalah upload foto",
    content:
      "Pastikan bucket product-photos tersedia di Supabase dan ukuran foto tidak terlalu besar.",
  },
];

export default function HelpPage() {
  return (
    <LegalPageLayout
      eyebrow="Bantuan"
      title="Help Center"
      description="Jawaban singkat untuk aktivitas utama di Coddies."
    >
      <HelpAccordion items={helpItems} />
      <section id="kontak" className="rounded-2xl bg-[#fff7df] p-4">
        <h2 className="font-semibold">Kontak</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Untuk laporan bug, akun, atau produk mencurigakan, gunakan halaman
          Laporkan Masalah.
        </p>
      </section>
    </LegalPageLayout>
  );
}
