import type { EntryPoint } from 'repluggable';
import { AuthFlowsAPI } from '../../auth-package';
import { ScreensInfraAPI } from '../../screens-package';
import { UserDataServiceAPI } from '../apis/userDataServiceAPI';
import { createUserDataServiceAPI } from '../apis/createUserDataServiceAPI';
import { UserUIAPI } from '../apis/userUIAPI';
import { createUserUIAPI } from '../apis/createUserUIAPI';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export const UserPackage: EntryPoint[] = [
  {
    name: 'USER_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [UserDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(UserDataServiceAPI, () => createUserDataServiceAPI());
    },
  },

  {
    name: 'USER_UI',
    layer: 'UI',

    declareAPIs() {
      return [UserUIAPI];
    },

    getDependencyAPIs() {
      return [AuthFlowsAPI, ScreensInfraAPI, UserDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(UserUIAPI, () => createUserUIAPI(shell));
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
