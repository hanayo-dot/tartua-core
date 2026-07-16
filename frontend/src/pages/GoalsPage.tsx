import { FormEvent, useEffect, useState } from 'react';
import { CirclePlus, Goal as GoalIcon } from 'lucide-react';
import GoalCard from '../components/GoalCard';
import { api } from '../api/api';
import { Goal } from '../types';

const defaultGoalForm = {
  title: '',
  description: '',
  priority: 'medium',
  target_date: '',
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultGoalForm);
  const [error, setError] = useState<string | null>(null);

  async function loadGoals() {
    try {
      const goalData = await api.getGoals();
      const normalizedGoals = goalData.map((goal) => ({
        ...goal,
        dueDate: goal.targetDate ?? goal.dueDate ?? '',
        progress: typeof goal.progress === 'number' ? goal.progress : goal.status === 'complete' ? 100 : 52,
      }));
      setGoals(normalizedGoals);
    } catch (err) {
      console.error('Error loading goals:', err);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGoals();
  }, []);

  async function handleCreateGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError(null);

    try {
      await api.createGoal({
        title: form.title,
        description: form.description,
        priority: form.priority,
        target_date: form.target_date || undefined,
      });

      setForm(defaultGoalForm);
      setShowForm(false);
      await loadGoals();
    } catch (err) {
      console.error('Goal creation failed:', err);
      setError(err instanceof Error ? err.message : 'Unable to create goal right now.');
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ fontSize: '1.5rem', color: '#64748b' }}>📈 Loading your goals...</div>
      </div>
    );
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title">Goals</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Track your creator outcomes and focus areas.</p>
        </div>
        <button className="button primary" onClick={() => setShowForm((current) => !current)}>
          <CirclePlus size={16} style={{ marginRight: 8 }} /> New Goal
        </button>
      </header>

      {showForm && (
        <form className="card" onSubmit={handleCreateGoal} style={{ marginBottom: 24 }}>
          <div className="form-field">
            <label htmlFor="goal-title">Goal title</label>
            <input id="goal-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
          </div>
          <div className="form-field">
            <label htmlFor="goal-description">Description</label>
            <textarea id="goal-description" rows={4} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </div>
          <div className="form-field">
            <label htmlFor="goal-priority">Priority</label>
            <select id="goal-priority" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="goal-target">Target date</label>
            <input id="goal-target" type="date" value={form.target_date} onChange={(event) => setForm((current) => ({ ...current, target_date: event.target.value }))} />
          </div>
          {error && <p style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</p>}
          <div className="form-footer">
            <button className="button primary" type="submit" disabled={creating}>
              {creating ? 'Saving…' : 'Save goal'}
            </button>
            <button className="button secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {goals.length > 0 ? (
        <div className="grid grid-2">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎯</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
            <GoalIcon size={28} />
            <h2 style={{ margin: 0, color: '#1a202c' }}>No goals yet</h2>
          </div>
          <p style={{ margin: '0 0 24px 0', color: '#64748b' }}>
            Create your first goal to start tracking your creator journey
          </p>
          <button className="button primary" onClick={() => setShowForm(true)}>Create your first goal</button>
        </div>
      )}
    </div>
  );
}
