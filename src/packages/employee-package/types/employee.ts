export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type EmploymentStatus = "active" | "inactive" | "terminated" | "on_leave";

export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  employmentStatus: EmploymentStatus;
}

export interface Employee {
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
}

export type CreateEmployeeInput = Omit<Employee, 'id'>;

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;
