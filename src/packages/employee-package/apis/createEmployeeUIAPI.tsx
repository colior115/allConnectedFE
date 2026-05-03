import type { Shell } from 'repluggable';
import { UserDataServiceAPI } from '../../user-package';
import { AddEmployeeForm } from '../components/AddEmployeeForm';
import { EmployeeDataServiceAPI } from './employeeDataServiceAPI';
import type { AddEmployeeFormComponent, EmployeeUIAPI } from './employeeUIAPI';

export const createEmployeeUIAPI = (shell: Shell): EmployeeUIAPI => {
  const employeeDataAPI = shell.getAPI(EmployeeDataServiceAPI);
  const userDataAPI = shell.getAPI(UserDataServiceAPI);

  const canAddNewUser = async (id: string): Promise<boolean> => {
    try {
      await userDataAPI.getUser(id);
      return false;
    } catch {
      return true;
    }
  };

  const BoundAddEmployeeForm: AddEmployeeFormComponent = (props) => (
    <AddEmployeeForm
      {...props}
      canAddNewUser={canAddNewUser}
      createEmployee={employeeDataAPI.createEmployee}
    />
  );

  return { components: { AddEmployeeForm: BoundAddEmployeeForm } };
};
