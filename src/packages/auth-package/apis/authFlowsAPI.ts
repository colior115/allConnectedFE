import type { SlotKey } from 'repluggable';

export const AuthFlowsAPI: SlotKey<AuthFlowsAPI> = {
  name: 'Auth Flows API',
  public: true,
  layer: 'FLOWS',
};

export interface AuthFlowsAPI {
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
