import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const cookieStorage = {
  getItem(key: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  },
  setItem(key: string, value: string): void {
    document.cookie = `${key}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  },
  removeItem(key: string): void {
    document.cookie = `${key}=; max-age=0; path=/`;
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: cookieStorage,
    persistSession: true,
  },
});
