import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export default function AboutPage() {
  return (
    <LegalPageLayout
      eyebrow="Tentang"
      title="Tentang Coddies"
      description="Teman Tumbuh si Kecil untuk keluarga di Palu."
    >
      <section>
        <h2 className="font-semibold">Apa itu Coddies</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Coddies adalah marketplace lokal untuk perlengkapan bayi dan balita
          preloved yang masih layak pakai.
        </p>
      </section>
      <section>
        <h2 className="font-semibold">Untuk siapa</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Coddies dibuat untuk orang tua yang ingin menjual barang si kecil yang
          sudah tidak dipakai, dan orang tua lain yang mencari pilihan lebih
          hemat.
        </p>
      </section>
      <section>
        <h2 className="font-semibold">Kenapa Palu</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Barang bayi berukuran besar sering kurang cocok dikirim jauh. Dengan
          fokus lokal, pembeli bisa cek barang dan COD lebih mudah.
        </p>
      </section>
      <section>
        <h2 className="font-semibold">Misi Coddies</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Membantu barang bayi yang masih bagus terus bermanfaat, mengurangi
          barang menumpuk di rumah, dan membuat jual beli lokal terasa lebih
          rapi.
        </p>
      </section>
    </LegalPageLayout>
  );
}
