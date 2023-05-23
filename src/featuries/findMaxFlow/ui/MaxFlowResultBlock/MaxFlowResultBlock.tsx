import { Typography } from 'antd';
import { memo } from 'react';

interface IMaxFlowResultBlock {
  maxFlow: number
}

// Блок с логикой отрисовки результата
export const MaxFlowResultBlock = memo(({ maxFlow }: IMaxFlowResultBlock) => (
  maxFlow > 0 ? (
    <Typography.Title level={4}>
      Максимальный поток:
      {' '}
      {maxFlow}
    </Typography.Title>
  ) : (
    <Typography.Title level={4}>
      Заполните граф
    </Typography.Title>
  )
));
