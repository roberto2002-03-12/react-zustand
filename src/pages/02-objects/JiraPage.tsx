import { JiraTasks } from '../../components';
import { TaskStatus } from '../../interfaces';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
  const pendingTasks = useTaskStore(state => state.getTaskByStatus(TaskStatus.OPEN));
  const inProgressTasks = useTaskStore(state => state.getTaskByStatus(TaskStatus.IN_PROGRESS));
  const doneTasks = useTaskStore(state => state.getTaskByStatus(TaskStatus.DONE));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title='Pendientes' tasks={pendingTasks} value={TaskStatus.OPEN} />
        <JiraTasks title='Avanzando' tasks={inProgressTasks} value={TaskStatus.IN_PROGRESS} />
        <JiraTasks title='Terminadas' tasks={doneTasks} value={TaskStatus.DONE} />
      </div>
    </>
  );
};