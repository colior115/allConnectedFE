import type { UserSystemRole } from "@colior115/all-connected-be-sdk";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}

export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<Omit<CreateUserInput, 'email'>>;
