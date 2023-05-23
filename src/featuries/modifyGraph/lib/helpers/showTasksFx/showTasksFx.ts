// Импортируем необходимые функции и типы из других модулей
import { createEffect } from 'effector';
import { TaskT } from 'entities/TasksQueue';
import { setIsVisualisationFinished, setIsVisualisationStarted } from 'entities/Visualisation';

// Определяем тип для showTasksFx
type ShowTasksFxT = {
  task: TaskT,
  index: number
  taskQueueLength: number
  $visualisationSpeed: number
}

// Создаем эффект, который выполняет текущую задачу визуализации
export const showTasksFx = createEffect<ShowTasksFxT, void, Error>(({
  task, index, taskQueueLength, $visualisationSpeed
}) => {
  const { event, payload } = task;
  setTimeout(
    () => {
      event(payload);
      if (index === taskQueueLength - 1) {
        setIsVisualisationStarted();
        setIsVisualisationFinished();
      }
    },
    ((index + 1) * 700) / $visualisationSpeed
  );
});
