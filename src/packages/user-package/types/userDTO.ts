import type { UserSystemRole } from './user';

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}

export type UpdateUserInputDTO = Partial<Omit<UserDTO, 'email'>>;
