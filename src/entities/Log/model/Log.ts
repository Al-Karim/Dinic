import { createEvent, createStore } from 'effector';

export const setMessageToLog = createEvent<string>();
export const resetMessageLog = createEvent();
export const $log = createStore<string[]>([])
  .on(setMessageToLog, (log, message) => [...log, message])
  .on(resetMessageLog, () => []);
