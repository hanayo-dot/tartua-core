import { useEffect, useState } from 'react';
import { TrendingUp, Target } from 'lucide-react';
import GoalCard from '../components/GoalCard';
import { api } from '../api/api';
import { Goal } from '../types';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGoals() {
      try {
        const goalData = await api.getGoals();
        setGoals(goalData);
      } catch (err) {
        console.error('Error loading goals:', err);
        // Set default goals on error
        setGoals([
          {
            id: '1',
            title: 'Reach 100K YouTube Subscribers',
            dueDate: '2026-12-31',
            progress: 65,
            status: 'on track'
          },
          {
            id: '2',
            title: 'Launch TikTok Series',
            dueDate: '2026-08-15',
            progress: 40,
            status: 'at risk'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadGoals();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b' }}>
          <TrendingUp size={20} />
          <span>Loading your goals...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 className="page-title">Goals</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Track your creator outcomes and focus areas.</p>
        </div>
        <button className="button primary">
          + New Goal
        </button>
      </header>

      {goals.length > 0 ? (
        <div className="grid grid-2">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Target size={48} strokeWidth={1.5} color="#94a3b8" />
          </div>
          <h2 style={{ margin: '0 0 12px 0', color: '#1a202c' }}>No goals yet</h2>
          <p style={{ margin: '0 0 24px 0', color: '#64748b' }}>
            Create your first goal to start tracking your creator journey
          </p>
          <button className="button primary">Create your first goal</button>
        </div>
      )}
    </div>
  );
}
