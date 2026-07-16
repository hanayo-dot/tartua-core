import { useEffect, useState } from 'react';
import { Smartphone, Play, Lightbulb } from 'lucide-react';
import { api } from '../api/api';
import { Platform } from '../types';

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlatforms() {
      try {
        const platformData = await api.getPlatforms();
        setPlatforms(platformData);
      } catch (err) {
        console.error('Error loading platforms:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPlatforms();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b' }}>
          <Smartphone size={20} />
          <span>Loading your platforms...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ marginBottom: 28 }}>
        <h1 className="page-title">Platforms</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          See which creator platforms are connected and monitor your performance.
        </p>
      </header>

      <div className="grid grid-2">
        {platforms.map((platform) => (
          <div key={platform.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Connection indicator */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: platform.connected
                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                  : '#e2e8f0',
              }}
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ color: '#64748b', display: 'flex' }}>
                  {platform.name.includes('YouTube') && <Play size={28} strokeWidth={1.5} />}
                  {platform.name.includes('TikTok') && <Smartphone size={28} strokeWidth={1.5} />}
                  {platform.name.includes('Instagram') && <Smartphone size={28} strokeWidth={1.5} />}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{platform.name}</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    @{platform.username}
                  </p>
                </div>
              </div>
              <div
                style={{
                  background: platform.connected ? '#dcfce7' : '#f3f4f6',
                  color: platform.connected ? '#166534' : '#6b7280',
                  padding: '6px 12px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {platform.connected ? '🟢 Connected' : '⚫ Disconnected'}
              </div>
            </div>

            {/* Stats */}
            {platform.connected && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Followers</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb' }}>
                    {platform.followers >= 1000 ? `${(platform.followers / 1000).toFixed(1)}K` : platform.followers}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Views</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed' }}>
                    {platform.views >= 1000 ? `${(platform.views / 1000).toFixed(1)}K` : platform.views}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Engagement</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#db2777' }}>
                    {platform.engagement.toFixed(1)}%
                  </div>
                </div>
              </div>
            )}

            {/* Action */}
            <button
              className={platform.connected ? 'button secondary' : 'button primary'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {platform.connected ? '🔗 Manage' : '+ Connect account'}
            </button>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div className="card" style={{ marginTop: 32, background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', borderColor: '#0369a1' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#0369a1', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lightbulb size={18} />
          Platform Tips
        </h3>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: 1.6 }}>
          Connecting your platforms allows Tartua to track your performance metrics and provide AI-powered insights. 
          We use OAuth for secure authentication and never store your passwords.
        </p>
      </div>
    </div>
  );
}
