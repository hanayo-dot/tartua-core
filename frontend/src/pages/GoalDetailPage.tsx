import TaskRow from '../components/TaskRow';
import { Task } from '../types';

const tasks: Task[] = [
  { id: 'a', title: 'Write outline for week 1', dueDate: 'Today', status: 'in progress', goalId: '1' },
  { id: 'b', title: 'Review script draft', dueDate: 'Tomorrow', status: 'todo', goalId: '1' },
  { id: 'c', title: 'Record first clip', dueDate: 'Aug 1', status: 'todo', goalId: '1' },
];

export default function GoalDetailPage() {
  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title">Launch new course</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Work through the tasks tied to your launch milestone.
        </p>
      </header>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, color: '#64748b' }}>Goal progress</p>
            <h2 style={{ margin: '10px 0' }}>68%</h2>
          </div>
          <button className="button secondary">Edit goal</button>
        </div>
      </div>

      <section>
        <div className="section-title">Tasks</div>
        <div className="list-card" style={{ marginTop: 12 }}>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}
