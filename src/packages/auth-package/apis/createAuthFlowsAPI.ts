import type { Shell } from 'repluggable';
import { AuthDataServiceAPI } from './authDataServiceAPI';
import { SiteContextInfraAPI } from './siteContextInfraAPI';
import type { AuthFlowsAPI } from './authFlowsAPI';

export const createAuthFlowsAPI = (shell: Shell): AuthFlowsAPI => {
  const authDataAPI = shell.getAPI(AuthDataServiceAPI);
  const siteContext = shell.getAPI(SiteContextInfraAPI);

  return {
    async login(email, password) {
      const { user, session } = await authDataAPI.login(email, password);
      siteContext.setUser(user);
      siteContext.setSession(session);
    },

    async register(email, password) {
      await authDataAPI.register(email, password);
    },

    async logout() {
      await authDataAPI.logout();
      siteContext.clearContext();
    },
  };
};
