import { useEffect, useState } from 'react';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { useAuth } from '../context/AuthContext';
import type { AuthFlowsAPI } from '../apis/authFlowsAPI';
import '../styles/auth.scss';

interface Props extends ScreenWithNavigationProps {
  authFlowsAPI: AuthFlowsAPI;
}

export function LoginScreen({ navigation, authFlowsAPI }: Props) {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigation.navigate('Home');
    }
  }, [loading, user, navigation]);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authFlowsAPI.login(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Login'}
        </button>
        <p className="auth-link">
          Don't have an account?{' '}
          <button type="button" className="auth-link-btn" onClick={() => navigation.navigate('Register')}>
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
