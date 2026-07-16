import { useEffect, useMemo, useState } from 'react';
import { BarChart3, DollarSign, TrendingUp } from 'lucide-react';
import { api } from '../api/api';
import { Platform } from '../types';

const barStyle = {
  width: '100%',
  height: 160,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  alignItems: 'end',
  gap: 12,
};

export default function AnalyticsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [scope, setScope] = useState<'today' | 'week' | 'month'>('week');

  useEffect(() => {
    async function loadData() {
      try {
        const platformData = await api.getPlatforms();
        setPlatforms(platformData);
      } catch (err) {
        console.error('Analytics load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const analytics = useMemo(() => {
    const connected = platforms.filter((platform) => platform.connected);
    const multiplier = scope === 'today' ? 0.4 : scope === 'week' ? 1 : 2.4;

    const totalFollowers = connected.reduce((sum, platform) => sum + Math.round(platform.followers * (scope === 'today' ? 0.08 : scope === 'week' ? 0.22 : 0.5)), 0);
    const totalViews = connected.reduce((sum, platform) => sum + Math.round(platform.views * multiplier), 0);
    const averageEngagement = connected.length
      ? connected.reduce((sum, platform) => sum + platform.engagement, 0) / connected.length
      : 0;

    const earningsByPlatform = connected.map((platform) => ({
      ...platform,
      estimatedEarnings: Math.round(platform.views * (platform.engagement / 100) * 0.14 * multiplier),
    }));

    return {
      connected,
      totalFollowers,
      totalViews,
      averageEngagement,
      earningsByPlatform,
      totalEarnings: earningsByPlatform.reduce((sum, platform) => sum + platform.estimatedEarnings, 0),
    };
  }, [platforms, scope]);

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ fontSize: '1.5rem', color: '#64748b' }}>📊 Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ marginBottom: 28 }}>
        <h1 className="page-title">Analytics</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Cross-platform performance, audience traction, and earnings overview.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {(['today', 'week', 'month'] as const).map((item) => (
          <button
            key={item}
            className={scope === item ? 'button primary' : 'button secondary'}
            type="button"
            onClick={() => setScope(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      <section className="grid grid-3" style={{ marginBottom: 28 }}>
        <div className="card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><TrendingUp size={16} /> Audience</div>
          <div className="stat-value">{analytics.totalFollowers.toLocaleString()}</div>
          <div style={{ color: '#64748b' }}>Combined followers</div>
        </div>
        <div className="card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><BarChart3 size={16} /> Views</div>
          <div className="stat-value">{analytics.totalViews.toLocaleString()}</div>
          <div style={{ color: '#64748b' }}>Total views</div>
        </div>
        <div className="card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><DollarSign size={16} /> Earnings</div>
          <div className="stat-value">${analytics.totalEarnings.toLocaleString()}</div>
          <div style={{ color: '#64748b' }}>Estimated earnings</div>
        </div>
      </section>

      <section className="card" style={{ marginBottom: 28 }}>
        <h2 className="section-title">Audience trend</h2>
        <div style={barStyle}>
          {analytics.connected.map((platform) => (
            <div key={platform.id} style={{ display: 'grid', gap: 10, justifyItems: 'center' }}>
              <div
                style={{
                  width: '88%',
                  height: `${Math.max(40, platform.followers / 30)}px`,
                  borderRadius: 16,
                  background: 'linear-gradient(180deg, #3b82f6, #7c3aed)',
                }}
              />
              <div style={{ fontWeight: 700 }}>{platform.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{platform.followers.toLocaleString()} followers</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h2 className="section-title">Platform earnings</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {analytics.earningsByPlatform.map((platform) => (
              <div key={platform.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{platform.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{platform.engagement.toFixed(1)}% engagement</div>
                </div>
                <div style={{ fontWeight: 800, color: '#2563eb' }}>
                  ${platform.estimatedEarnings.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Summary</h2>
          <p style={{ margin: '0 0 10px', color: '#475569' }}>
            Connected platforms: <strong>{analytics.connected.length}</strong>
          </p>
          <p style={{ margin: '0 0 10px', color: '#475569' }}>
            Average engagement: <strong>{analytics.averageEngagement.toFixed(1)}%</strong>
          </p>
          <p style={{ margin: 0, color: '#475569' }}>
            Total projected earnings: <strong>${analytics.totalEarnings.toLocaleString()}</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
