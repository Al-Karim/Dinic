import { createEvent, createStore, sample } from 'effector';
import { $edges, $nodes } from 'entities/Graph';
import { clearMessagesQueue } from 'entities/MessagesQueue';
import { clearTasksQueue } from 'entities/TasksQueue';
import { $isVisualistionFinished } from 'entities/Visualisation';
import { findMaxFlowFx } from '../lib/utils/findMaxFlow/findMaxFlow';

export const calculateMaxFlow = createEvent(); // Создаем событие для вычисления максимального потока

export const $maxFlow = createStore<number>(0); // Создаем хранилище для максимального потока

sample({
  clock: calculateMaxFlow, // Событие-триггер для запуска вычисления максимального потока
  source: ({ $nodes, $edges }), // Исходные данные, необходимые для вычисления (хранилища узлов и ребер)
  target: findMaxFlowFx // Запускаем эффект для вычисления максимального потока
});

sample({
  source: findMaxFlowFx.doneData, // Результат выполнения эффекта (максимальный поток)
  target: $maxFlow // Обновляем хранилище с максимальным потоком
});

sample({
  clock: $isVisualistionFinished, // Событие-триггер для завершения визуализации
  target: [clearMessagesQueue, clearTasksQueue] // Очищаем очереди сообщений и задач
});
