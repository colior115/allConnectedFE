import { apiRequest } from '../../../services/apiClient';
import type { CreateEmployeeInput, Employee, EmployeeListItem, UpdateEmployeeInput } from '../types/employee';
import type { EmployeeDTO, EmployeeListItemDTO } from '../types/employeeDTO';
import type { EmployeeDataServiceAPI, GetEmployeesParams, PaginatedEmployees } from './employeeDataServiceAPI';

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

export const createEmployeeDataServiceAPI = (): EmployeeDataServiceAPI => ({
  async getEmployees(businessId, params?: GetEmployeesParams): Promise<PaginatedEmployees> {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.limit !== undefined) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    const qs = query.toString();
    const result: { data: EmployeeListItemDTO[]; total: number; page: number; limit: number } =
      await apiRequest(`/employee/${encodeURIComponent(businessId)}/all${qs ? `?${qs}` : ''}`, { method: 'GET' });
    return { ...result, data: result.data.map(fromListItemDTO) };
  },

  async getEmployeeById(id) {
    const dto: EmployeeDTO = await apiRequest(`/employee/${encodeURIComponent(id)}`, { method: 'GET' });
    return fromDTO(dto);
  },

  async createEmployee(data: CreateEmployeeInput) {
    const dto: EmployeeDTO = await apiRequest('/employee', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async updateEmployee(id, data: UpdateEmployeeInput) {
    const dto: EmployeeDTO = await apiRequest(`/employee/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async deleteEmployee(id) {
    const dto: EmployeeDTO = await apiRequest(`/employee/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return fromDTO(dto);
  },
});
