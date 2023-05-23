import { createEvent, createStore } from 'effector';

// Событие для очистки очереди сообщений
export const clearMessagesQueue = createEvent();
// Событие для добавления сообщения в очередь
export const setMessageToQueue = createEvent<string>();
// Хранилище для очереди сообщений
export const $messagesQueue = createStore<string[]>([])
  .on(setMessageToQueue, (messages, message) => [...messages, message]) // Добавление сообщения в очередь
  .on(clearMessagesQueue, () => []); // Очистка очереди сообщений

// Событие для установки флага заполненности очереди сообщений
export const setIsMessageQueueFilled = createEvent();
// Хранилище для флага заполненности очереди сообщений
export const $isMessageQueueFilled = createStore<boolean>(false)
  .on(setIsMessageQueueFilled, () => true) // Установка флага в true
  .on(clearMessagesQueue, () => false); // Установка флага в false при очистке очереди сообщений
