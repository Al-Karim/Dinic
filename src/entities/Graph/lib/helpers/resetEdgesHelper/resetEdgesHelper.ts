import { GraphEdge } from 'reagraph';

// Хелпер для сброса всех ребер
export const resetEdgesHelper = (edges: GraphEdge[]) => edges.map(edge => {
  if (edge.label?.includes('/')) {
    return {
      ...edge,
      label: edge.label?.split('/')[1],
      size: 1
    };
  }

  return edge;
});
