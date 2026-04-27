export type SalaryType = 'hourly' | 'monthly' | 'annual';

export interface Employee {
  id: string;
  salaryType: SalaryType;
  salaryValue: number;
  currency: string;
}

export type CreateEmployeeInput = Omit<Employee, 'id'>;

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;