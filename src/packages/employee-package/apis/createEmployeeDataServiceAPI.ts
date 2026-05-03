import type { Shell } from 'repluggable';
import type { EmployeeDTO, EmployeeListItemDTO, EmployeeListResponseDTO } from '@colior115/all-connected-be-sdk';
import type { Employee, EmployeeListItem } from '../types/employee';
import type { EmployeeDataServiceAPI, GetEmployeesParams, PaginatedEmployees } from './employeeDataServiceAPI';
import { AllConnectedServerSdkAPI } from '../../../common-services';

const fromListItemDTO = (dto: EmployeeListItemDTO): EmployeeListItem => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  employmentStatus: dto.employmentStatus,
});

const fromDTO = (dto: EmployeeDTO): Employee => ({
  id: dto.id,
  businessId: dto.businessId,
  firstName: dto.firstName,
  lastName: dto.lastName,
  gender: dto.gender,
  hireDate: dto.hireDate,
  employmentStatus: dto.employmentStatus,
  employeeId: dto.employeeId,
  email: dto.email,
  phone: dto.phone,
  terminationDate: dto.terminationDate,
});

const fromListResponseDTO = (dto: EmployeeListResponseDTO): PaginatedEmployees => ({
  data: dto.data.map(fromListItemDTO),
  total: dto.total,
  page: dto.page,
  limit: dto.limit,
});

export const createEmployeeDataServiceAPI = (shell: Shell): EmployeeDataServiceAPI => {
  const sdk = shell.getAPI(AllConnectedServerSdkAPI);
  return {
    async getEmployees(businessId: string, params?: GetEmployeesParams): Promise<PaginatedEmployees> {
      return fromListResponseDTO(await sdk.employee.getAll(businessId, params));
    },

    async getEmployeeById(id: string) {
      return fromDTO(await sdk.employee.get(id));
    },

    async createEmployee(data) {
      return fromDTO(await sdk.employee.create(data));
    },

    async updateEmployee(id, data) {
      return fromDTO(await sdk.employee.update(id, data));
    },

    async deleteEmployee(id) {
      return fromDTO(await sdk.employee.delete(id));
    },
  };
};
