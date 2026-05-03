import type { EntryPoint } from 'repluggable';
import EmployeesIcon from '../../../assets/images/icons/employees.svg?react';
import { ScreensInfraAPI } from '../../screens-package';
import { UserDataServiceAPI } from '../../user-package';
import { createEmployeeDataServiceAPI } from '../apis/createEmployeeDataServiceAPI';
import { createEmployeeUIAPI } from '../apis/createEmployeeUIAPI';
import { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import { EmployeeUIAPI } from '../apis/employeeUIAPI';
import { EmployeesListScreen } from '../screens/EmployeesListScreen';
import { EmployeeViewerScreen } from '../screens/EmployeeViewerScreen';

export const EmployeePackage: EntryPoint[] = [
  {
    name: 'EMPLOYEE_DATA_SERVICE',
    layer: 'DATA_SERVICE',

    declareAPIs() {
      return [EmployeeDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(EmployeeDataServiceAPI, () => createEmployeeDataServiceAPI());
    },
  },

  {
    name: 'EMPLOYEE_UI',
    layer: 'UI',

    declareAPIs() {
      return [EmployeeUIAPI];
    },

    getDependencyAPIs() {
      return [EmployeeDataServiceAPI, UserDataServiceAPI, ScreensInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(EmployeeUIAPI, () => createEmployeeUIAPI(shell));
    },

    extend(shell) {
      const screensAPI = shell.getAPI(ScreensInfraAPI);
      const employeeDataAPI = shell.getAPI(EmployeeDataServiceAPI);
      const { BaseScreen } = screensAPI.components;

      screensAPI.contributeSidebarItem(shell, {
        screenName: 'EmployeesList',
        titleKey: 'employee.listTitle',
        Icon: EmployeesIcon,
        order: 2,
      });

      screensAPI.contributeScreen(shell, {
        name: 'EmployeesList',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="employee.listTitle" goToPrevDisabled={true}>
            <EmployeesListScreen
              navigation={navigation}
              getEmployees={employeeDataAPI.getEmployees}
            />
          </BaseScreen>
        ),
      });

      screensAPI.contributeScreen(shell, {
        name: 'EmployeeViewer',
        screen: ({ navigation }) => (
          <BaseScreen navigation={navigation} titleKey="employee.viewerTitle">
            <EmployeeViewerScreen
              navigation={navigation}
              getEmployeeById={employeeDataAPI.getEmployeeById}
            />
          </BaseScreen>
        ),
      });
    },
  },
];
