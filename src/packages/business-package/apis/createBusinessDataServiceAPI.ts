import { apiRequest } from '../../../services/apiClient';
import type { BusinessDataServiceAPI } from './businessDataServiceAPI';
import type { Business, BusinessPublic } from '../types/business';
import type { BusinessDTO, BusinessPublicDetailsDTO } from '../types/businessDTO';

const fromDTO = (dto: BusinessDTO): Business => ({
  id: dto.id,
  name: dto.name,
  businessId: dto.businessId,
});

const fromPublicDTO = (dto: BusinessPublicDetailsDTO): BusinessPublic => ({
  id: dto.id,
  name: dto.name,
});

export const createBusinessDataServiceAPI = (): BusinessDataServiceAPI => ({
  async getPublicDetails(id) {
    const dto: BusinessPublicDetailsDTO = await apiRequest(`/business/${id}/public`);
    return fromPublicDTO(dto);
  },

  async getAll() {
    const dtos: BusinessDTO[] = await apiRequest('/business/all');
    return dtos.map(fromDTO);
  },

  async getById(id) {
    const dto: BusinessDTO = await apiRequest(`/business/${id}`);
    return fromDTO(dto);
  },

  async create(name) {
    const dto: BusinessDTO = await apiRequest('/business', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    return fromDTO(dto);
  },

  async update(id, name) {
    const dto: BusinessDTO = await apiRequest(`/business/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
    return fromDTO(dto);
  },

  async delete(id) {
    const dto: BusinessDTO = await apiRequest(`/business/${id}`, {
      method: 'DELETE',
    });
    return fromDTO(dto);
  },
});
