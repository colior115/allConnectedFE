import type { UserSystemRole } from './user';

export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}

export type UpdateUserInputDTO = Partial<Omit<UserDTO, 'id'>>;
