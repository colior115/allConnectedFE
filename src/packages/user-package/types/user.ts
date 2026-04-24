export type UserSystemRole = 'admin' | 'user';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}
