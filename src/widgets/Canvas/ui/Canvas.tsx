import { useUnit } from 'effector-react';
import {
  $activiesElements, $edges, $nodes, $selectionsElements
} from 'entities/Graph';
import { GraphCanvas } from 'reagraph';
import cls from './Canvas.module.scss';

// Отрисовываем канвас с графом, и передаем в него необходимые пропсы (вершины, ребра, выделенные элементы + настройки)
export const Canvas = () => {
  const [
    activiesElements,
    selectionsElements,
    nodes,
    edges
  ] = useUnit([
    $activiesElements,
    $selectionsElements,
    $nodes,
    $edges
  ]);

  return (
    <div className={cls.canvas}>
      <GraphCanvas
        actives={activiesElements}
        selections={selectionsElements}
        layoutType='treeLr2d'
        edgeLabelPosition='natural'
        edgeArrowPosition='end'
        labelType='all'
        nodes={nodes}
        edges={edges}
        draggable
      />
    </div>
  );
};
