import type { EntryPoint } from 'repluggable';
import CustomersIcon from '../../../assets/images/icons/employees.svg?react';
import { AllConnectedServerSdkAPI } from '../../../common-services';
import { AddEntityScreen } from '../../../components';
import { useBusinessContext } from '../../business-package';
import { ScreensInfraAPI } from '../../screens-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { createCustomerDataServiceAPI } from '../apis/createCustomerDataServiceAPI';
import { createCustomerUIAPI } from '../apis/createCustomerUIAPI';
import { CustomerDataServiceAPI } from '../apis/customerDataServiceAPI';
import { CustomerUIAPI } from '../apis/customerUIAPI';
import { CustomersListScreen } from '../screens/CustomersListScreen';
import { CustomerViewerScreen } from '../screens/CustomerViewerScreen';

export const CustomerPackage: EntryPoint[] = [
  {
    name: 'CUSTOMER_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [CustomerDataServiceAPI];
    },

    getDependencyAPIs() {
      return [AllConnectedServerSdkAPI];
    },

    attach(shell) {
      shell.contributeAPI(CustomerDataServiceAPI, () => createCustomerDataServiceAPI(shell));
    },
  },

  {
    name: 'CUSTOMER_UI',
    layer: 'UI',

    declareAPIs() {
      return [CustomerUIAPI];
    },

    getDependencyAPIs() {
      return [CustomerDataServiceAPI, ScreensInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(CustomerUIAPI, () => createCustomerUIAPI(shell));
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const customerDataAPI = shell.getAPI(CustomerDataServiceAPI);
      const customerUIAPI = shell.getAPI(CustomerUIAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeSidebarItem(shell, {
        screenName: 'CustomersList',
        titleKey: 'customer.listTitle',
        Icon: CustomersIcon,
        order: 3,
      });

      screensAPI.contributeScreen(shell, {
        name: 'CustomersList',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="customer.listTitle" goToPrevDisabled={true}>
            <CustomersListScreen
              navigation={navigation}
              getCustomers={customerDataAPI.getCustomers}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'CustomerViewer',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="customer.viewerTitle">
            <CustomerViewerScreen
              navigation={navigation}
              getCustomerById={customerDataAPI.getCustomerById}
            />
          </BaseScreen>
        ),
      });

      function AddCustomerScreenWrapper({ navigation }: ScreenWithNavigationProps) {
        const businessContext = useBusinessContext();
        if (!businessContext) return null;
        return (
          <BaseScreen navigation={navigation} titleKey="customer.addCustomer">
            <AddEntityScreen
              navigation={navigation}
              FormComponent={customerUIAPI.components.AddCustomerForm}
              businessId={businessContext.businessId}
            />
          </BaseScreen>
        );
      }

      screensAPI.contributeScreen(shell, {
        name: 'AddCustomer',
        screen: AddCustomerScreenWrapper,
      });
    },
  },
];
