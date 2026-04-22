import { supabase } from '../utils/supabase';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let getBusinessToken: () => string | null = () => null;
export const registerBusinessTokenGetter = (getter: () => string | null) => {
  getBusinessToken = getter;
};

export async function apiRequest(url: string, options?: RequestInit) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const businessToken = getBusinessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(businessToken ? { 'x-business-token': businessToken } : {}),
  };

  const response = await fetch(`${BACKEND_URL}/api${url}`, { ...options, headers });

  if (!response.ok) {
    const error = new Error(`API error ${response.status}: ${response.statusText}`) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  return response.json();
}