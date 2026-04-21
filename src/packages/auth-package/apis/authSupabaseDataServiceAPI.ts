import type { Session, User } from '@supabase/supabase-js';
import type { SlotKey } from 'repluggable';

export const AuthSupabaseDataServiceAPI: SlotKey<AuthSupabaseDataServiceAPI> = {
  name: 'Auth Supabase Data Service API',
  public: false,
  layer: 'DATA_SERVICE',
};

export interface AuthSupabaseDataServiceAPI {
  login(email: string, password: string): Promise<{ user: User; session: Session }>;
  register(email: string, password: string): Promise<{ user: User | null; session: Session | null }>;
  logout(): Promise<void>;
}
