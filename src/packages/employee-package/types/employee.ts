export type Gender = "male" | "female" | "other";
export type EmploymentStatus = "active" | "terminated" | "on_leave";

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

export type PaginatedEmployees = {
  data: EmployeeListItem[];
  total: number;
  page: number;
  limit: number;
};