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
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, 
    { method: 'GET' }
  );
    return fromDTO(dto);
  },

  async createUser(data: UpdateUserInputDTO) {
    const dto: UserDTO = await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async updateUser(email, data) {
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async deleteUser(email) {
    const dto: UserDTO = await apiRequest(`/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });
    return fromDTO(dto);
  },
});
