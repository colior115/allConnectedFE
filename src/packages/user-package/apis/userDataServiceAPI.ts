import type { SlotKey } from 'repluggable';
import type { UpdateUserInput, User } from '../types/user';

export const UserDataServiceAPI: SlotKey<UserDataServiceAPI> = {
  name: 'User Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface UserDataServiceAPI {
  getUserByEmail(email: string): Promise<User|undefined>;
  createUser(data: User): Promise<User>;
  updateUser(email: string, data: UpdateUserInput): Promise<User>;
  deleteUser(email: string): Promise<User>;
}
