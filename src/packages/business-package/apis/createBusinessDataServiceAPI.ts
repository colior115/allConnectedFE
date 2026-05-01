import { apiRequest } from '../../../services/apiClient';
import type { Business, BusinessPublic, BusinessRelationEnriched as BusinessRelationEnriched } from '../types/business';
import type { BusinessDTO, BusinessPublicDetailsDTO, UserBusinessRelationEnrichedDTO as BusinessRelationEnrichedDTO } from '../types/businessDTO';
import type { BusinessDataServiceAPI } from './businessDataServiceAPI';

const fromDTO = (dto: BusinessDTO): Business => ({
  id: dto.id,
  name: dto.name,
  businessId: dto.businessId,
});

const fromPublicDTO = (dto: BusinessPublicDetailsDTO): BusinessPublic => ({
  id: dto.id,
  name: dto.name,
});

const fromEnrichedRelationDTO = (dto: BusinessRelationEnrichedDTO): BusinessRelationEnriched => ({
  id: dto.id,
  userId: dto.userId,
  business: fromDTO(dto.business),
  role: {
    id: dto.role.id,
    roleName: dto.role.roleName,
    permissions: dto.role.permissions,
  },
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

  async getUserBusinesses() {
    const dtos: BusinessRelationEnrichedDTO[] = await apiRequest('/businessRelation/user/businesses');
    return dtos.map(fromEnrichedRelationDTO);
  },

  async connectToBusiness(businessId) {
    const { token } = await apiRequest('/businessRelation/connect', {
      method: 'POST',
      body: JSON.stringify({ businessId }),
    });
    return token as string;
  },

  async getById(id) {
    const dto: BusinessDTO = await apiRequest(`/business/${id}`);
    return fromDTO(dto);
  },

  async create(name, businessId) {
    const dto: BusinessDTO = await apiRequest('/business', {
      method: 'POST',
      body: JSON.stringify({ name, businessId }),
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
    const dto: BusinessDTO = await apiRequest(`/business/${id}`, { method: 'DELETE' });
    return fromDTO(dto);
  },
});
