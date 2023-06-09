import { Button, Space } from 'antd';
import { useUnit } from 'effector-react';
import {
  $edges, clearActiveElements, clearSelectionElements, resetEdges
} from 'entities/Graph';
import { resetMessageLog } from 'entities/Log';
import { $isVisualistionFinished, $isVisualistionStarted, setIsVisualisationStarted } from 'entities/Visualisation';
import { useCallback, useMemo } from 'react';
import { $maxFlow, calculateMaxFlow } from '../model/FindMaxFlow';
import { MaxFlowResultBlock } from './MaxFlowResultBlock/MaxFlowResultBlock';

// Отрисовываем блок с результатом
export const FindMaxFlow = () => {
  const [
    onCalculateMaxFlow,
    maxFlow,
    edges,
    onSetIsVisualisationStarted,
    isVisualistionStarted,
    isVisualistionFinished,
    onClearActiveElements,
    onClearSelectionElements,
    onResetEdges,
    onResetMessageLog
  ] = useUnit([
    calculateMaxFlow,
    $maxFlow,
    $edges,
    setIsVisualisationStarted,
    $isVisualistionStarted,
    $isVisualistionFinished,
    clearActiveElements,
    clearSelectionElements,
    resetEdges,
    resetMessageLog
  ]);

  const onStartVisualisationClick = useCallback(() => {
    if (isVisualistionFinished) {
      onClearActiveElements();
      onResetEdges();
      onResetMessageLog();
      onClearSelectionElements();
    }
    onCalculateMaxFlow();
    onSetIsVisualisationStarted();
  }, [
    onCalculateMaxFlow,
    onSetIsVisualisationStarted,
    onClearActiveElements,
    isVisualistionFinished,
    onResetEdges,
    onResetMessageLog,
    onClearSelectionElements
  ]);

  const buttonText = useMemo(() => {
    if (isVisualistionFinished) {
      return 'Повторить';
    }
    return 'Вычислить';
  }, [isVisualistionFinished]);

  return (
    <Space direction='vertical'>
      <Button
        type='primary'
        onClick={onStartVisualisationClick}
        disabled={!edges.length || isVisualistionStarted}
      >
        {buttonText}
      </Button>
      {isVisualistionFinished && <MaxFlowResultBlock maxFlow={maxFlow} />}
    </Space>
  );
};
