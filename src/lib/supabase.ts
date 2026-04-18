import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase no está configurado. Revisá .env.local → VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (ver SUPABASE_SETUP.md)."
    );
  }
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return client;
};

export const STORAGE_BUCKET = "product-images";
