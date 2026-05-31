import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";
import type { Database } from "@/lib/types";

export { isSupabaseConfigured };

export function createClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    throw new Error(config.error);
  }

  return createBrowserClient<Database>(config.url, config.anonKey);
}
