import type { ReactNode } from 'react';
import type { Navigation } from '../packages/screens-package';

export interface AddFormProps {
  businessId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export type AddFormComponent = (props: AddFormProps) => ReactNode;

interface AddEntityScreenProps {
  navigation: Navigation;
  FormComponent: AddFormComponent;
  businessId: string;
}

export function AddEntityScreen({ navigation, FormComponent, businessId }: AddEntityScreenProps) {
  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <FormComponent
        businessId={businessId}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </div>
  );
}
