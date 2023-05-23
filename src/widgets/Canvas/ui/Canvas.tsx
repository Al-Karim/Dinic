import { useUnit } from 'effector-react';
import { $edges, $nodes, $selectionsElements } from 'entities/Graph';
import { GraphCanvas } from 'reagraph';
import cls from './Canvas.module.scss';

// Отрисовываем канвас с графом, и передаем в него необходимые пропсы (вершины, ребра, выделенные элементы + настройки)
export const Canvas = () => {
  const [
    selectionsElements,
    nodes,
    edges
  ] = useUnit([
    $selectionsElements,
    $nodes,
    $edges
  ]);

  return (
    <div className={cls.canvas}>
      <GraphCanvas
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
