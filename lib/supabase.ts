import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  return browserClient;
}

export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createClient(
    env.supabaseUrl,
    env.supabaseServiceRoleKey || env.supabaseAnonKey,
    {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    },
  );
}
