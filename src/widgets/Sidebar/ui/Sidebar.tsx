import { Divider } from 'antd';
import { AddEdge } from 'featuries/addDeleteEdge';
import { AddDeleteNode } from 'featuries/addDeleteNode';
import { VisualisationSpeed } from 'featuries/changeVisualisationSpeed';
import { FindMaxFlow } from 'featuries/findMaxFlow';
import cls from './Sidebar.module.scss';

// Отрисывоваем сайдбар
export const Sidebar = () => (
  <div className={cls.sidebar}>
    <AddDeleteNode />
    <Divider />
    <AddEdge />
    <Divider />
    <VisualisationSpeed />
    <Divider />
    <FindMaxFlow />
  </div>
);
