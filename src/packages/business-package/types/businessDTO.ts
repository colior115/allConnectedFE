export interface BusinessDTO {
  id: string;
  name: string;
  businessId: string;
}

export type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;

export type UserRole = 'admin' | 'user';

export interface UserBusinessDTO {
  business: BusinessDTO;
  role: UserRole;
}
