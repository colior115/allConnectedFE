import type { ScreenWithNavigationProps } from '../../screens-package';
import type { AddEmployeeFormComponent } from '../apis/employeeUIAPI';

interface Props extends ScreenWithNavigationProps {
  AddEmployeeForm: AddEmployeeFormComponent;
  businessId: string;
}

export function AddEmployeeScreen({ navigation, AddEmployeeForm, businessId }: Props) {
  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <AddEmployeeForm
        businessId={businessId}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </div>
  );
}
