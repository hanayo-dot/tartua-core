import { ReactNode } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoalsPage from './pages/GoalsPage';
import GoalDetailPage from './pages/GoalDetailPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import PlatformsPage from './pages/PlatformsPage';
import Logo from './components/Logo';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import './index.css';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { logout, user } = useAuthContext();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <Logo size="small" />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a202c' }}>Tartua</span>
        </Link>
        <div style={{ marginBottom: 24, color: '#94a3b8' }}>{user?.username ?? 'Creator'}</div>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/platforms">Platforms</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <button className="button secondary" style={{ marginTop: 24, width: '100%' }} onClick={logout}>
          Sign out
        </button>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
        <Route path="/goals/:goalId" element={<ProtectedRoute><GoalDetailPage /></ProtectedRoute>} />
        <Route path="/platforms" element={<ProtectedRoute><PlatformsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><CreatorProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
