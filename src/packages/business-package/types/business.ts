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

export interface UserBusiness {
  business: Business;
  role: UserRole;
}
