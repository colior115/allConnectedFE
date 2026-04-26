export type SalaryType = 'hourly' | 'monthly' | 'annual';

export interface Employee {
  id: string;
  salaryType: SalaryType;
  salaryValue: number;
  currency: string;
}
