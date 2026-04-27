export type UserSystemRole = 'admin' | 'user';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}

export type UpdateUserInput = Partial<Omit<User, 'email'>>;
