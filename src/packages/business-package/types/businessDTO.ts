import type { UserBusinessRelationType, UserRole } from "./business";

export interface BusinessDTO {
  id: string;
  name: string;
  businessId: string;
}

export type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;

export interface UserBusinessRelationDTO {
  business: BusinessDTO;
  role: UserRole;
  type: UserBusinessRelationType;
}
