import { MainViewInfraAPI } from '../../main-view-package';
import { MainScreenWithNavigation } from '../components/mainScreenWithNavigation/mainScreenWithNavigation';
import { createScreensInfraAPI } from '../apis/createScreensInfraAPI';
import type { EntryPoint } from 'repluggable/dist/src/API';
import { ScreensInfraAPI } from '../apis/screensInfraAPI';

export const ScreensPackage: EntryPoint[] = [
  {
    name: 'SCREENS_PACKAGE',
    layer: 'INFRA',

    declareAPIs() {
      return [ScreensInfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(ScreensInfraAPI, () => createScreensInfraAPI(shell));
    },

    extend(shell) {
      const mainViewAPI = shell.getAPI(MainViewInfraAPI);
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      mainViewAPI.contributeComponent(shell, {
        component: () => (
          <MainScreenWithNavigation
            getInitialScreen={screensAPI.getInitialScreen}
            getScreens={screensAPI.getScreens}
            getScreenGuard={screensAPI.getScreenGuard}
          />
        ),
      });
    },
  },
];
