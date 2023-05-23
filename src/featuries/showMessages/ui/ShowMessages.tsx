import { message } from 'antd';
import { useUnit } from 'effector-react';
import { memo, useEffect } from 'react';
import { messagesApiChanged } from '../model/ShowMessages';

// Компонент для отображения сообщений
export const ShowMessages = memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const onMessagesApiChanged = useUnit(messagesApiChanged);

  useEffect(() => {
    onMessagesApiChanged(messageApi);
  }, [messageApi, onMessagesApiChanged]);

  return (
    <div>{contextHolder}</div>
  );
});
