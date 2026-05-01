import { apiRequest } from '../../../services/apiClient';
import type { EmployeeDataServiceAPI, GetEmployeesParams, PaginatedEmployees } from './employeeDataServiceAPI';
import type { Employee } from '../types/employee';
import type { EmployeeDTO, CreateEmployeeInputDTO, UpdateEmployeeInputDTO } from '../types/employeeDTO';

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
    query.set('businessId', businessId);
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.limit !== undefined) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    const result: { data: EmployeeDTO[]; total: number; page: number; limit: number } =
      await apiRequest(`/employee?${query.toString()}`, { method: 'GET' });
    return { ...result, data: result.data.map(fromDTO) };
  },

  async getEmployeeById(id) {
    const dto: EmployeeDTO = await apiRequest(`/employee/${encodeURIComponent(id)}`, { method: 'GET' });
    return fromDTO(dto);
  },

  async createEmployee(data: CreateEmployeeInputDTO) {
    const dto: EmployeeDTO = await apiRequest('/employee', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async updateEmployee(id, data: UpdateEmployeeInputDTO) {
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
