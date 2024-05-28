import { StateCreator, create } from 'zustand';
import { ITask, TaskStatus } from '../../interfaces'
import { devtools } from 'zustand/middleware';

interface ITaskState {
  draggingTaskId?: string;
  tasks: Record<string, ITask>; // { [key: string]: ITask }
  getTaskByStatus: (status: TaskStatus) => ITask[];
  setDraggingTaskId: (taskId: string | undefined) => void;
}



const storeApi: StateCreator<ITaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', status: TaskStatus.OPEN, title: 'Task 1' },
    'ABC-2': { id: 'ABC-2', status: TaskStatus.IN_PROGRESS, title: 'Task 2' },
    'ABC-3': { id: 'ABC-3', status: TaskStatus.OPEN, title: 'Task 3' },
    'ABC-4': { id: 'ABC-4', status: TaskStatus.OPEN, title: 'Task 4' },
  },
  // getTaskByStatus: (status: TaskStatus) => {
  //   const arrayTask: ITask[] = [];

  //   Object.entries(get().tasks)
  //     .forEach(([key, value]) => value.status === status && arrayTask.push(value))
    
  //   return arrayTask
  // }
  getTaskByStatus: (status: TaskStatus) => Object.values(get().tasks).filter( task => task.status === status ),
  setDraggingTaskId: (taskId: string | undefined) => {
    set({ draggingTaskId: taskId })
  }
});

export const useTaskStore = create<ITaskState>()(
  devtools(
    storeApi
  )
);