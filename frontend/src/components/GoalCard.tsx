import { Goal } from '../types';

export default function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <h3 style={{ margin: 0 }}>{goal.title}</h3>
          <p style={{ margin: '8px 0 0', color: '#64748b' }}>Due {goal.dueDate}</p>
        </div>
        <div className="badge goal">{goal.status}</div>
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ height: 10, background: '#e2e8f0', borderRadius: 9999 }}>
          <div
            style={{
              width: `${goal.progress}%`,
              height: '100%',
              borderRadius: 9999,
              background: '#22c55e',
            }}
          />
        </div>
        <p style={{ margin: '10px 0 0', color: '#475569' }}>{goal.progress}% complete</p>
      </div>
    </div>
  );
}
