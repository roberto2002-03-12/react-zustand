import { StateCreator, create } from 'zustand';
import { v4 } from 'uuid';
// import { produce } from 'immer';

import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ITask, TaskStatus } from '../../interfaces'

interface ITaskState {
  draggingTaskId?: string;
  tasks: Record<string, ITask>; // { [key: string]: ITask }
  getTaskByStatus: (status: TaskStatus) => ITask[];
  setDraggingTaskId: (taskId: string | undefined) => void;
  changeStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
}



const storeApi: StateCreator<ITaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({
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
  },
  changeStatus: (taskId: string, status: TaskStatus) => {
    const newTask = get().tasks[taskId];
    newTask.status = status;
    
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: newTask
      }
    }))
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeStatus(taskId, status);
    get().setDraggingTaskId(undefined);
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: v4(), title, status }

    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask
    //   }
    // }))

    // Requiere npm i immer
    // opción 1 con paquete immer
    // set(produce((state: ITaskState) => {
    //   state.tasks[newTask.id] = newTask
    // }))

    // opción 2 con middleware immer nativo de zustand
    set(state => {
      state.tasks[newTask.id] = newTask;
    })
  }
});

export const useTaskStore = create<ITaskState>()(
  devtools(
    immer(storeApi)
  )
);