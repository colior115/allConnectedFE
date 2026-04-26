import { apiRequest } from '../../../services/apiClient';
import type { EmployeeDataServiceAPI } from './employeeDataServiceAPI';
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
