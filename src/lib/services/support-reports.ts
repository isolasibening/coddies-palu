"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/services/auth";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { Database } from "@/lib/types";

export type SupportReportActionState = {
  error: string | null;
  success: string | null;
};

type SupportReportInsert =
  Database["public"]["Tables"]["support_reports"]["Insert"];

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createSupportReportAction(
  _previousState: SupportReportActionState,
  formData: FormData,
): Promise<SupportReportActionState> {
  const type = readFormValue(formData, "type");
  const title = readFormValue(formData, "title");
  const description = readFormValue(formData, "description");
  const contact = readFormValue(formData, "contact");

  if (!type || !title || !description) {
    return {
      error: "Jenis masalah, judul, dan deskripsi wajib diisi.",
      success: null,
    };
  }

  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum dikonfigurasi.", success: null };
  }

  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();
  const payload: SupportReportInsert = {
    user_id: user?.id ?? null,
    type,
    title,
    description,
    contact: contact || null,
  };

  const { error } = await supabase.from("support_reports").insert(payload);

  if (error) {
    const missingTable =
      error.message.includes("support_reports") ||
      error.message.includes("Could not find the table");

    return {
      error: missingTable
        ? "Tabel support_reports belum tersedia. Jalankan SQL migration yang disertakan."
        : error.message,
      success: null,
    };
  }

  revalidatePath("/report");

  return {
    error: null,
    success: "Laporan berhasil dikirim. Terima kasih sudah membantu Coddies lebih rapi.",
  };
}
