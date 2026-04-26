import type { ScreenWithNavigationProps } from '../../screens-package';
import type { AddEmployeeFormComponent } from '../../employee-package';
import { useBusinessContext } from '../context/BusinessContext';

interface Props extends ScreenWithNavigationProps {
  AddEmployeeForm: AddEmployeeFormComponent;
}

export function AddEmployeeScreen({ navigation, AddEmployeeForm }: Props) {
  const businessContext = useBusinessContext();

  if (!businessContext) return null;

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <AddEmployeeForm
        businessId={businessContext.businessId}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </div>
  );
}
