import type { SlotKey } from 'repluggable';
import type { CreateUserInput, UpdateUserInput, User } from '../types/user';

export const UserDataServiceAPI: SlotKey<UserDataServiceAPI> = {
  name: 'User Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface UserDataServiceAPI {
  getUser(id: string): Promise<User|undefined>;
  getUserByEmail(email: string): Promise<User|undefined>;
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(id: string, data: UpdateUserInput): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
