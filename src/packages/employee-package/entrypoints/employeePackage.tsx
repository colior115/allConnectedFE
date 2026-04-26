import type { EntryPoint } from 'repluggable';
import { UserDataServiceAPI } from '../../user-package';
import { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import { createEmployeeDataServiceAPI } from '../apis/createEmployeeDataServiceAPI';
import { EmployeeUIAPI } from '../apis/employeeUIAPI';
import { createEmployeeUIAPI } from '../apis/createEmployeeUIAPI';

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
      return [EmployeeDataServiceAPI, UserDataServiceAPI];
    },

    attach(shell) {
      shell.contributeAPI(EmployeeUIAPI, () => createEmployeeUIAPI(shell));
    },
  },
];
