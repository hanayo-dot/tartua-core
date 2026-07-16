import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      await register({ username, email, password, first_name: firstName, last_name: lastName });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: 520, margin: '0 auto' }}>
      <div className="card form-card">
        <h1 className="page-title">Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your username" />
          </div>
          <div className="form-field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />
          </div>
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
              {loading ? 'Creating account…' : 'Register'}
            </button>
            <span style={{ color: '#64748b' }}>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
