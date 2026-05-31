import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const sections = [
  "Coddies adalah marketplace lokal untuk membantu orang tua di Palu mencari dan menjual perlengkapan bayi preloved.",
  "Pengguna bertanggung jawab menjaga akun, email, password, dan data profilnya.",
  "Produk yang diunggah harus memakai informasi jujur, foto asli, harga, kondisi, lokasi, dan kontak yang benar.",
  "Dilarang menjual produk ilegal, berbahaya, palsu, atau tidak layak pakai untuk bayi dan anak.",
  "Penjual bertanggung jawab atas kondisi barang, ketersediaan produk, dan komunikasi dengan pembeli.",
  "Pembeli bertanggung jawab mengecek barang, menyepakati harga, dan memilih lokasi COD yang aman.",
  "Transaksi dilakukan langsung antar pengguna melalui WhatsApp atau kesepakatan masing-masing.",
  "COD dan komunikasi dilakukan atas kesepakatan pengguna. Coddies tidak menjadi pihak pembayaran.",
  "Coddies dapat menghapus produk atau akun yang melanggar aturan komunitas.",
  "Coddies tidak bertanggung jawab atas kerugian yang terjadi di luar aplikasi setelah pengguna bertransaksi langsung.",
  "Syarat dan ketentuan dapat diperbarui sesuai kebutuhan MVP dan perkembangan layanan.",
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Syarat dan Ketentuan"
      description="Aturan dasar penggunaan Coddies sebagai marketplace lokal MVP."
    >
      <ol className="grid gap-3">
        {sections.map((section, index) => (
          <li key={section} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground">{index + 1}.</span>
            <span>{section}</span>
          </li>
        ))}
      </ol>
    </LegalPageLayout>
  );
}
