import { List } from 'antd';
import { useMemo } from 'react';
import { GraphNode } from 'reagraph';
import { NodesListItem } from '../NodesListItem/NodesListItem';
import cls from './NodesList.module.scss';

interface INodesListProps {
  nodes: GraphNode[],
  onDeleteNode: (payload: string) => string
  disabled: boolean
}

// Компонент, отрисывающий список вершин
export const NodesList = ({
  nodes,
  onDeleteNode,
  disabled
}: INodesListProps) => {
  const nodesList = useMemo(() => nodes.map(({ id, label = '' }) => (
    <NodesListItem
      key={id}
      disabled={disabled}
      nodeId={id}
      nodeLabel={label}
      onDeleteNode={onDeleteNode}
    />
  )), [nodes, onDeleteNode, disabled]);

  return (
    <List
      size='small'
      bordered
      className={cls.list}
    >
      {nodesList}
    </List>
  );
};
