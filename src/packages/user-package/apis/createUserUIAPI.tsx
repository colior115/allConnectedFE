import type { Shell } from 'repluggable';
import { AddUserForm } from '../components/AddUserForm';
import { UserDataServiceAPI } from './userDataServiceAPI';
import type { UserUIAPI, AddUserFormComponent } from './userUIAPI';

export const createUserUIAPI = (shell: Shell): UserUIAPI => {
  const userDataAPI = shell.getAPI(UserDataServiceAPI);

  const canAddNewUser = async (email: string): Promise<boolean> => {
    try {
      await userDataAPI.getUserByEmail(email);
      return false;
    } catch {
      return true;
    }
  };

  const BoundAddUserForm: AddUserFormComponent = (props) => (
    <AddUserForm {...props} createUser={userDataAPI.createUser} />
  );

  return {
    components: { AddUserForm: BoundAddUserForm },
    canAddNewUser,
  };
};
