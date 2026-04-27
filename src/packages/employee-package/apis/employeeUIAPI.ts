import type { ReactNode } from 'react';
import type { SlotKey } from 'repluggable';
import type { AddEmployeeFormProps } from '../components/AddEmployeeForm';

export type { AddEmployeeFormProps };
export type AddEmployeeFormComponent = (props: AddEmployeeFormProps) => ReactNode;

export const EmployeeUIAPI: SlotKey<EmployeeUIAPI> = {
  name: 'Employee UI API',
  public: true,
  layer: 'UI',
};

export interface EmployeeUIAPI {
  components: {
    AddEmployeeForm: AddEmployeeFormComponent;
  };
}
