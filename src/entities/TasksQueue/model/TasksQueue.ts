import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { TaskT } from './types';

// Создание gate для очереди задач
export const TaskQueueGate = createGate();

// Событие для очистки очереди задач
export const clearTasksQueue = createEvent();
// Событие для добавления задачи в очередь
export const addTasksToQueue = createEvent<TaskT>();
// Хранилище для очереди задач
export const $tasksQueue = createStore<TaskT[]>([])
  .on(addTasksToQueue, (tasksQueue, addTasksToQueue) => [...tasksQueue, addTasksToQueue]) // Добавление задачи в очередь
  .on(clearTasksQueue, () => []); // Очистка очереди задач

// Событие для установки флага заполненности очереди задач
export const setIsTaskQueueFilled = createEvent();
// Хранилище для флага заполненности очереди задач
export const $isTaskQueueFilled = createStore<boolean>(false)
  .on(setIsTaskQueueFilled, () => true) // Установка флага в true
  .on(clearTasksQueue, () => false); // Установка флага в false при очистке очереди задач
