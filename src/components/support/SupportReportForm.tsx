"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createSupportReportAction,
  type SupportReportActionState,
} from "@/lib/services/support-reports";

const initialState: SupportReportActionState = {
  error: null,
  success: null,
};

const reportTypes = [
  "Masalah akun",
  "Masalah produk",
  "Penjual mencurigakan",
  "Pembeli mencurigakan",
  "Bug aplikasi",
  "Saran fitur",
  "Lainnya",
];

function ReportSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Mengirim..." : "Kirim Laporan"}
    </Button>
  );
}

export function SupportReportForm() {
  const [state, formAction] = useActionState(
    createSupportReportAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="type">Jenis masalah</Label>
        <Select id="type" name="type" defaultValue="" required>
          <option value="" disabled>
            Pilih jenis masalah
          </option>
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Judul laporan</Label>
        <Input id="title" name="title" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi masalah</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact">Email/WhatsApp kontak</Label>
        <Input id="contact" name="contact" placeholder="Opsional" />
      </div>
      <div className="rounded-xl border border-dashed border-border bg-white/80 p-3 text-sm text-muted-foreground">
        Lampiran screenshot belum diaktifkan untuk MVP.
      </div>
      {state.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {state.success}
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {state.error}
        </p>
      ) : null}
      <ReportSubmitButton />
    </form>
  );
}
