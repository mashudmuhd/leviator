import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_URL_KEY = 'leviator_supabase_url';
const STORAGE_ANON_KEY = 'leviator_supabase_anon_key';

export function getSupabaseCredentials() {
  const url =
    import.meta.env.VITE_SUPABASE_URL ||
    localStorage.getItem(STORAGE_URL_KEY) ||
    '';
  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    localStorage.getItem(STORAGE_ANON_KEY) ||
    '';
  return { url, anonKey };
}

export function saveSupabaseCredentials(url: string, anonKey: string) {
  localStorage.setItem(STORAGE_URL_KEY, url.trim());
  localStorage.setItem(STORAGE_ANON_KEY, anonKey.trim());
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(url && anonKey && url.startsWith('http'));
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey) return null;

  try {
    if (!clientInstance) {
      clientInstance = createClient(url, anonKey, {
        auth: { persistSession: false },
      });
    }
    return clientInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}
