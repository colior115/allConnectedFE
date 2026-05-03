import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { BusinessListItem } from '../components/BusinessListItem';
import type { Business, BusinessRelationEnriched, UserRoleEnriched } from '../types/business';

interface Props extends ScreenWithNavigationProps {
  getUserBusinesses: () => Promise<BusinessRelationEnriched[]>;
  onSelectBusiness: (business: Business, role: UserRoleEnriched) => Promise<void>;
}

export function BusinessPickerScreen({ navigation, getUserBusinesses, onSelectBusiness }: Props) {
  const { t } = useTranslation();
  const [businesses, setBusinesses] = useState<BusinessRelationEnriched[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserBusinesses()
      .then(async results => {
        if (results.length === 1) {
          await onSelectBusiness(results[0].business, results[0].role);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = async (business: Business, role: UserRoleEnriched) => {
    try {
      await onSelectBusiness(business, role);
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
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {businesses.map(({ business, role }) => (
          <li key={business.id}>
            <BusinessListItem
              name={business.name}
              role={role.roleName}
              onClick={() => handleSelect(business, role)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
