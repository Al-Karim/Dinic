// Импортируем необходимые функции и типы из других модулей
import { createEffect, sample } from 'effector';
import { createGate } from 'effector-react';
import { $isTaskQueueFilled, $tasksQueue } from 'entities/TasksQueue';
import { $visualisationSpeed } from 'entities/Visualisation';
import { showTasksFx } from '../lib/helpers/showTasksFx/showTasksFx';
import { StartTasksFxT } from './types';

// Создаем gate для ModifyGraph
export const ModifyGraphGate = createGate();

// Создаем эффект, который запускает задачи по очереди с помощью showTasksFx
const startTasksFx = createEffect<StartTasksFxT, void, Error>(({ $tasksQueue, $visualisationSpeed }) => {
  const taskQueueLength = $tasksQueue.length;
  $tasksQueue.forEach((task, index) => showTasksFx({
    task,
    index,
    taskQueueLength,
    $visualisationSpeed
  }));
});

// Создаем событие, которое вызывает startTasksFx, когда очередь задач заполнена
sample({
  clock: $isTaskQueueFilled,
  source: { $tasksQueue, $isTaskQueueFilled, $visualisationSpeed },
  filter: ({ $tasksQueue, $isTaskQueueFilled }) => !!$tasksQueue.length && $isTaskQueueFilled,
  fn: ({ $tasksQueue, $visualisationSpeed }) => ({ $tasksQueue, $visualisationSpeed }),
  target: startTasksFx
});
