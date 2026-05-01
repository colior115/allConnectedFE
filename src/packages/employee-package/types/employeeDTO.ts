import type { EmploymentStatus, Gender } from "./employee";

export interface EmployeeDTO {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  hireDate: string;
  employmentStatus: EmploymentStatus;
  employeeId: string;
  email?: string;
  phone?: string;
  terminationDate?: string;
};

export type CreateEmployeeInputDTO = Omit<EmployeeDTO, 'id'>;

export type UpdateEmployeeInputDTO = Partial<CreateEmployeeInputDTO>;
