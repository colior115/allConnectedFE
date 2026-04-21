import type { Shell } from 'repluggable';
import type { AuthDataServiceAPI } from './authDataServiceAPI';
import { AuthSupabaseDataServiceAPI } from './authSupabaseDataServiceAPI';

export const createAuthDataServiceAPI = (
  shell: Shell
): AuthDataServiceAPI => {
  const authSupabaseDataServiceAPI = shell.getAPI(AuthSupabaseDataServiceAPI);
  return {
    async login(email, password) {
      return authSupabaseDataServiceAPI.login(email, password);
    },

    async register(email, password) {
      await authSupabaseDataServiceAPI.register(email, password);
    },

    async logout() {
      await authSupabaseDataServiceAPI.logout();
    },
  }
}
