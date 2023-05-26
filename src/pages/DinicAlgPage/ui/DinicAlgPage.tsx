import { ShowMessages } from 'featuries/showMessages';
import { Canvas } from 'widgets/Canvas';
import { Logger } from 'widgets/Logger';
import { Sidebar } from 'widgets/Sidebar';

// Страница с алгоритмом Диницы
export const DinicAlgPage = () => (
  <>
    <ShowMessages />
    <Logger />
    <Canvas />
    <Sidebar />
  </>
);
