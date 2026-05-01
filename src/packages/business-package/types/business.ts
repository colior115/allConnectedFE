export interface Business {
  id: string;
  name: string;
  businessId: string;
}

export interface BusinessPublic {
  id: string;
  name: string;
}

export type AppArea = 'employees' | 'accounts' | 'customers';
export type PermissionLevel = 'EDIT' | 'VIEW' | 'NONE';
export type Permissions = { [K in AppArea]: PermissionLevel };

export interface UserRole {
  id: string;
  businessId: string;
  roleName: string;
  permissions: Permissions;
}

export interface BusinessRelation {
  id: string;
  userId: string;
  business: Business;
  role: UserRole;
}

export type UserRoleEnriched = Omit<UserRole, 'businessId'>;

export interface BusinessRelationEnriched {
  id: string;
  userId: string;
  business: Business;
  role: UserRoleEnriched;
}