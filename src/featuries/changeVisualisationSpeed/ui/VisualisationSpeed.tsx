import { Slider, Space, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { $isVisualistionStarted, $visualisationSpeed, setVisualisationSpeed } from 'entities/Visualisation';
import cls from './VisualisationSpeed.module.scss';

// Компонент для отрисовки и изменения скорости визуализации
export const VisualisationSpeed = () => {
  const [
    visualisationSpeed,
    onSetVisualisationSpeed,
    isVisualistionStarted
  ] = useUnit([
    $visualisationSpeed,
    setVisualisationSpeed,
    $isVisualistionStarted
  ]);

  return (
    <Space direction='vertical'>
      <Typography.Title level={4}>
        Настройки скорости визуализации
      </Typography.Title>
      <Slider
        onChange={onSetVisualisationSpeed}
        defaultValue={visualisationSpeed}
        value={visualisationSpeed}
        max={3}
        min={0.1}
        step={0.1}
        className={cls.slider}
        disabled={isVisualistionStarted}
      />
    </Space>
  );
};
