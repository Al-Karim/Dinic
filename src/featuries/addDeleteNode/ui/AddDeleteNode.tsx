import { Space } from 'antd';
import { useUnit } from 'effector-react';
import { $nodes, deleteNode } from 'entities/Graph';
import { $isVisualistionStarted } from 'entities/Visualisation';
import { AddDeleteNodeHeader } from './AddDeleteNodeHeader/AddDeleteNodeHeader';
import { NodesList } from './NodesList/NodesList';

// Визуальная часть фичи для добавления и удаления вершин графа
export const AddDeleteNode = () => {
  const [
    nodes,
    onDeleteNode,
    isVisualistionStarted
  ] = useUnit([
    $nodes,
    deleteNode,
    $isVisualistionStarted
  ]);

  return (
    <Space direction='vertical'>
      <AddDeleteNodeHeader
        disabled={isVisualistionStarted}
      />
      <NodesList
        nodes={nodes}
        onDeleteNode={onDeleteNode}
        disabled={isVisualistionStarted}
      />
    </Space>
  );
};
