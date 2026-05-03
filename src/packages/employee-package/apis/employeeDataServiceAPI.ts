import type { SlotKey } from 'repluggable';
import type { CreateEmployeeInput, Employee, PaginatedEmployees, UpdateEmployeeInput } from '../types/employee';
export type { PaginatedEmployees };

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


export interface EmployeeDataServiceAPI {
  getEmployees(businessId: string, params?: GetEmployeesParams): Promise<PaginatedEmployees>;
  getEmployeeById(id: string): Promise<Employee>;
  createEmployee(data: CreateEmployeeInput): Promise<Employee>;
  updateEmployee(id: string, data: UpdateEmployeeInput): Promise<Employee>;
  deleteEmployee(id: string): Promise<Employee>;
}
