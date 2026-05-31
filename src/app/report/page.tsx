import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SupportReportForm } from "@/components/support/SupportReportForm";

export default function ReportPage() {
  return (
    <LegalPageLayout
      eyebrow="Support"
      title="Laporkan Masalah"
      description="Kirim laporan singkat tentang akun, produk, bug, atau saran untuk Coddies."
    >
      <SupportReportForm />
    </LegalPageLayout>
  );
}
