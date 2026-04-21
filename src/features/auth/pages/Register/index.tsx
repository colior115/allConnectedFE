import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../../app/providers/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBusinessDetails } from '../../../business/hooks/useBusinessDetails';
import './styles.scss';

export default function Register() {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const { register } = useAuth();
  const { business } = useBusinessDetails(businessId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(email, password);
      setSuccess(true);
      navigate(`/${businessId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      {business && <h2 className="business-name">{business.name}</h2>}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>

        <p className="auth-link">
          Already have an account? <Link to={`/${businessId}/login`}>Login</Link>
        </p>
      </form>
    </div>
  );
}
