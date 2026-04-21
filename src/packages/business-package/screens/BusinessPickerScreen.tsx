import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../auth-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { UserBusiness } from '../types/business';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';

interface Props extends ScreenWithNavigationProps {
  getUserBusinesses: (userEmail: string) => Promise<UserBusiness[]>;
}

export function BusinessPickerScreen({ navigation, getUserBusinesses }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<UserBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    getUserBusinesses(user.email)
      .then(results => {
        if (results.length === 1) {
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

  if (loading) {
    return (
      <div style={{ padding: '2rem', fontFamily: typography.fontFamily, color: colors.textSecondary }}>
        {t('businessPicker.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: typography.fontFamily, color: colors.error }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: typography.fontFamily }}>
      <h1 style={{ ...typography.h2, margin: '0 0 1.5rem', fontFamily: typography.fontFamily, color: colors.textPrimary }}>
        {t('businessPicker.title')}
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {businesses.map(({ business, role }) => (
          <li key={business.id}>
            <button
              onClick={() => navigation.navigate('Dashboard')}
              style={{
                width: '100%',
                textAlign: 'start',
                padding: '1rem',
                paddingInline: '1.25rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                background: '#fff',
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              <span style={{ ...typography.body, fontWeight: 600, color: colors.textPrimary }}>
                {business.name}
              </span>
              <span style={{ ...typography.small, color: colors.textSecondary }}>
                {role}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
