import { GraphEdge } from 'reagraph';
import { setIsEdgeAlreadyExist } from '../../../model/AddDeleteEdge';

// Определяем тип аргументов функции для добавления нового ребра в граф
interface IAddNewEdgesArgs {
  from: string; // ID вершины, из которой выходит ребро
  to: string; // ID вершины, в которую входит ребро
  maxFlow: number; // Максимальный поток, который может протекать по ребру
  edges: GraphEdge[]; // Массив существующих ребер
}

// Определяем эффект для добавления нового ребра в граф
export const addEdge = ({
  from, to, maxFlow, edges
}: IAddNewEdgesArgs): GraphEdge[] => {
  const id = `${from}-${to}`;

  // Проверяем, есть ли уже такое ребро в графе
  if (edges.find(edge => edge.id === id)) {
    setIsEdgeAlreadyExist(); // Устанавливаем состояние переменной, которая отвечает за наличие ребра в графе
    return edges; // Возвращаем массив существующих ребер
  }

  // Иначе добавляем новое ребро в массив существующих ребер
  return [...edges, {
    source: from, // Вершина, из которой выходит ребро
    target: to, // Вершина, в которую входит ребро
    id, // ID ребра
    label: `${maxFlow}`, // Максимальный поток, который может протекать по ребру
    data: {
      maxFlow: maxFlow.toString(), // Максимальный поток, который может протекать по ребру
      title: `${+from - 1}-${+to - 1}` // Название ребра
    },
    labelVisible: true // Видимость надписи на ребре
  }];
};
