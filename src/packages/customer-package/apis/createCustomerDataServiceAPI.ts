import type { Shell } from 'repluggable';
import type { CustomerDTO, CustomerListResponseDTO } from '@colior115/all-connected-be-sdk';
import { AllConnectedServerSdkAPI } from '../../../common-services';
import type { Customer, CustomerListItem } from '../types/customer';
import type { CustomerDataServiceAPI, GetCustomersParams, PaginatedCustomers } from './customerDataServiceAPI';

const fromListItemDTO = (dto: CustomerDTO): CustomerListItem => ({
  id: dto.id,
  name: dto.name,
  individual: dto.individual,
  email: dto.email,
  phone: dto.phone,
});

const fromDTO = (dto: CustomerDTO): Customer => ({
  id: dto.id,
  businessId: dto.businessId,
  name: dto.name,
  individual: dto.individual,
  address: dto.address,
  phone: dto.phone,
  email: dto.email,
});

const fromListResponseDTO = (dto: CustomerListResponseDTO): PaginatedCustomers => ({
  data: dto.data.map(fromListItemDTO),
  total: dto.total,
  page: dto.page,
  limit: dto.limit,
});

export const createCustomerDataServiceAPI = (shell: Shell): CustomerDataServiceAPI => {
  const sdk = shell.getAPI(AllConnectedServerSdkAPI);
  return {
    async getCustomers(businessId: string, params?: GetCustomersParams): Promise<PaginatedCustomers> {
      return fromListResponseDTO(await sdk.customer.getAll(businessId, params));
    },

    async getCustomerById(id: string) {
      return fromDTO(await sdk.customer.get(id));
    },

    async createCustomer(data) {
      return fromDTO(await sdk.customer.create(data));
    },

    async updateCustomer(id, data) {
      return fromDTO(await sdk.customer.update(id, data));
    },

    async deleteCustomer(id) {
      return fromDTO(await sdk.customer.delete(id));
    },
  };
};
