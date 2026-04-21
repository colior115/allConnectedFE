import type { EntryPoint } from 'repluggable';
import { AuthFlowsAPI } from '../../auth-package';
import { ScreensInfraAPI } from '../../screens-package';
import { BusinessDataServiceAPI } from '../apis/businessDataServiceAPI';
import { createBusinessDataServiceAPI } from '../apis/createBusinessDataServiceAPI';
import { DashboardScreen } from '../screens/DashboardScreen';
import { BusinessPickerScreen } from '../screens/BusinessPickerScreen';

export const BusinessPackage: EntryPoint[] = [
  {
    name: 'BUSINESS_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [BusinessDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(BusinessDataServiceAPI, () => createBusinessDataServiceAPI());
    },
  },

  {
    name: 'BUSINESS_UI',
    layer: 'UI',

    getDependencyAPIs() {
      return [AuthFlowsAPI, ScreensInfraAPI, BusinessDataServiceAPI];
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const authFlowsAPI = shell.getAPI(AuthFlowsAPI);
      const businessDataAPI = shell.getAPI(BusinessDataServiceAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeScreen(shell, {
        name: 'BusinessPicker',
        screen: ({ navigation }) => (
          <BaseScreen>
            <BusinessPickerScreen
              navigation={navigation}
              getUserBusinesses={businessDataAPI.getUserBusinesses}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'Dashboard',
        screen: ({ navigation }) => (
          <BaseScreen>
            <DashboardScreen navigation={navigation} onLogout={authFlowsAPI.logout} />
          </BaseScreen>
        ),
      });
    },
  },
];
