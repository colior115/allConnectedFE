import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../auth-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { Loader, Text, Title } from '../../../components';
import { BusinessListItem } from '../components/BusinessListItem';
import { colors } from '../../../styles/theme/colors';
import type { Business, UserBusinessRelation, UserBusinessRelationType, UserRole } from '../types/business';

interface Props extends ScreenWithNavigationProps {
  getUserBusinesses: (userEmail: string) => Promise<UserBusinessRelation[]>;
  onSelectBusiness: (business: Business, role: UserRole, type: UserBusinessRelationType) => Promise<void>;
}

export function BusinessPickerScreen({ navigation, getUserBusinesses, onSelectBusiness }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<UserBusinessRelation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    getUserBusinesses(user.email)
      .then(async results => {
        if (results.length === 1) {
          await onSelectBusiness(results[0].business, results[0].role, results[0].type);
          navigation.navigate('Dashboard');
        } else {
          setBusinesses(results);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(t('businessPicker.error'));
        setLoading(false);
      });
  }, [user?.email]);

  const handleSelect = async (business: Business, role: UserRole, type: UserBusinessRelationType) => {
    try {
      await onSelectBusiness(business, role, type);
      navigation.navigate('Dashboard');
    } catch {
      setError(t('businessPicker.error'));
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
        <Text color={colors.error}>{error}</Text>
      </div>
    );
  }

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Title size="large">{t('businessPicker.title')}</Title>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {businesses.map(({ business, role, type }) => (
          <li key={business.id}>
            <BusinessListItem
              name={business.name}
              role={role}
              onClick={() => handleSelect(business, role, type)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
