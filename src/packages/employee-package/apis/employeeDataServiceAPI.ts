import type { SlotKey } from 'repluggable';
import type { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '../types/employee';
import type { EmployeeRelationDTO } from '../types/employeeRelation';

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
  data: EmployeeRelationDTO[];
  total: number;
  page: number;
  limit: number;
}

export interface EmployeeDataServiceAPI {
  getEmployees(businessId: string, params?: GetEmployeesParams): Promise<PaginatedEmployees>;
  getEmployeeById(employeeId: string): Promise<Employee>;
  getEmployee(businessId: string, userEmail: string): Promise<Employee>;
  createEmployee(businessId: string, userEmail: string, data: CreateEmployeeInput): Promise<Employee>;
  updateEmployee(businessId: string, userEmail: string, data: UpdateEmployeeInput): Promise<Employee>;
  deleteEmployee(businessId: string, userEmail: string): Promise<Employee>;
}
