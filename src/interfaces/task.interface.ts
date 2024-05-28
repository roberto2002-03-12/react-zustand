export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN='open',
  IN_PROGRESS='in-progress',
  DONE='done'
}
