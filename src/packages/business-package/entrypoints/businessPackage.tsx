import type { EntryPoint } from 'repluggable';
import { AuthFlowsAPI } from '../../auth-package';
import { MainViewInfraAPI } from '../../main-view-package';
import { ScreensInfraAPI } from '../../screens-package';
import { BusinessContextInfraAPI } from '../apis/businessContextInfraAPI';
import { BusinessDataServiceAPI } from '../apis/businessDataServiceAPI';
import { createBusinessContextInfraAPI } from '../apis/createBusinessContextInfraAPI';
import { createBusinessDataServiceAPI } from '../apis/createBusinessDataServiceAPI';
import { BusinessProvider } from '../context/BusinessContext';
import { RoleGuard } from '../components/RoleGuard';
import { BusinessPickerScreen } from '../screens/BusinessPickerScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { NoPermissionScreen } from '../screens/NoPermissionScreen';

export const BusinessPackage: EntryPoint[] = [
  {
    name: 'BUSINESS_CONTEXT',
    layer: 'INFRA',

    declareAPIs() {
      return [BusinessContextInfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(BusinessContextInfraAPI, () => createBusinessContextInfraAPI());
    },

    extend(shell) {
      const mainViewAPI = shell.getAPI(MainViewInfraAPI);
      const businessContextAPI = shell.getAPI(BusinessContextInfraAPI);

      mainViewAPI.contributeProvider(shell, {
        provider: (children) => (
          <BusinessProvider businessContextAPI={businessContextAPI}>
            {children}
          </BusinessProvider>
        ),
      });
    },
  },

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
      return [AuthFlowsAPI, ScreensInfraAPI, BusinessDataServiceAPI, BusinessContextInfraAPI];
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const authFlowsAPI = shell.getAPI(AuthFlowsAPI);
      const businessDataAPI = shell.getAPI(BusinessDataServiceAPI);
      const businessContextAPI = shell.getAPI(BusinessContextInfraAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeScreen(shell, {
        name: 'BusinessPicker',
        screen: ({ navigation }) => (
          <BaseScreen>
            <BusinessPickerScreen
              navigation={navigation}
              getUserBusinesses={businessDataAPI.getUserBusinesses}
              onSelectBusiness={async (business, role, type) => {
                const token = await businessDataAPI.connectToBusiness(business.id);
                businessContextAPI.setBusinessContext({ businessId: business.id, role, type, token });
              }}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'Dashboard',
        screen: ({ navigation }) => (
          <BaseScreen>
            <RoleGuard role="admin" navigation={navigation}>
              <DashboardScreen navigation={navigation} onLogout={authFlowsAPI.logout} />
            </RoleGuard>
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'NoPermission',
        protected: false,
        screen: ({ navigation }) => (
          <BaseScreen>
            <NoPermissionScreen navigation={navigation} />
          </BaseScreen>
        ),
      });
    },
  },
];
