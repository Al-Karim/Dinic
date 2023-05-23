import { Button, List, Typography } from 'antd';
import { memo } from 'react';

interface INodesListItemProps {
  nodeId: string,
  nodeLabel: string,
  disabled: boolean,
  onDeleteNode: (nodeId: string) => void
}

// Компонент отрисовывающий одну ноду в списке

export const NodesListItem = memo(({
  nodeId,
  nodeLabel,
  disabled,
  onDeleteNode
}: INodesListItemProps) => {
  const onClickHandler = () => {
    onDeleteNode(nodeId);
  };

  return (
    <List.Item
      actions={[
        <Button
          type='link'
          onClick={onClickHandler}
          disabled={disabled}
        >
          Удалить
        </Button>
      ]}
    >
      <Typography.Title
        style={{ margin: 0 }}
        level={5}
      >
        {nodeLabel}
      </Typography.Title>
    </List.Item>
  );
});
