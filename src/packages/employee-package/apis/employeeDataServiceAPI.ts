import type { SlotKey } from 'repluggable';
import type { Employee } from '../types/employee';
import type { CreateEmployeeInputDTO, UpdateEmployeeInputDTO } from '../types/employeeDTO';

export const EmployeeDataServiceAPI: SlotKey<EmployeeDataServiceAPI> = {
  name: 'Employee Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface EmployeeDataServiceAPI {
  getEmployee(businessId: string, userEmail: string): Promise<Employee>;
  createEmployee(businessId: string, userEmail: string, data: CreateEmployeeInputDTO): Promise<Employee>;
  updateEmployee(businessId: string, userEmail: string, data: UpdateEmployeeInputDTO): Promise<Employee>;
  deleteEmployee(businessId: string, userEmail: string): Promise<Employee>;
}
