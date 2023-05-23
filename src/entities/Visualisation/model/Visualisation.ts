import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';

// Создание gate для визуализации
export const VisualisationGate = createGate();

// Событие для установки скорости визуализации
export const setVisualisationSpeed = createEvent<number>();
// Хранилище для скорости визуализации
export const $visualisationSpeed = createStore<number>(1)
  .on(setVisualisationSpeed, (_, visualisationSpeed) => visualisationSpeed); // Обновление скорости визуализации

// Событие для установки флага начала визуализации
export const setIsVisualisationStarted = createEvent();
// Хранилище для флага начала визуализации
export const $isVisualistionStarted = createStore<boolean>(false)
  .on(setIsVisualisationStarted, isVisualistionStart => !isVisualistionStart); // Инвертирование флага начала визуализации

// Событие для установки флага завершения визуализации
export const setIsVisualisationFinished = createEvent();
// Хранилище для флага завершения визуализации
export const $isVisualistionFinished = createStore<boolean>(false)
  .on(setIsVisualisationFinished, () => true); // Установка флага в true
