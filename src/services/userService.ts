import { apiRequest } from './apiClient';
import type { UserDTO } from '../types/dto/userDTO';
import { fromUserDTO } from '../mappers/userMapper';
import type { AppUser } from '../types/models/user';

export async function getUserForBusiness(businessId: string, userId: string): Promise<AppUser> {
  const dto: UserDTO = await apiRequest(`/${businessId}/users/${userId}`);
  return fromUserDTO(dto);
}
