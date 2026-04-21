import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../../app/providers/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBusinessDetails } from '../../../business/hooks/useBusinessDetails';
import '../Register/styles.scss';

export default function Login() {
    const navigate = useNavigate();
    const { businessId } = useParams();
    const { login } = useAuth();
    const { business } = useBusinessDetails(businessId);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password, businessId ?? '');
            navigate(`/${businessId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            {business && <h2 className="business-name">{business.name}</h2>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login</h1>

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
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in…' : 'Login'}
                </button>

                <p className="auth-link">
                    Don't have an account? <Link to={`/${businessId}/register`}>Register</Link>
                </p>
            </form>
        </div>
    );
}
