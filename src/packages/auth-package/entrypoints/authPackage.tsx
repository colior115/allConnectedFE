import { useEffect } from 'react';
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
import { AuthProvider, useAuth } from '../context/AuthContext';
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
      return [MainViewInfraAPI, ScreensInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(SiteContextInfraAPI, () => createSiteContextInfraAPI());
    },

    extend(shell) {
      const mainViewAPI = shell.getAPI(MainViewInfraAPI);
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const siteContextAPI = shell.getAPI(SiteContextInfraAPI);

      mainViewAPI.contributeProvider(shell, {
        provider: (children) => (
          <AuthProvider siteContextAPI={siteContextAPI}>{children}</AuthProvider>
        ),
      });

      screensAPI.setScreenGuard(({ navigate, children }) => {
        const { user, loading } = useAuth();
        useEffect(() => {
          if (!loading && !user) navigate('Login');
        }, [loading, user, navigate]);
        if (loading) return null;
        return user ? <>{children}</> : null;
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
      return [AuthDataServiceAPI, SiteContextInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(AuthFlowsAPI, () => createAuthFlowsAPI(shell));
    }
  },

  {
    name: 'AUTH_UI',
    layer: 'UI',

    getDependencyAPIs() {
      return [AuthFlowsAPI, ScreensInfraAPI];
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const authFlowsAPI = shell.getAPI(AuthFlowsAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeScreen(
        shell,
        {
          name: 'Login',
          protected: false,
          screen: ({ navigation }) => (
            <BaseScreen>
              <LoginScreen navigation={navigation} onLogin={authFlowsAPI.login} />
            </BaseScreen>
          ),
        },
        true,
      );

      screensAPI.contributeScreen(shell, {
        name: 'Register',
        protected: false,
        screen: ({ navigation }) => (
          <BaseScreen>
            <RegisterScreen navigation={navigation} onRegister={authFlowsAPI.register} />
          </BaseScreen>
        ),
      });
    },
  },
];
