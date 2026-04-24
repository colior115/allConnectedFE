import type { SlotKey } from 'repluggable';
import type { User } from '../types/user';
import type { UpdateUserInputDTO } from '../types/userDTO';

export const UserDataServiceAPI: SlotKey<UserDataServiceAPI> = {
  name: 'User Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface UserDataServiceAPI {
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  createUser(data: UpdateUserInputDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserInputDTO): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
