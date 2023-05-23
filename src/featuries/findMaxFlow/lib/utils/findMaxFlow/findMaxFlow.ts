import { createEffect } from 'effector';
import { GraphEdge, GraphNode } from 'reagraph';
import { DinicAlgGraph, IDinicAlgEdge } from '../dinicAlgGraph/dinicAlgGraph';

interface IFindMaxFlowArgs {
  $nodes: GraphNode[];
  $edges: GraphEdge[];
}

// Создаем эффект findMaxFlowFx для нахождения максимального потока
export const findMaxFlowFx = createEffect<IFindMaxFlowArgs, number, Error>(({ $nodes, $edges }) => {
  // Преобразуем грани графа в формат, подходящий для DinicAlgGraph
  const normalizedEdges: IDinicAlgEdge[] = $edges.map(({ source, target, data }) => ({
    from: +source,
    to: +target,
    weight: +data.maxFlow
  }));

  // Создаем экземпляр класса DinicAlgGraph
  const graph = new DinicAlgGraph($nodes.length + 1, normalizedEdges);

  // Вычисляем максимальный поток в графе
  return graph.calcMaxFlow(1, $nodes.length);
});
