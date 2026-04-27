import { apiRequest } from '../../../services/apiClient';
import type { UserDataServiceAPI } from './userDataServiceAPI';
import type { UpdateUserInput, User } from '../types/user';
import type { UserDTO, UpdateUserInputDTO } from '../types/userDTO';

const fromUserDTO = (dto: UserDTO): User => ({
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  role: dto.role,
});

const toUserDTO = (user: User): UserDTO => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
});

const toUpdateUserInputDTO = (data: UpdateUserInput): UpdateUserInputDTO => ({
  firstName: data.firstName,
  lastName: data.lastName,
  role: data.role,
});

export const createUserDataServiceAPI = (): UserDataServiceAPI => ({
  async getUserByEmail(email) {
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, 
    { method: 'GET' }
  );
    return fromUserDTO(dto);
  },

  async createUser(data: User) {
    const dto: UserDTO = await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(toUserDTO(data)),
    });
    return fromUserDTO(dto);
  },

  async updateUser(email, data) {
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      body: JSON.stringify(toUpdateUserInputDTO(data)),
    });
    return fromUserDTO(dto);
  },

  async deleteUser(email) {
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });
    return fromUserDTO(dto);
  },
});
