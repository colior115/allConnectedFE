import type { Shell } from 'repluggable';
import { AddCustomerForm } from '../components/AddCustomerForm';
import { CustomerDataServiceAPI } from './customerDataServiceAPI';
import type { AddCustomerFormComponent, CustomerUIAPI } from './customerUIAPI';

export const createCustomerUIAPI = (shell: Shell): CustomerUIAPI => {
  const customerDataAPI = shell.getAPI(CustomerDataServiceAPI);

  const BoundAddCustomerForm: AddCustomerFormComponent = (props) => (
    <AddCustomerForm
      {...props}
      createCustomer={customerDataAPI.createCustomer}
    />
  );

  return { components: { AddCustomerForm: BoundAddCustomerForm } };
};
