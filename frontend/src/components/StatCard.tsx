interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="card stat-card">
      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </div>
      <div className="stat-value">{value}</div>
      <div style={{ color: '#64748b', fontSize: '0.95rem' }}>{description}</div>
    </div>
  );
}
