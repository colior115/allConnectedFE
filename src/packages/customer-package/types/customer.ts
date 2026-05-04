export interface CustomerListItem {
  id: string;
  name: string;
  individual: boolean;
  email?: string;
  phone?: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  individual: boolean;
  address?: string;
  phone?: string;
  email?: string;
}

export type CreateCustomerInput = Omit<Customer, 'id'>;
export type UpdateCustomerInput = Partial<Omit<Customer, 'id' | 'businessId'>>;

export type PaginatedCustomers = {
  data: CustomerListItem[];
  total: number;
  page: number;
  limit: number;
};
