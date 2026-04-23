export interface Business {
  id: string;
  name: string;
  businessId: string;
}

export interface BusinessPublic {
  id: string;
  name: string;
}

export type UserRole = 'admin' | 'user';

export type UserBusinessRelationType = 'employee' | 'client';

export interface UserBusinessRelation {
  business: Business;
  role: UserRole;
  type: UserBusinessRelationType;
}
