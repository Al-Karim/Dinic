import { ReactNode } from 'react';
import cls from './AppContainer.module.scss';

interface IAppContainerProps {
  children: ReactNode
}

// Компонент обертка задающее расположение основных элементов
export const AppContainer = ({ children }: IAppContainerProps) => (
  <div className={cls['app-container']}>
    {children}
  </div>
);
