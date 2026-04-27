import type { EntryPoint } from 'repluggable';
import { AuthFlowsAPI } from '../../auth-package';
import { ScreensInfraAPI } from '../../screens-package';
import { createUserDataServiceAPI } from '../apis/createUserDataServiceAPI';
import { createUserUIAPI } from '../apis/createUserUIAPI';
import { UserDataServiceAPI } from '../apis/userDataServiceAPI';
import { UserUIAPI } from '../apis/userUIAPI';
import { LoginScreen } from '../screens/LoginScreen';

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

      screensAPI.contributeScreen(
        shell,
        {
          name: 'Login',
          protected: false,
          screen: ({ navigation }) => (
              <LoginScreen navigation={navigation} onLogin={authFlowsAPI.login}/>
          ),
        },
        true,
      );

      // screensAPI.contributeScreen(shell, {
      //   name: 'Register',
      //   protected: false,
      //   screen: ({ navigation }) => (
      //       <RegisterScreen navigation={navigation} onRegister={authFlowsAPI.register} />
      //   ),
      // });
    },
  },
];
