import { Space } from 'antd';
import { useUnit } from 'effector-react';
import { $isVisualistionStarted } from 'entities/Visualisation';
import { AddDeleteEdgeHeader } from './AddDeleteEdgeHeader/AddDeleteEdgeHeader';
import { EdgesList } from './EdgesList/EdgesList';

export const AddEdge = () => {
  const [
    isVisualistionStarted
  ] = useUnit([
    $isVisualistionStarted
  ]);

  return (
    <Space direction='vertical'>
      <AddDeleteEdgeHeader
        disabled={isVisualistionStarted}
      />
      <EdgesList
        disabled={isVisualistionStarted}
      />
    </Space>
  );
};
