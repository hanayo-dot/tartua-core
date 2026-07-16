import { Insight } from '../types';

export default function InsightCard({ insight }: { insight: Insight }) {
  const iconMap: Record<string, string> = {
    productivity: '⚡',
    platform: '📱',
    goal: '🎯',
  };

  const backgroundMap: Record<string, string> = {
    productivity: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    platform: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    goal: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  };

  return (
    <div className="card" style={{ background: backgroundMap[insight.type] || backgroundMap.goal }}>
      <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{iconMap[insight.type] || '💡'}</div>
      <div className={`badge ${insight.type}`} style={{ marginBottom: 12 }}>{insight.type}</div>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#1a202c' }}>{insight.title}</h3>
      <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>{insight.description}</p>
    </div>
  );
}
