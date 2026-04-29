import { apiRequest } from '../../../services/apiClient';
import type { EmployeeDataServiceAPI, GetEmployeesParams, PaginatedEmployees } from './employeeDataServiceAPI';
import type { Employee } from '../types/employee';
import type { EmployeeDTO, CreateEmployeeInputDTO, UpdateEmployeeInputDTO } from '../types/employeeDTO';

const fromDTO = (dto: EmployeeDTO): Employee => ({
  id: dto.id,
  salaryType: dto.salaryType,
  salaryValue: dto.salaryValue,
  currency: dto.currency,
});

const base = (businessId: string) =>
  `/businessManager/employee/${encodeURIComponent(businessId)}`;

export const createEmployeeDataServiceAPI = (): EmployeeDataServiceAPI => ({
  async getEmployees(businessId, params?: GetEmployeesParams): Promise<PaginatedEmployees> {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.limit !== undefined) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    const qs = query.size > 0 ? `?${query.toString()}` : '';
    return apiRequest(
      `/businessManager/employees/${encodeURIComponent(businessId)}${qs}`,
      { method: 'GET' },
    );
  },

  async getEmployeeById(employeeId) {
    const dto: EmployeeDTO = await apiRequest(
      `/employees/${encodeURIComponent(employeeId)}`,
      { method: 'GET' },
    );
    return fromDTO(dto);
  },
  async getEmployee(businessId, userEmail) {
    const dto: EmployeeDTO = await apiRequest(
      `${base(businessId)}/${encodeURIComponent(userEmail)}`,
      { method: 'GET' },
    );
    return fromDTO(dto);
  },

  async createEmployee(businessId, userEmail, data: CreateEmployeeInputDTO) {
    const dto: EmployeeDTO = await apiRequest(`${base(businessId)}/${encodeURIComponent(userEmail)}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return fromDTO(dto);
  },

  async updateEmployee(businessId, userEmail, data: UpdateEmployeeInputDTO) {
    const dto: EmployeeDTO = await apiRequest(
      `${base(businessId)}/${encodeURIComponent(userEmail)}`,
      { method: 'PUT', body: JSON.stringify(data) },
    );
    return fromDTO(dto);
  },

  async deleteEmployee(businessId, userEmail) {
    const dto: EmployeeDTO = await apiRequest(
      `${base(businessId)}/${encodeURIComponent(userEmail)}`,
      { method: 'DELETE' },
    );
    return fromDTO(dto);
  },
});
