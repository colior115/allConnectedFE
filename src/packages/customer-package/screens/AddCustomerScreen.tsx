import type { ScreenWithNavigationProps } from '../../screens-package';
import type { AddCustomerFormComponent } from '../apis/customerUIAPI';
import { useBusinessContext } from '../../business-package';

interface Props extends ScreenWithNavigationProps {
  AddCustomerForm: AddCustomerFormComponent;
}

export function AddCustomerScreen({ navigation, AddCustomerForm }: Props) {
  const businessContext = useBusinessContext();

  if (!businessContext) return null;

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <AddCustomerForm
        businessId={businessContext.businessId}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </div>
  );
}
