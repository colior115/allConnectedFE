import { apiRequest } from '../../../services/apiClient';
import type { UserDTO } from '../types/userDTO';
import { fromUserDTO } from '../mappers/userMapper';
import type { AppUser } from '../types/user';

export async function getUserForBusiness(businessId: string, userId: string): Promise<AppUser> {
  const dto: UserDTO = await apiRequest(`/${businessId}/users/${userId}`);
  return fromUserDTO(dto);
}
