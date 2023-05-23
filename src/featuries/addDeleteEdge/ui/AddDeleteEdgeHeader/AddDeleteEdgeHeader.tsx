import {
  Button,
  InputNumber,
  Select,
  Space,
  Typography
} from 'antd';
import { useUnit } from 'effector-react';
import { $nodes } from 'entities/Graph';
import { memo, useCallback, useMemo } from 'react';
import {
  $from,
  $isEdgeAlreadyExist,
  $maxFlow,
  $to, addEdgeTrigger,
  setFrom,
  setMaxFlow,
  setTo
} from '../../model/AddDeleteEdge';

interface IAddDeleteEdgeHeaderProps {
  disabled?: boolean;
}

// Отрисовываем шапку фичи для добавления и удаления ребра
export const AddDeleteEdgeHeader = memo(({ disabled }:IAddDeleteEdgeHeaderProps) => {
  const [
    onSetMaxFlow,
    maxFlow,
    onSetFrom,
    from,
    onSetTo,
    to,
    nodes,
    onAddEdgeTrigger,
    isEdgeAlreadyExist
  ] = useUnit([
    setMaxFlow,
    $maxFlow,
    setFrom,
    $from,
    setTo,
    $to,
    $nodes,
    addEdgeTrigger,
    $isEdgeAlreadyExist
  ]);

  const optionsFrom = useMemo(() => nodes.map(({ id, label }) => (
    <Select.Option key={id}>{label}</Select.Option>
  )), [nodes]);

  const optionsTo = useMemo(
    () => optionsFrom.filter(id => id.key !== from),
    [from, optionsFrom]
  );

  const onMaxFlowChangeHandler = useCallback((value: number | null) => {
    if (value) {
      onSetMaxFlow(value);
    }
  }, [onSetMaxFlow]);

  return (
    <>
      <Typography.Title level={4}>
        Добавить ребро
      </Typography.Title>

      <Space>
        <Select
          onSelect={onSetFrom}
          value={from}
          placeholder='Откуда'
          disabled={disabled}
        >
          {optionsFrom}
        </Select>
        <Select
          onSelect={onSetTo}
          value={to}
          placeholder='Куда'
          disabled={disabled}
        >
          {optionsTo}
        </Select>
        <InputNumber
          onChange={onMaxFlowChangeHandler}
          min={0}
          value={maxFlow}
          type='number'
          placeholder='Пропускная способность'
          disabled={disabled}
        />
      </Space>
      <Button
        onClick={onAddEdgeTrigger}
        disabled={disabled}
      >
        Добавить
      </Button>
      <Space>
        {isEdgeAlreadyExist && (
          <Typography.Text
            type='danger'
          >
            Ребро уже существует
          </Typography.Text>
        )}
      </Space>
    </>
  );
});
