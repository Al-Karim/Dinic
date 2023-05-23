import { List } from 'antd';
import { useUnit } from 'effector-react';
import { $edges, deleteEdge } from 'entities/Graph';
import { memo, useMemo } from 'react';
import { EdgesListItem } from '../EdgesListItem/EdgesListItem';
import cls from './EdgesList.module.scss';

interface IEdgesListProps {
  disabled: boolean
}

export const EdgesList = memo(({ disabled }: IEdgesListProps) => {
  const [
    edges,
    onDeleteEdge
  ] = useUnit([
    $edges,
    deleteEdge
  ]);

  const edgesList = useMemo(() => edges.map(({ id, data }) => (
    <EdgesListItem
      key={id}
      onDeleteEdge={onDeleteEdge}
      edgeId={id}
      edgeTitle={data!.title}
      disabled={disabled}
    />
  )), [edges, onDeleteEdge, disabled]);

  if (!edgesList.length) {
    return null;
  }

  return (

    <List
      size='small'
      bordered
      className={cls.list}
    >
      {edgesList}
    </List>

  );
});
