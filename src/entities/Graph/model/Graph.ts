import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { GraphEdge, GraphNode } from 'reagraph';
import { changeEdgeHelper } from '../lib/helpers/changeEdgeHelper/changeEdgeHelper';
import { deleteItemHelper } from '../lib/helpers/deleteItemHelper/deleteItemHelper';
import { resetEdgesHelper } from '../lib/helpers/resetEdgesHelper/resetEdgesHelper';
import { initNodes } from './constants';

// Создание гейта для работы с графом
export const GraphGate = createGate();

// Событие для установки узлов графа
export const setNodes = createEvent<GraphNode[]>();
// Событие для удаления узла графа
export const deleteNode = createEvent<string>();
// Хранилище для узлов графа
export const $nodes = createStore<GraphNode[]>(initNodes)
  .on(setNodes, (_, nodes) => nodes) // Установка новых узлов
  .on(deleteNode, (nodes, deletingNodeId) => deleteItemHelper(nodes, deletingNodeId)); // Удаление узла

// Событие для изменения ребра графа
export const changeEdge = createEvent<GraphEdge>({ sid: 'changeEdge' });
// Событие для сброса ребер графа
export const resetEdges = createEvent();
// Событие для установки ребер графа
export const setEdges = createEvent<GraphEdge[]>();
// Событие для удаления ребра графа
export const deleteEdge = createEvent<string>();

// Хранилище для ребер графа
export const $edges = createStore<GraphEdge[]>([])
  .on(setEdges, (_, edges) => edges) // Установка новых ребер
  .on(deleteEdge, (edges, deletingEdgeId) => deleteItemHelper(edges, deletingEdgeId)) // Удаление ребра
  .on(changeEdge, (edges, changingEdge) => changeEdgeHelper(edges, changingEdge)) // Изменение ребра
  .on(resetEdges, edges => resetEdgesHelper(edges)); // Сброс ребер

// Событие для добавления активных элементов
export const addActiveElement = createEvent<string>({
  sid: 'addActiveElement'
});
// Событие для удаления активных элементов
export const removeActiveElement = createEvent<string>();
// Событие для очистки активных элементов
export const clearActiveElements = createEvent();

// Хранилище для активных элементов
export const $activiesElements = createStore<string[]>([])
  .on(addActiveElement, (activiesElements, addActiveElement) => [...activiesElements, addActiveElement]) // Добавление элемента выбора
  .on(removeActiveElement, (activiesElements, removeActiveElement) => (
    activiesElements.filter(activeElement => activeElement !== removeActiveElement)
  )) // Удаление элемента выбора
  .on(clearActiveElements, () => []); // Очистка элементов выбора

// Событие для добавления элемента выбора
export const addSelectionElement = createEvent<string>({ sid: 'addSelectionElement' });
// Событие для удаления элемента выбора
export const removeSelectionElement = createEvent<string>();
// Событие для очистки элементов выбора
export const clearSelectionElements = createEvent();

// Хранилище для элементов выбора
export const $selectionsElements = createStore<string[]>([])
  .on(addSelectionElement, (selectionsElements, addSelectionElement) => [...selectionsElements, addSelectionElement]) // Добавление элемента выбора
  .on(removeSelectionElement, (selectionsElements, removeSelectionElement) => (
    selectionsElements.filter(selectionElement => selectionElement !== removeSelectionElement)
  )) // Удаление элемента выбора
  .on(clearSelectionElements, () => []); // Очистка элементов выбора
