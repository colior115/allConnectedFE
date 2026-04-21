import { supabase } from '../../../utils/supabase';
import type { AuthSupabaseDataServiceAPI } from './authSupabaseDataServiceAPI';

export const createAuthSupabaseDataServiceAPI = (): AuthSupabaseDataServiceAPI => ({
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async register(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
});
