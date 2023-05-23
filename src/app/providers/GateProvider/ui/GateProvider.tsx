import { GraphGate } from 'entities/Graph';
import { TaskQueueGate } from 'entities/TasksQueue';
import { VisualisationGate } from 'entities/Visualisation';
import { ModifyGraphGate } from 'featuries/modifyGraph';
import { ReactNode } from 'react';

interface IGateProviderProps {
  children: ReactNode
}

// Подключаем все гейты из эффектора в одном месте, чтобы все модули были в одной области видимости
// В качестве пропа children выступает все остальное приложение
export const GateProvider = ({ children }: IGateProviderProps) => (
  <>
    <ModifyGraphGate />
    <TaskQueueGate />
    <VisualisationGate />
    <GraphGate />
    {children}
  </>
);
