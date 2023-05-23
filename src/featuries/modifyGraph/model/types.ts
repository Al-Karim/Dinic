import { TaskT } from 'entities/TasksQueue';

export type StartTasksFxT = {
  $tasksQueue: TaskT[],
  $visualisationSpeed: number
}
