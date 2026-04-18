import { supabase } from '../utils/supabase';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function apiRequest(url: string, options?: RequestInit) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BACKEND_URL}/api${url}`, { ...options, headers });
  return response.json();
}