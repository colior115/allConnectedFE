import { apiRequest } from '../../../services/apiClient';
import type { UserDataServiceAPI } from './userDataServiceAPI';
import type { User } from '../types/user';
import type { UserDTO, UpdateUserInputDTO } from '../types/userDTO';

const fromDTO = (dto: UserDTO): User => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  role: dto.role,
});

export const createUserDataServiceAPI = (): UserDataServiceAPI => ({
  async getUserByEmail(email) {
    const dto: UserDTO = await apiRequest(`/users/email/${encodeURIComponent(email)}`);
    return fromDTO(dto);
  },

  async getUserById(id) {
    const dto: UserDTO = await apiRequest(`/users/${id}`);
    return fromDTO(dto);
  },

  async createUser(data: UpdateUserInputDTO) {
    const dto: UserDTO = await apiRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async updateUser(id, data) {
    const dto: UserDTO = await apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async deleteUser(id) {
    const dto: UserDTO = await apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
    return fromDTO(dto);
  },
});
