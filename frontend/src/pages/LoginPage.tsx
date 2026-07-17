import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 32px', background: 'white' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size="small" />
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1a202c' }}>Tartua</span>
          </Link>
        </div>
      </header>
      <div className="main-content" style={{ maxWidth: 520, margin: '0 auto' }}>
        <div className="card form-card">
          <h1 className="page-title">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
          </div>
          {error && <div style={{ color: '#dc2626', marginBottom: 12 }}>{error}</div>}
          <div className="form-footer">
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>
            <span style={{ color: '#64748b' }}>
              Don’t have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
