import { useTranslation } from 'react-i18next';
import { Title } from '../../../components';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { AddEmployeeFormComponent } from '../../employee-package';
import { useBusinessContext } from '../context/BusinessContext';

interface Props extends ScreenWithNavigationProps {
  AddEmployeeForm: AddEmployeeFormComponent;
}

export function AddEmployeeScreen({ navigation, AddEmployeeForm }: Props) {
  const { t } = useTranslation();
  const businessContext = useBusinessContext();

  if (!businessContext) return null;

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <Title size="large">{t('dashboard.addEmployee')}</Title>
      <AddEmployeeForm
        businessId={businessContext.businessId}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </div>
  );
}
