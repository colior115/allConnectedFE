import type { Shell } from 'repluggable';
import type { BusinessDTO, BusinessPublicDetailsDTO, BusinessRelationEnrichedDTO } from '@colior115/all-connected-be-sdk';
import type { Business, BusinessPublic, BusinessRelationEnriched } from '../types/business';
import type { BusinessDataServiceAPI } from './businessDataServiceAPI';
import { AllConnectedServerSdkAPI } from '../../../common-services';

const fromDTO = (dto: BusinessDTO): Business => ({
  id: dto.id,
  name: dto.name,
  businessId: dto.businessId,
});

const fromPublicDTO = (dto: BusinessPublicDetailsDTO): BusinessPublic => ({
  id: dto.id,
  name: dto.name,
});

const fromEnrichedDTO = (dto: BusinessRelationEnrichedDTO): BusinessRelationEnriched => ({
  id: dto.id,
  userId: dto.userId,
  business: fromDTO(dto.business),
  role: {
    id: dto.role.id,
    roleName: dto.role.roleName,
    permissions: dto.role.permissions,
  },
});

export const createBusinessDataServiceAPI = (shell: Shell): BusinessDataServiceAPI => {
  const sdk = shell.getAPI(AllConnectedServerSdkAPI);
  return {
    async getPublicDetails(id) {
      return fromPublicDTO(await sdk.business.getPublicDetails(id));
    },

    async getAll() {
      return (await sdk.business.getAll()).map(fromDTO);
    },

    async getById(id) {
      return fromDTO(await sdk.business.get(id));
    },

    async getUserBusinesses() {
      return (await sdk.businessRelation.getUserBusinesses()).map(fromEnrichedDTO);
    },

    async connectToBusiness(businessId) {
      const { token } = await sdk.businessRelation.connect(businessId);
      return token;
    },

    async create(name, businessId) {
      return fromDTO(await sdk.business.create({ name, businessId }));
    },

    async update(id, name) {
      return fromDTO(await sdk.business.update(id, { name }));
    },

    async delete(id) {
      return fromDTO(await sdk.business.delete(id));
    },
  };
};
