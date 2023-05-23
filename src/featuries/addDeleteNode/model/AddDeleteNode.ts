import { createEvent, createStore, sample } from 'effector';
import { $nodes, setNodes } from 'entities/Graph';
import { addNewNode } from '../lib/helpers/addNewNode/addNewNode';

// Создаем событие для изменения метки вершины
export const setNodeLabel = createEvent<string>();

// Создаем хранилище для метки вершины
export const $nodeLabel = createStore<string>('')
  .on(setNodeLabel, (_, label) => label);

// Создаем событие для добавления новой вершины в граф
export const addNode = createEvent();

// Создаем связь между событиями и хранилищами с помощью функции sample
sample({
  clock: addNode, // Триггер для запуска операции
  source: { $nodes, $nodeLabel }, // Исходные данные
  fn: addNewNode, // Функция, которая будет выполнена
  target: setNodes // Результирующий event
});
