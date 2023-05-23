import { GraphNode } from 'reagraph';

// Определяем тип аргументов функции для добавления новой ноды в граф
interface IAddNewNodeArgs {
  $nodes: GraphNode[]; // массив существующих нод
  $nodeLabel: string | null; // метка новой ноды
}

// Определяем функцию для добавления новой ноды в граф
export const addNewNode = ({ $nodes, $nodeLabel }: IAddNewNodeArgs): GraphNode[] => {
  // Если метка новой ноды не задана, создаем ноду со следующим порядковым номером
  if (!$nodeLabel) {
    return [...$nodes, {
      id: ($nodes.length + 1).toString(), // ID ноды
      label: ($nodes.length).toString() // метка ноды
    }];
  }

  // Иначе создаем ноду с заданной меткой
  return [...$nodes, {
    id: ($nodes.length + 1).toString(), // ID ноды
    label: $nodeLabel // метка ноды
  }];
};
