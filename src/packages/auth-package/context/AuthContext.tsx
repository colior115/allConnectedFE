import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase';
import type { SiteContextInfraAPI } from '../apis/siteContextInfraAPI';

interface SiteContext {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<SiteContext | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  siteContextAPI: SiteContextInfraAPI;
}

export function AuthProvider({ children, siteContextAPI }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    siteContextAPI.registerSetters(setUser, setSession);

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [siteContextAPI]);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): SiteContext {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
