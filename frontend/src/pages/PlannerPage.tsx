import { useMemo, useState } from 'react';
import { Bot, CalendarRange, CheckCircle2, Clock3, Sparkles } from 'lucide-react';

const suggestions = [
  {
    title: 'Creative sprint',
    tasks: ['Outline 3 short-form hooks', 'Draft one knowledge post', 'Review yesterday’s analytics'],
  },
  {
    title: 'Growth focus',
    tasks: ['Publish a TikTok teaser', 'Reply to comments', 'Schedule a tweet thread'],
  },
];

export default function PlannerPage() {
  const [selectedTheme, setSelectedTheme] = useState('Creative sprint');

  const activePlan = useMemo(() => suggestions.find((item) => item.title === selectedTheme) ?? suggestions[0], [selectedTheme]);

  return (
    <div>
      <header style={{ marginBottom: 28 }}>
        <h1 className="page-title">AI Day Planner</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Generate a focused schedule for the day and keep your creator momentum moving.
        </p>
      </header>

      <div className="grid grid-2">
        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Sparkles size={18} />
            <h2 className="section-title" style={{ margin: 0 }}>Today’s AI draft</h2>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            {suggestions.map((item) => (
              <button
                key={item.title}
                className={selectedTheme === item.title ? 'button primary' : 'button secondary'}
                type="button"
                onClick={() => setSelectedTheme(item.title)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {activePlan.tasks.map((task, index) => (
              <div key={task} className="card" style={{ padding: 16, background: 'rgba(248,250,252,0.9)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Clock3 size={16} />
                  <div style={{ fontWeight: 700 }}>{index + 1}. {task}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Bot size={18} />
            <h2 className="section-title" style={{ margin: 0 }}>Schedule summary</h2>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <div className="card" style={{ padding: 14, background: 'rgba(239,246,255,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>08:00–09:00</span>
                <strong>Planning session</strong>
              </div>
            </div>
            <div className="card" style={{ padding: 14, background: 'rgba(236,253,245,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>10:00–12:00</span>
                <strong>Production block</strong>
              </div>
            </div>
            <div className="card" style={{ padding: 14, background: 'rgba(250,245,255,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>15:00–16:00</span>
                <strong>Analytics review</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, color: '#0f766e' }}>
            <CheckCircle2 size={18} />
            <span>Progress can be tracked by date range and scope from the analytics hub.</span>
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <CalendarRange size={18} />
          <h2 className="section-title" style={{ margin: 0 }}>Tracking by time scope</h2>
        </div>
        <p style={{ margin: 0, color: '#64748b' }}>
          Use the analytics page to compare today, this week, or this month across all connected platforms. This gives you a more meaningful view of progress over time instead of point-in-time snapshots.
        </p>
      </section>
    </div>
  );
}
