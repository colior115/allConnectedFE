import type { Session, User } from '@supabase/supabase-js';
import type { SlotKey } from 'repluggable';

export const SiteContextInfraAPI: SlotKey<SiteContextInfraAPI> = {
  name: 'Site Context Infra API',
  public: true,
  layer: 'INFRA',
};

export interface SiteContextInfraAPI {
  setUser(user: User | null): void;
  setSession(session: Session | null): void;
  clearContext(): void;
  /** Called by AuthProvider on mount to wire React state setters into this API. */
  registerSetters(
    setUser: (user: User | null) => void,
    setSession: (session: Session | null) => void,
  ): void;
}
