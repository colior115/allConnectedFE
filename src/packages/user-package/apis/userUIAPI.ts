import type { ReactNode } from 'react';
import type { SlotKey } from 'repluggable';
import type { AddUserFormProps } from '../components/AddUserForm';

export type { AddUserFormProps };
export type AddUserFormComponent = (props: AddUserFormProps) => ReactNode;

export const UserUIAPI: SlotKey<UserUIAPI> = {
  name: 'User UI API',
  public: true,
  layer: 'UI',
};

export interface UserUIAPI {
  components: {
    AddUserForm: AddUserFormComponent;
  };
  canAddNewUser(email: string): Promise<boolean>;
}
