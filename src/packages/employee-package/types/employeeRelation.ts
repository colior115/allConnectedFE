import type { UserRole, UserBusinessRelationType } from '../../business-package';

export interface EmployeeRelationUser {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface EmployeeRelation {
  businessId: string;
  role: UserRole;
  type: UserBusinessRelationType;
  reference: string;
  user: EmployeeRelationUser;
}
