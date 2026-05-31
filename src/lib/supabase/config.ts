type SupabaseConfig =
  | {
      isConfigured: true;
      url: string;
      anonKey: string;
      error: null;
    }
  | {
      isConfigured: false;
      url: null;
      anonKey: null;
      error: string;
    };

const missingEnvHelp =
  "Buat file .env.local di root project, isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY dari Supabase, lalu restart dev server.";

function isPlaceholder(value: string) {
  const normalized = value.toLowerCase();

  return (
    normalized.includes("your-") ||
    normalized.includes("xxxxx") ||
    normalized.includes("anon-key")
  );
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSupabaseConfig(): SupabaseConfig {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      isConfigured: false,
      url: null,
      anonKey: null,
      error: `Supabase belum dikonfigurasi. ${missingEnvHelp}`,
    };
  }

  if (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnonKey)) {
    return {
      isConfigured: false,
      url: null,
      anonKey: null,
      error: `Supabase masih memakai nilai contoh. ${missingEnvHelp}`,
    };
  }

  if (!isValidUrl(supabaseUrl)) {
    return {
      isConfigured: false,
      url: null,
      anonKey: null,
      error:
        "NEXT_PUBLIC_SUPABASE_URL tidak valid. Gunakan URL project Supabase, misalnya https://project-ref.supabase.co.",
    };
  }

  return {
    isConfigured: true,
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    error: null,
  };
}

export function isSupabaseConfigured() {
  return getSupabaseConfig().isConfigured;
}

export function getSupabaseConfigurationError() {
  return (
    getSupabaseConfig().error ??
    `Supabase belum dikonfigurasi. ${missingEnvHelp}`
  );
}
