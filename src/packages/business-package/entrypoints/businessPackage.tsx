import type { EntryPoint } from 'repluggable';
import Dashboard from '../../../assets/images/icons/dashboard.svg?react';
import { AuthFlowsAPI } from '../../auth-package';
import { EmployeeUIAPI } from '../../employee-package';
import { MainViewInfraAPI } from '../../main-view-package';
import { ScreensInfraAPI } from '../../screens-package';
import { BusinessContextInfraAPI } from '../apis/businessContextInfraAPI';
import { BusinessDataServiceAPI } from '../apis/businessDataServiceAPI';
import { createBusinessContextInfraAPI } from '../apis/createBusinessContextInfraAPI';
import { createBusinessDataServiceAPI } from '../apis/createBusinessDataServiceAPI';
import { BusinessSidebarHeader } from '../components/BusinessSidebarHeader';
import { BusinessProvider } from '../context/BusinessContext';
import { AddEmployeeScreen } from '../screens/AddEmployeeScreen';
import { BusinessPickerScreen } from '../screens/BusinessPickerScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { NoPermissionScreen } from '../screens/NoPermissionScreen';
import { AllConnectedServerSdkAPI } from '../../../common-services';

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

    getDependencyAPIs() {
      return [AllConnectedServerSdkAPI];
    },

    attach(shell) {
      shell.contributeAPI(BusinessDataServiceAPI, () => createBusinessDataServiceAPI(shell));
    },
  },

  {
    name: 'BUSINESS_UI',
    layer: 'UI',

    getDependencyAPIs() {
      return [AuthFlowsAPI, ScreensInfraAPI, BusinessDataServiceAPI, BusinessContextInfraAPI, EmployeeUIAPI];
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const authFlowsAPI = shell.getAPI(AuthFlowsAPI);
      const businessDataServiceAPI = shell.getAPI(BusinessDataServiceAPI);
      const businessContextAPI = shell.getAPI(BusinessContextInfraAPI);
      const employeeUIAPI = shell.getAPI(EmployeeUIAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.setSidebarHeader(BusinessSidebarHeader);

      screensAPI.contributeSidebarItem(shell, {
        screenName: 'Dashboard',
        titleKey: 'dashboard.title',
        Icon: Dashboard,
        order: 1,
      });

      screensAPI.contributeScreen(shell, {
        name: 'BusinessPicker',
        screen: ({ navigation }) => (
          <BaseScreen titleKey="businessPicker.title" goToPrevDisabled={true}>
            <BusinessPickerScreen
              navigation={navigation}
              getUserBusinesses={businessDataServiceAPI.getUserBusinesses}
              onSelectBusiness={async (business, role) => {
                const token = await businessDataServiceAPI.connectToBusiness(business.id);
                businessContextAPI.setBusinessContext({ businessId: business.id, name: business.name, role, token });
              }}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'Dashboard',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="dashboard.title" goToPrevDisabled={true}>
            <DashboardScreen navigation={navigation} onLogout={authFlowsAPI.logout} />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'AddEmployee',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="dashboard.addEmployee">
            <AddEmployeeScreen
              navigation={navigation}
              AddEmployeeForm={employeeUIAPI.components.AddEmployeeForm}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'NoPermission',
        protected: false,
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="noPermission.title">
            <NoPermissionScreen />
          </BaseScreen>
        ),
      });
    },
  },
];
