import { Task } from '../types';

export default function TaskRow({ task }: { task: Task }) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 700 }}>{task.title}</div>
        <div style={{ color: '#64748b', marginTop: 6 }}>
          {task.dueDate} · {task.status}
        </div>
      </div>
      <button className="button secondary">Update</button>
    </div>
  );
}
