import { Button, List, Typography } from 'antd';
import { memo, useCallback } from 'react';

interface IEdgesListItem {
  edgeId: string;
  edgeTitle: string
  disabled: boolean
  onDeleteEdge: (id: string) => void
}

// Отрисовываем одно конкретное ребро в списке ребер графа
export const EdgesListItem = memo(({
  edgeId,
  edgeTitle,
  disabled,
  onDeleteEdge
}: IEdgesListItem) => {
  const onClickHandler = useCallback(() => {
    onDeleteEdge(edgeId);
  }, [onDeleteEdge, edgeId]);

  return (
    <List.Item
      actions={[
        <Button
          type='link'
          disabled={disabled}
          onClick={onClickHandler}
        >
          Удалить
        </Button>
      ]}
    >
      <Typography.Title
        style={{ margin: 0 }}
        level={5}
      >
        {edgeTitle}
      </Typography.Title>
    </List.Item>
  );
});
