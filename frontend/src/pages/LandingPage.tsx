import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 32px', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size="small" />
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1a202c' }}>Tartua</span>
          </Link>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/login" className="button secondary" style={{ fontSize: '0.95rem', padding: '10px 20px' }}>
              Sign in
            </Link>
            <Link to="/register" className="button primary" style={{ fontSize: '0.95rem', padding: '10px 20px' }}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
        <div className="hero-content">
          <h1>Creator growth, simplified.</h1>
          <p>
            Tartua empowers creators to manage goals, tasks, and AI-powered insights from one beautiful dashboard. 
            Track your progress across platforms and achieve more.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link to="/register" className="button primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
              Get started free
            </Link>
            <Link to="/login" className="button secondary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
              Sign in
            </Link>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
            ✨ Join 500+ creators already building with Tartua
          </p>
        </div>
        <div className="hero-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Logo size="large" />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '1rem', margin: '0 0 8px 0' }}>POWERFUL FEATURES</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#1a202c' }}>
            Everything you need to grow
          </h2>
        </div>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 40 }}>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <h3>Goal Tracking</h3>
              <p>Set, track, and achieve your creator goals with real-time progress monitoring.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">✅</div>
            <div className="feature-content">
              <h3>Task Management</h3>
              <p>Break down goals into actionable tasks and stay organized with smart categorization.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🤖</div>
            <div className="feature-content">
              <h3>AI Insights</h3>
              <p>Get intelligent recommendations and insights powered by advanced AI analysis.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-content">
              <h3>Platform Sync</h3>
              <p>Connect YouTube, TikTok, and Instagram to track performance in one place.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <div className="feature-content">
              <h3>Analytics</h3>
              <p>Visualize your progress with beautiful charts and actionable metrics.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and protected with industry-standard security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>Trusted by creators worldwide</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-item-value">500+</div>
            <div className="stat-item-label">Active creators</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">50K+</div>
            <div className="stat-item-label">Goals tracked</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">200K+</div>
            <div className="stat-item-label">Tasks completed</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '1rem', margin: '0 0 8px 0' }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#1a202c' }}>
            Simple, streamlined workflow
          </h2>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { num: '1', title: 'Sign up', desc: 'Create your account in seconds' },
            { num: '2', title: 'Set goals', desc: 'Define what you want to achieve' },
            { num: '3', title: 'Track progress', desc: 'Monitor tasks and insights' },
            { num: '4', title: 'Grow', desc: 'Achieve more and celebrate wins' },
          ].map((step) => (
            <div key={step.num} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb', marginBottom: 12 }}>
                {step.num}
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1a202c' }}>{step.title}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 20px 0', color: '#1a202c' }}>
          Ready to level up your creator journey?
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#475569', margin: '0 0 30px 0', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Join hundreds of creators already using Tartua to achieve their goals faster.
        </p>
        <Link to="/register" className="button primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
          Start your free trial
        </Link>
      </section>

      {/* Footer CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)', color: 'white', padding: '40px 32px', textAlign: 'center', marginTop: 60 }}>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.8 }}>
          © 2026 Tartua — Empowering creators worldwide
        </p>
      </section>
    </div>
  );
}
