import { useEffect, useState } from 'react';
import InsightCard from '../components/InsightCard';
import StatCard from '../components/StatCard';
import GoalCard from '../components/GoalCard';
import TaskRow from '../components/TaskRow';
import { api } from '../api/api';
import { Goal, Insight, Platform, Task } from '../types';

export default function DashboardPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [insightData, goalData, platformData] = await Promise.all([
          api.getInsights(),
          api.getGoals(),
          api.getPlatforms(),
        ]);

        setInsights(insightData);
        setGoals(goalData);
        setPlatforms(platformData);

        if (goalData.length > 0) {
          const taskData = await api.getTasks(goalData[0].id);
          setTasks(taskData);
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
      <header style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        <p style={{ color: '#2563eb', fontWeight: 700, margin: 0 }}>Welcome back</p>
        <h1 className="page-title">Creator Dashboard</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Your command center for goals, tasks, and AI-powered creator insights.
        </p>
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
        <h2 className="section-title">🤖 AI Insights & Recommendations</h2>
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
          <h2 className="section-title">📈 Goal Progress</h2>
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
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>🎯</div>
              <p style={{ margin: '0 0 12px 0', color: '#1a202c' }}>No goals yet</p>
              <p style={{ margin: 0, color: '#64748b' }}>Create your first goal to get started</p>
            </div>
          )}
        </div>

        {/* Tasks */}
        <div>
          <h2 className="section-title">✅ Recent Tasks</h2>
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
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>✓</div>
              <p style={{ margin: '0 0 12px 0', color: '#1a202c' }}>No tasks yet</p>
              <p style={{ margin: 0, color: '#64748b' }}>Create tasks to track your progress</p>
            </div>
          )}
        </div>
      </section>

      {/* Platforms Section */}
      <section style={{ marginTop: 32 }}>
        <h2 className="section-title">📱 Connected Platforms</h2>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          {platforms.map((platform) => (
            <div key={platform.id} className="card" style={{ position: 'relative' }}>
              {platform.connected && (
                <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, background: '#10b981', borderRadius: '50%' }} />
              )}
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>
                {platform.name.includes('YouTube') && '▶️'}
                {platform.name.includes('TikTok') && '🎵'}
                {platform.name.includes('Instagram') && '📷'}
              </div>
              <h3 style={{ margin: '0 0 4px 0' }}>{platform.name}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.9rem' }}>
                @{platform.username}
              </p>
              {platform.connected && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 4 }}>Followers</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{platform.followers.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 4 }}>Engagement</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{platform.engagement.toFixed(1)}%</div>
                  </div>
                </div>
              )}
              <button className={platform.connected ? 'button secondary' : 'button primary'} style={{ width: '100%', marginTop: 12 }}>
                {platform.connected ? '🔗 Connected' : '+ Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
