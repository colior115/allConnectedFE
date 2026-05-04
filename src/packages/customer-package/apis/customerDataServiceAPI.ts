import type { SlotKey } from 'repluggable';
import type { Customer, CreateCustomerInput, UpdateCustomerInput, PaginatedCustomers } from '../types/customer';
export type { PaginatedCustomers };

export const CustomerDataServiceAPI: SlotKey<CustomerDataServiceAPI> = {
  name: 'Customer Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CustomerDataServiceAPI {
  getCustomers(businessId: string, params?: GetCustomersParams): Promise<PaginatedCustomers>;
  getCustomerById(id: string): Promise<Customer>;
  createCustomer(data: CreateCustomerInput): Promise<Customer>;
  updateCustomer(id: string, data: UpdateCustomerInput): Promise<Customer>;
  deleteCustomer(id: string): Promise<Customer>;
}
