import type { Session, User } from '@supabase/supabase-js';
import type { SlotKey } from 'repluggable';

export const AuthDataServiceAPI: SlotKey<AuthDataServiceAPI> = {
  name: 'Auth Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface AuthDataServiceAPI {
  login(email: string, password: string): Promise<{ user: User; session: Session }>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
