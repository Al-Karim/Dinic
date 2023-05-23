import {
  Button, Input, Space, Typography
} from 'antd';
import { useUnit } from 'effector-react';
import { ChangeEvent, memo, useCallback } from 'react';
import { $nodeLabel, addNode, setNodeLabel } from '../../model/AddDeleteNode';

interface IAddDeleteNodeHeaderProps {
  disabled: boolean
}

// Отрисовываем шапку для добавления новой вершины
export const AddDeleteNodeHeader = memo(({
  disabled
}: IAddDeleteNodeHeaderProps) => {
  const [
    onAddNode,
    onSetNodeLabel,
    nodeLabel
  ] = useUnit([
    addNode,
    setNodeLabel,
    $nodeLabel
  ]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSetNodeLabel(e.currentTarget.value);
  }, [onSetNodeLabel]);

  return (
    <>
      <Typography.Title level={4}>
        Добавить вершину
      </Typography.Title>
      <Space size='large' direction='horizontal'>
        <Button
          disabled={disabled}
          onClick={onAddNode}
        >
          Добавить
        </Button>
        <Input
          value={nodeLabel}
          placeholder='Заголовок (необязательно)'
          type='text'
          onChange={onChangeHandler}
        />
      </Space>
    </>
  );
});
