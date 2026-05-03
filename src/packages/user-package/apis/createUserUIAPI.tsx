import type { Shell } from 'repluggable';
import { AddUserForm } from '../components/AddUserForm';
import { UserDataServiceAPI } from './userDataServiceAPI';
import type { UserUIAPI, AddUserFormComponent } from './userUIAPI';

export const createUserUIAPI = (shell: Shell): UserUIAPI => {
  const userDataServiceAPI = shell.getAPI(UserDataServiceAPI);

  const canAddNewUser = async (email: string): Promise<boolean> => {
    try {
      await userDataServiceAPI.getUserByEmail(email);
      return false;
    } catch {
      return true;
    }
  };

  const BoundAddUserForm: AddUserFormComponent = (props) => (
    <AddUserForm {...props} createUser={userDataServiceAPI.createUser} />
  );

  return {
    components: { AddUserForm: BoundAddUserForm },
    canAddNewUser,
  };
};
