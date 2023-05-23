import { GraphEdge } from 'reagraph';

// Функция changeEdgeHelper используется для изменения свойства label у грани в массиве edges.
// Она принимает массив граней edges и измененную грань changedEdge и возвращает новый массив граней с измененным свойством label.
export const changeEdgeHelper = (edges: GraphEdge[], changedEdge: GraphEdge) => (
  edges.map(edge => {
    // Если ID грани не совпадает с ID измененной грани, оставляем грань без изменений.
    if (edge.id !== changedEdge.id) {
      return edge;
    }

    let currentLabel;
    const [, maxFlow] = edge.label?.split('/') || [];
    // Если в свойстве label грани уже указан максимальный поток, сохраняем его в переменную currentLabel.
    if (maxFlow) {
      currentLabel = maxFlow;
    } else {
      currentLabel = edge.label;
    }

    // Возвращаем грань с обновленным свойством label, добавляя измененное значение changedEdge.label к текущему значению currentLabel.
    return {
      ...edge,
      label: `${changedEdge.label}/${currentLabel}`
    };
  })
);
