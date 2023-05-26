import { Space, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { $log } from 'entities/Log';
import { useMemo } from 'react';
import cls from './Logger.module.scss';

export const Logger = () => {
  const log = useUnit($log);

  const logMessages = useMemo(() => log.map(message => (
    <Typography.Text>
      {message}
    </Typography.Text>
  )), [log]);

  return (
    <Space className={cls.logger}>
      <Typography.Title level={4}>
        Логи
      </Typography.Title>
      {logMessages}
    </Space>
  );
};
