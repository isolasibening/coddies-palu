import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const sections = [
  {
    title: "Data yang dikumpulkan",
    body: "Coddies mengumpulkan data akun seperti nama, email, nomor WhatsApp, kecamatan, dan data profil yang kamu isi.",
  },
  {
    title: "Cara data digunakan",
    body: "Data digunakan untuk menampilkan profil penjual, mengelola produk, wishlist, pencarian tersimpan, transaksi sederhana, review, dan laporan bantuan.",
  },
  {
    title: "Data produk yang diunggah",
    body: "Produk yang kamu unggah dapat berisi judul, deskripsi, harga, kondisi, lokasi, nomor WhatsApp, foto produk, dan status barang.",
  },
  {
    title: "Data kontak dan lokasi",
    body: "Nomor WhatsApp dan kecamatan dipakai agar pembeli bisa menghubungi penjual dan memahami area COD.",
  },
  {
    title: "Foto produk",
    body: "Foto produk disimpan di Supabase Storage dan digunakan untuk menampilkan listing di katalog.",
  },
  {
    title: "Cookies atau local storage",
    body: "Coddies dapat memakai local storage untuk preferensi sederhana seperti pengaturan notifikasi MVP.",
  },
  {
    title: "Keamanan data",
    body: "Autentikasi dan penyimpanan data menggunakan Supabase. Pengguna tetap perlu menjaga email dan password masing-masing.",
  },
  {
    title: "Hak pengguna",
    body: "Kamu dapat memperbarui data profil dan menghapus produk milikmu dari halaman akun.",
  },
  {
    title: "Pembayaran",
    body: "Coddies tidak memproses pembayaran di dalam aplikasi pada tahap MVP.",
  },
  {
    title: "Kontak pengelola",
    body: "Gunakan halaman Laporkan Masalah untuk pertanyaan privasi, perbaikan data, atau laporan keamanan.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Kebijakan Privasi"
      description="Penjelasan sederhana tentang data yang dipakai oleh Coddies."
    >
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-semibold">{section.title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {section.body}
          </p>
        </section>
      ))}
    </LegalPageLayout>
  );
}
