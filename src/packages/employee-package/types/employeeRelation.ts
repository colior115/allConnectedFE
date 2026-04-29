import type { UserRole, UserBusinessRelationType } from '../../business-package';

export interface EmployeeRelationUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface EmployeeRelationDTO {
  businessId: string;
  role: UserRole;
  type: UserBusinessRelationType;
  reference: string;
  user: EmployeeRelationUserDTO;
}
