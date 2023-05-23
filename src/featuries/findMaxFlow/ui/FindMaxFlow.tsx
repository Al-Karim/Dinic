import { Button, Space } from 'antd';
import { useUnit } from 'effector-react';
import { $edges, clearSelectionElements, resetEdges } from 'entities/Graph';
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
    onClearSelectionElements,
    onResetEdges
  ] = useUnit([
    calculateMaxFlow,
    $maxFlow,
    $edges,
    setIsVisualisationStarted,
    $isVisualistionStarted,
    $isVisualistionFinished,
    clearSelectionElements,
    resetEdges
  ]);

  const onStartVisualisationClick = useCallback(() => {
    if (isVisualistionFinished) {
      onClearSelectionElements();
      onResetEdges();
    }
    onCalculateMaxFlow();
    onSetIsVisualisationStarted();
  }, [
    onCalculateMaxFlow,
    onSetIsVisualisationStarted,
    onClearSelectionElements,
    isVisualistionFinished,
    onResetEdges
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
