import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import {
  getSupabaseConfig,
  getSupabaseConfigurationError,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import type { Database } from "@/lib/types";

export { getSupabaseConfigurationError, isSupabaseConfigured };

export async function createServerSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    throw new Error(config.error);
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. Server actions can
          // refresh them on the next interactive request.
        }
      },
    },
  });
}

export async function createClient() {
  return createServerSupabaseClient();
}
