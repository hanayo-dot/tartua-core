import { ArrowUpRight, Smartphone, Target, Zap } from 'lucide-react';
import { Insight } from '../types';

export default function InsightCard({ insight }: { insight: Insight }) {
  const iconMap = {
    productivity: { icon: Zap, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', label: 'Productivity' },
    platform: { icon: Smartphone, background: 'linear-gradient(135deg, #f5d0fe 0%, #ddd6fe 100%)', label: 'Platform' },
    goal: { icon: Target, background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', label: 'Goal' },
  } as const;

  const match = iconMap[insight.type as keyof typeof iconMap] ?? {
    icon: ArrowUpRight,
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    label: 'Insight',
  };

  const Icon = match.icon;

  return (
    <div className="card" style={{ background: match.background }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 16,
          marginBottom: 12,
          background: 'rgba(15, 23, 42, 0.12)',
          color: '#0f172a',
        }}
      >
        <Icon size={20} strokeWidth={2.1} />
      </div>
      <div className={`badge ${insight.type}`} style={{ marginBottom: 12 }}>{match.label}</div>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--text)' }}>{insight.title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{insight.description}</p>
    </div>
  );
}
