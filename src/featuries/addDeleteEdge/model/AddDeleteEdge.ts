// Импортируем необходимые функции из библиотеки effector
import {
  combine, createEvent, createStore, sample
} from 'effector';

// Импортируем необходимые хранилища из другого модуля
import { $edges, setEdges } from 'entities/Graph';

// Импортируем необходимую функцию из другого модуля
import { addEdge } from '../lib/helpers/addEdge/addEdge';

// Создаем событие для установки максимального потока
export const setMaxFlow = createEvent<number>();

// Создаем хранилище для максимального потока
export const $maxFlow = createStore<number>(0)
  .on(setMaxFlow, (_, maxFlow) => maxFlow);

// Создаем событие для установки начальной вершины
export const setFrom = createEvent<string>();

// Создаем хранилище для начальной вершины
export const $from = createStore<string>('')
  .on(setFrom, (_, from) => from);

// Создаем событие для установки конечной вершины
export const setTo = createEvent<string>();

// Создаем хранилище для конечной вершины
export const $to = createStore<string>('')
  .on(setTo, (_, to) => to);

// Создаем хранилище, которое комбинирует значения других хранилищ
const $newEdgeData = combine({
  from: $from,
  to: $to,
  maxFlow: $maxFlow,
  edges: $edges
});

// Создаем событие для добавления нового ребра
export const addEdgeTrigger = createEvent();

// Создаем событие, которое вызывает функцию addEdge с текущим значением $newEdgeData
// Результат передается в setEdges
sample({
  clock: addEdgeTrigger,
  source: $newEdgeData,
  fn: addEdge,
  target: setEdges
});

// Создаем события для управления состоянием переменной, которая отвечает за наличие ребра в графе
export const resetIsEdgeAlreadyExist = createEvent();
export const setIsEdgeAlreadyExist = createEvent();

// Создаем хранилище для переменной, которая отвечает за наличие ребра в графе
export const $isEdgeAlreadyExist = createStore<boolean>(false)
  .on(setIsEdgeAlreadyExist, () => true)
  .on(resetIsEdgeAlreadyExist, () => false);

sample({
  clock: [setFrom, setTo],
  source: $isEdgeAlreadyExist,
  filter: $isEdgeAlreadyExist => $isEdgeAlreadyExist,
  target: resetIsEdgeAlreadyExist
});
