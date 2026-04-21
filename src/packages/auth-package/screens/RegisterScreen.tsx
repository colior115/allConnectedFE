import { useState } from 'react';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { AuthFlowsAPI } from '../apis/authFlowsAPI';
import '../styles/auth.scss';

interface Props extends ScreenWithNavigationProps {
  authFlowsAPI: AuthFlowsAPI;
}

export function RegisterScreen({ navigation, authFlowsAPI }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authFlowsAPI.register(email, password);
      setSuccess(true);
      navigation.navigate('Login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {success && (
          <p className="auth-success">
            Registration successful! Check your email to confirm your account.
          </p>
        )}
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
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Registering…' : 'Register'}
        </button>
        <p className="auth-link">
          Already have an account?{' '}
          <button type="button" className="auth-link-btn" onClick={() => navigation.navigate('Login')}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
