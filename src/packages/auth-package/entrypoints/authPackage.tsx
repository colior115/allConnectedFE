import type { EntryPoint } from 'repluggable';
import { MainViewInfraAPI } from '../../main-view-package';
import { ScreensInfraAPI } from '../../screens-package';
import { AuthDataServiceAPI } from '../apis/authDataServiceAPI';
import { createAuthDataServiceAPI } from '../apis/createAuthDataServiceAPI';
import { AuthSupabaseDataServiceAPI } from '../apis/authSupabaseDataServiceAPI';
import { createAuthSupabaseDataServiceAPI } from '../apis/createAuthSupabaseDataServiceAPI';
import { AuthFlowsAPI } from '../apis/authFlowsAPI';
import { createAuthFlowsAPI } from '../apis/createAuthFlowsAPI';
import { SiteContextInfraAPI } from '../apis/siteContextInfraAPI';
import { createSiteContextInfraAPI } from '../apis/createSiteContextInfraAPI';
import { AuthProvider } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export const AuthPackage: EntryPoint[] = [
  {
    name: 'AUTH_SITE_CONTEXT',
    layer: 'INFRA',

    declareAPIs() {
      return [SiteContextInfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(SiteContextInfraAPI, () => createSiteContextInfraAPI());
    },

    extend(shell) {
      const mainViewAPI = shell.getAPI(MainViewInfraAPI);
      const siteContextAPI = shell.getAPI(SiteContextInfraAPI);

      mainViewAPI.contributeProvider(shell, {
        provider: (children) => (
          <AuthProvider siteContextAPI={siteContextAPI}>{children}</AuthProvider>
        ),
      });
    },
  },

  {
    name: 'AUTH_SUPABASE_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [AuthSupabaseDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(AuthSupabaseDataServiceAPI, () =>
        createAuthSupabaseDataServiceAPI(),
      );
    },
  },

  {
    name: 'AUTH_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [AuthDataServiceAPI];
    },

    getDependencyAPIs() {
      return [AuthSupabaseDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(AuthDataServiceAPI, () => createAuthDataServiceAPI(shell));
    },
  },

  {
    name: 'AUTH_FLOWS',
    layer: 'FLOWS',

    declareAPIs() {
      return [AuthFlowsAPI];
    },

    getDependencyAPIs() {
      return [AuthDataServiceAPI, SiteContextInfraAPI, ScreensInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(AuthFlowsAPI, () => createAuthFlowsAPI(shell));
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const authFlowsAPI = shell.getAPI(AuthFlowsAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeScreen(
        shell,
        {
          name: 'Login',
          screen: ({ navigation }) => (
            <BaseScreen>
              <LoginScreen navigation={navigation} authFlowsAPI={authFlowsAPI} />
            </BaseScreen>
          ),
        },
        true,
      );

      screensAPI.contributeScreen(shell, {
        name: 'Register',
        screen: ({ navigation }) => (
          <BaseScreen>
            <RegisterScreen navigation={navigation} authFlowsAPI={authFlowsAPI} />
          </BaseScreen>
        ),
      });
    },
  },
];
