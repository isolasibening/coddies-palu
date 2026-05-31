"use server";

import { revalidatePath } from "next/cache";
import type { User } from "@supabase/supabase-js";

import { defaultAvatarOptions } from "@/lib/avatar-options";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/types";

export type AccountProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
};

export type ProfileActionState = {
  error: string | null;
  success: string | null;
};

function getMetadataValue(user: User, key: string) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readFormFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function getSafeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uploadAvatarFile(userId: string, file: File) {
  if (!file.type.startsWith("image/")) {
    return { url: null, error: "File avatar harus berupa gambar." };
  }

  if (file.size > 2 * 1024 * 1024) {
    return { url: null, error: "Ukuran avatar maksimal 2 MB." };
  }

  const supabase = await createServerSupabaseClient();
  const safeName = getSafeFileName(file.name) || "avatar";
  const path = `${userId}/avatar-${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    const missingBucket =
      error.message.toLowerCase().includes("bucket") ||
      error.message.toLowerCase().includes("not found");

    return {
      url: null,
      error: missingBucket
        ? "Bucket avatars belum dibuat di Supabase Storage."
        : error.message,
    };
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

function mapAccountProfile(
  user: User,
  profile: ProfileRow | null,
): AccountProfile {
  const fallbackName =
    getMetadataValue(user, "name") ?? user.email?.split("@")[0] ?? "Pengguna Coddies";

  return {
    id: user.id,
    name: profile?.name || fallbackName,
    email: user.email || profile?.email || "-",
    phone: profile?.phone || getMetadataValue(user, "phone") || "-",
    location:
      profile?.location || getMetadataValue(user, "location") || "Kecamatan belum diisi",
    avatarUrl: profile?.avatar_url ?? "",
  };
}

export async function getAccountProfile(user: User): Promise<AccountProfile> {
  if (!isSupabaseConfigured()) {
    return mapAccountProfile(user, null);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    return mapAccountProfile(user, null);
  }

  return mapAccountProfile(user, data);
}

export async function updateProfileAction(
  _previousState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const userId = readFormValue(formData, "user_id");
  const name = readFormValue(formData, "name");
  const phone = readFormValue(formData, "phone");
  const location = readFormValue(formData, "location");
  const currentAvatarUrl = readFormValue(formData, "current_avatar_url");
  const avatarDefault = readFormValue(formData, "avatar_default");
  const avatarFile = readFormFile(formData, "avatar_file");

  if (!userId) {
    return { error: "Akun tidak valid.", success: null };
  }

  if (!name) {
    return { error: "Nama lengkap wajib diisi.", success: null };
  }

  if (!phone) {
    return {
      error: "Nomor WhatsApp wajib diisi agar kamu bisa menjual barang.",
      success: null,
    };
  }

  if (!location) {
    return {
      error: "Alamat atau kecamatan wajib diisi agar pembeli tahu lokasimu.",
      success: null,
    };
  }

  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum dikonfigurasi.", success: null };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || user.id !== userId) {
    return { error: "Login ulang untuk menyimpan profil.", success: null };
  }

  const now = new Date().toISOString();
  let avatarUrl = currentAvatarUrl || null;

  if (avatarFile) {
    const uploadResult = await uploadAvatarFile(user.id, avatarFile);

    if (uploadResult.error) {
      return { error: uploadResult.error, success: null };
    }

    avatarUrl = uploadResult.url;
  } else if (avatarDefault) {
    if (!defaultAvatarOptions.includes(avatarDefault)) {
      return { error: "Pilihan avatar tidak valid.", success: null };
    }

    avatarUrl = avatarDefault;
  }

  const profilePayload = {
    name,
    phone,
    location,
    avatar_url: avatarUrl,
    updated_at: now,
  };
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update(profilePayload)
    .eq("id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return { error: error.message, success: null };
  }

  if (!updatedProfile) {
    const { error: insertError } = await supabase
      .from("profiles")
      .insert({ id: user.id, ...profilePayload });

    if (insertError) {
      return { error: insertError.message, success: null };
    }
  }

  revalidatePath("/account");
  revalidatePath("/account/settings");

  return { error: null, success: "Profil berhasil disimpan." };
}
