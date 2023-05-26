import { MessageInstance } from 'antd/es/message/interface';
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample
} from 'effector';
import { setMessageToLog } from 'entities/Log';
import { $isMessageQueueFilled, $messagesQueue } from 'entities/MessagesQueue';
import { $visualisationSpeed } from 'entities/Visualisation';
import { ShowMessagesFxT } from './types';

// Содаем стор для хранения инстанса API messages из AntD
const $messagesApi = createStore<MessageInstance | null>(null);

// Ивент который будет реагировать каждый раз когда это Api будет меняться
export const messagesApiChanged = createEvent<MessageInstance>();

// Сохраняем апи в вышесозданный стор
sample({
  clock: messagesApiChanged,
  target: $messagesApi
});

// Cоздаем новый эффект для показа одного сообщения на каждое изменение стора с Апи
const showMessageFx = attach({
  source: $messagesApi,
  effect(api, message: string) {
    if (!api) {
      throw new Error('Notification API is not ready');
    }
    api.info(message);
    setMessageToLog(message);
  }
});

// Создаем эффект для показа всех сообщений
const showMessagesFx = createEffect<ShowMessagesFxT, void>(({ $visualisationSpeed, $messagesQueue }) => {
  $messagesQueue.forEach((message, index) => {
    setTimeout(
      showMessageFx,
      ((index + 1) * 1000) / $visualisationSpeed,
      message
    );
  });
});

// Создаем производный стор для логики показа сообщений
const $combinedForShowMessages = combine({
  $isMessageQueueFilled,
  $visualisationSpeed,
  $messagesQueue
});

// Как только очередь сообщений заполнилась, пердаем в showMessagesFx соответствующие аргументы
sample({
  clock: $isMessageQueueFilled,
  source: $combinedForShowMessages,
  filter: ({ $isMessageQueueFilled }) => $isMessageQueueFilled,
  fn: ({ $visualisationSpeed, $messagesQueue }) => ({ $visualisationSpeed, $messagesQueue }),
  target: showMessagesFx
});
