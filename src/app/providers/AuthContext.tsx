import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabase';
import {
    login as loginService,
    register as registerService,
    logout as logoutService,
} from '../../features/auth/services/authService';
import { getUserForBusiness } from '../../features/user/services/userService';
import type { AppUser } from '../../features/user/types/user';

interface AuthContextValue {
    user: User | null;
    session: Session | null;
    appUser: AppUser | null;
    loading: boolean;
    login: (email: string, password: string, businessId: string) => Promise<void>;
    loadAppUser: (businessId: string, userId: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [appUser, setAppUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (!session?.user) setAppUser(null);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function login(email: string, password: string, businessId: string) {
        const data = await loginService(email, password);
        const businessUser = await getUserForBusiness(businessId, data.user!.id);
        setSession(data.session);
        setUser(data.user);
        setAppUser(businessUser);
    }

    async function loadAppUser(businessId: string, userId: string) {
        const businessUser = await getUserForBusiness(businessId, userId);
        setAppUser(businessUser);
    }

    async function register(email: string, password: string) {
        const data = await registerService(email, password);
        setSession(data.session);
        setUser(data.user);
    }

    async function logout() {
        await logoutService();
        setSession(null);
        setUser(null);
        setAppUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, session, appUser, loading, login, loadAppUser, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
