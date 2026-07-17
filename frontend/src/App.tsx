import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Palette } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoalsPage from './pages/GoalsPage';
import GoalDetailPage from './pages/GoalDetailPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import PlatformsPage from './pages/PlatformsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PlannerPage from './pages/PlannerPage';
import Logo from './components/Logo';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import './index.css';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { logout, user } = useAuthContext();
  const [theme, setTheme] = useState<'aurora' | 'gallery' | 'executive' | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tartua-theme') as 'aurora' | 'gallery' | 'executive' | null;
    const nextTheme = savedTheme ?? null;
    setTheme(nextTheme);

    if (nextTheme) {
      document.body.dataset.theme = nextTheme;
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme;
      localStorage.setItem('tartua-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.removeItem('tartua-theme');
    }
  }, [theme]);

  const nextThemeLabel = useMemo(() => {
    if (theme === 'aurora') return 'Switch to Gallery';
    if (theme === 'gallery') return 'Switch to Executive';
    return 'Switch to Aurora';
  }, [theme]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-crest">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size="small" />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f8fafc' }}>Tartua</span>
          </Link>
          <div className="brand-chip">{user?.username ?? 'Creator'}</div>
        </div>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/platforms">Platforms</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/planner">AI Planner</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <button className="button secondary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} onClick={() => setTheme((current) => (current === 'aurora' ? 'gallery' : current === 'gallery' ? 'executive' : current === 'executive' ? 'aurora' : 'gallery'))}>
          <Palette size={16} style={{ marginRight: 8 }} />
          {nextThemeLabel}
        </button>

        <button className="button secondary" style={{ marginTop: 12, width: '100%' }} onClick={logout}>
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
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><CreatorProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
