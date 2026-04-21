import type { AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase';

export async function register(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        throw error;
    }

    return data;
}

export async function login(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw error;
    }

    return data;
}

export async function logout(): Promise<Boolean> {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }

    return true;
}
