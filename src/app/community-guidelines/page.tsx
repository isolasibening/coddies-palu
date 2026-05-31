import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const guidelines = [
  "Gunakan foto asli barang.",
  "Jelaskan kondisi barang dengan jujur.",
  "Cantumkan minus atau kerusakan.",
  "Jangan menjual barang berbahaya.",
  "Jangan spam produk.",
  "Jangan menipu pembeli.",
  "Jaga sopan santun saat komunikasi.",
  "Bertemu COD di tempat aman.",
  "Laporkan produk atau pengguna mencurigakan.",
];

export default function CommunityGuidelinesPage() {
  return (
    <LegalPageLayout
      eyebrow="Komunitas"
      title="Panduan Komunitas"
      description="Agar jual beli barang bayi preloved tetap aman dan nyaman."
    >
      <ul className="grid gap-3">
        {guidelines.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-border bg-white/80 p-3 text-sm font-semibold"
          >
            {item}
          </li>
        ))}
      </ul>
    </LegalPageLayout>
  );
}
