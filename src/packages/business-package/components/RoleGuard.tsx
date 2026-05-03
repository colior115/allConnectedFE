import { useEffect, type ReactNode } from 'react';
import type { Navigation } from '../../screens-package';
import type { UserRole } from '../types/business';
import { useBusinessContext } from '../context/BusinessContext';

interface Props {
  role: UserRole;
  navigation: Navigation;
  children: ReactNode;
}

export function RoleGuard({ role, navigation, children }: Props) {
  const ctx = useBusinessContext();

  useEffect(() => {
    if (ctx !== null && ctx.role !== role) {
      navigation.navigate('NoPermission');
    }
  }, [ctx, role, navigation]);

  if (!ctx || ctx.role !== role) return null;

  return <>{children}</>;
}
