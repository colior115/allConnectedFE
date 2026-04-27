import type { SalaryType } from './employee';

export interface EmployeeDTO {
  id: string;
  salaryType: SalaryType;
  salaryValue: number;
  currency: string;
}

export type CreateEmployeeInputDTO = Omit<EmployeeDTO, 'id'>;

export type UpdateEmployeeInputDTO = Partial<CreateEmployeeInputDTO>;
