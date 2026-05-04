import type { ReactNode } from 'react';
import type { SlotKey } from 'repluggable';
import type { AddCustomerFormProps } from '../components/AddCustomerForm';

export type { AddCustomerFormProps };
export type AddCustomerFormComponent = (props: AddCustomerFormProps) => ReactNode;

export const CustomerUIAPI: SlotKey<CustomerUIAPI> = {
  name: 'Customer UI API',
  public: true,
  layer: 'UI',
};

export interface CustomerUIAPI {
  components: {
    AddCustomerForm: AddCustomerFormComponent;
  };
}
