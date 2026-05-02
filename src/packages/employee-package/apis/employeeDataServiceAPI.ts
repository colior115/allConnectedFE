import type { SlotKey } from 'repluggable';
import type { CreateEmployeeInput, Employee, EmployeeListItem, UpdateEmployeeInput } from '../types/employee';

export const EmployeeDataServiceAPI: SlotKey<EmployeeDataServiceAPI> = {
  name: 'Employee Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedEmployees {
  data: EmployeeListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface EmployeeDataServiceAPI {
  getEmployees(businessId: string, params?: GetEmployeesParams): Promise<PaginatedEmployees>;
  getEmployeeById(id: string): Promise<Employee>;
  createEmployee(data: CreateEmployeeInput): Promise<Employee>;
  updateEmployee(id: string, data: UpdateEmployeeInput): Promise<Employee>;
  deleteEmployee(id: string): Promise<Employee>;
}
