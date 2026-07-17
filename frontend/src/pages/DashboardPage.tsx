import { useEffect, useState } from 'react';
import {
  Camera,
  Globe2,
  Goal,
  LayoutGrid,
  ListTodo,
  Music2,
  Play,
  Sparkles,
  Target,
  Tv,
} from 'lucide-react';
import InsightCard from '../components/InsightCard';
import StatCard from '../components/StatCard';
import GoalCard from '../components/GoalCard';
import TaskRow from '../components/TaskRow';
import { api } from '../api/api';
import { Goal as GoalType, Insight, Platform, Task } from '../types';

export default function DashboardPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  const getPlatformIcon = (name: string) => {
    if (name.includes('YouTube')) return Play;
    if (name.includes('TikTok')) return Music2;
    if (name.includes('Instagram')) return Camera;
    if (name.includes('Twitch')) return Tv;
    return Globe2;
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [insightData, goalData, platformData] = await Promise.all([
          api.getInsights(),
          api.getGoals(),
          api.getPlatforms(),
        ]);

        // Guard against null/undefined API responses by falling back to empty arrays
        const safeInsights = insightData || [];
        const safeGoals = goalData || [];
        const safePlatforms = platformData || [];

        setInsights(safeInsights);
        setGoals(safeGoals);
        setPlatforms(safePlatforms);

        if (safeGoals.length > 0) {
          const taskData = await api.getTasks(safeGoals[0].id);
          setTasks(taskData || []);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
        // Set default data on error
        setInsights([
          {
            title: 'Stay consistent',
            description: 'Completing at least one task every day increases your chances of achieving your goals.',
            type: 'productivity',
          },
          {
            title: 'TikTok is your strongest platform',
            description: 'Your TikTok engagement is 9.2%, higher than YouTube at 6.8%.',
            type: 'platform',
          },
          {
            title: 'Upcoming deadline',
            description: 'Your Q3 growth goal deadline is 15 days away. Keep momentum going!',
            type: 'goal',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <div style={{ fontSize: '1.5rem', color: '#64748b' }}>📊 Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <header className="dashboard-spotlight" style={{ marginBottom: 28 }}>
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1 className="page-title">Creator Dashboard</h1>
          <p className="page-subtitle">
            Your command center for goals, tasks, and AI-powered creator insights.
          </p>
        </div>
        <div className="spotlight-meta">
          <span>Creative streak</span>
          <strong>8 days</strong>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-3" style={{ marginBottom: 32 }}>
        <StatCard 
          title="Active Goals" 
          value={String(goals.length)} 
          description={`${goals.length} goal${goals.length !== 1 ? 's' : ''} in progress`}
        />
        <StatCard 
          title="Tasks Due" 
          value={String(tasks.length)} 
          description={`${tasks.filter((t) => t.status !== 'done').length} pending`}
        />
        <StatCard 
          title="Connected Platforms" 
          value={String(platforms.filter((p) => p.connected).length)} 
          description={`of ${platforms.length} platforms`}
        />
      </section>

      {/* Insights Section */}
      <section style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Sparkles size={18} /> AI Insights & Recommendations</h2>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          {insights.map((insight) => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      {/* Goals and Tasks Section */}
      <section className="grid grid-2" style={{ gap: 24 }}>
        {/* Goals */}
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Target size={18} /> Goal Progress</h2>
          {goals.length > 0 ? (
            <div className="list-card" style={{ marginTop: 12 }}>
              {goals.slice(0, 3).map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
              {goals.length > 3 && (
                <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
                  +{goals.length - 3} more goal{goals.length - 3 !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ marginBottom: 12 }}><Target size={32} /></div>
              <p style={{ margin: '0 0 12px 0', color: '#1a202c' }}>No goals yet</p>
              <p style={{ margin: 0, color: '#64748b' }}>Create your first goal to get started</p>
            </div>
          )}
        </div>

        {/* Tasks */}
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ListTodo size={18} /> Recent Tasks</h2>
          {tasks.length > 0 ? (
            <div className="list-card" style={{ marginTop: 12 }}>
              {tasks.slice(0, 3).map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
              {tasks.length > 3 && (
                <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
                  +{tasks.length - 3} more task{tasks.length - 3 !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ marginBottom: 12 }}><ListTodo size={32} /></div>
              <p style={{ margin: '0 0 12px 0', color: '#1a202c' }}>No tasks yet</p>
              <p style={{ margin: 0, color: '#64748b' }}>Create tasks to track your progress</p>
            </div>
          )}
        </div>
      </section>

      {/* Platforms Section */}
      <section style={{ marginTop: 32 }}>
        <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={18} /> Connected Platforms</h2>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          {platforms.map((platform) => {
            const PlatformIcon = getPlatformIcon(platform.name);

            return (
              <div key={platform.id} className="card" style={{ position: 'relative' }}>
                {platform.connected && (
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, background: '#10b981', borderRadius: '50%' }} />
                )}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    marginBottom: 12,
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)',
                    color: '#1d4ed8',
                  }}
                >
                  <PlatformIcon size={26} strokeWidth={2.1} />
                </div>
                <h3 style={{ margin: '0 0 4px 0', color: 'var(--text)' }}>{platform.name}</h3>
                <p style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  @{platform.username}
                </p>
                {platform.connected && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Followers</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
                        {platform.followers?.toLocaleString() ?? '0'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Engagement</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
                        {platform.engagement?.toFixed(1) ?? '0.0'}%
                      </div>
                    </div>
                  </div>
                )}
                <button className={platform.connected ? 'button secondary' : 'button primary'} style={{ width: '100%', marginTop: 12 }}>
                  {platform.connected ? '🔗 Connected' : '+ Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}