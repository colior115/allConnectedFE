export interface BusinessDTO {
  id: string;
  name: string;
  businessId: string;
}

export type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;

export interface UserRoleDTO {
  id: string;
  businessId: string;
  roleName: string;
  permissions: PermissionsDTO;
}

export type AppArea = 'employees' | 'accounts' | 'customers';
export type PermissionLevel = 'EDIT' | 'VIEW' | 'NONE';
export type PermissionsDTO = { [K in AppArea]: PermissionLevel };

export interface UserBusinessRelationDTO {
  id: string;
  userId: string;
  businessId: string;
  roleId: string;
}

export interface UserBusinessRelationEnrichedDTO {
  id: string;
  userId: string;
  business: BusinessDTO;
  role: Omit<UserRoleDTO, 'businessId'>;
}
