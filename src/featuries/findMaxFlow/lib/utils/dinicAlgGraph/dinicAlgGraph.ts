import { addActiveElement, addSelectionElement, changeEdge } from 'entities/Graph';
import { setIsMessageQueueFilled, setMessageToQueue } from 'entities/MessagesQueue';
import { addTasksToQueue, setIsTaskQueueFilled } from 'entities/TasksQueue';

export interface IDinicAlgEdge {
  from: number; // Исходная вершина ребра
  to: number; // Целевая вершина ребра
  weight: number; // Вес ребра
}

interface FlowEdge {
  v: number; // Целевая вершина ребра
  capacity: number; // Пропускная способность ребра
  flow: number; // Текущий поток через ребро
  residual: FlowEdge | null; // Обратное ребро (residual)
}

export class DinicAlgGraph {
  verticies: number; // Количество вершин в графе

  adj: FlowEdge[][]; // Список смежности графа

  levels: number[]; // Уровни вершин при обходе графа

  next: number[]; // Массив указателей на следующее ребро при обходе

  constructor(verticies: number, edges: IDinicAlgEdge[]) {
    this.verticies = verticies;
    this.adj = Array.from({ length: verticies }, () => []);
    this.levels = Array(verticies).fill(-1);
    this.next = Array(verticies).fill(0);

    edges.forEach(({ from, to, weight }) => {
      // Создание прямого ребра и обратного ребра
      const forward: FlowEdge = {
        v: to,
        capacity: weight,
        flow: 0,
        residual: null
      };
      const residual: FlowEdge = {
        v: from,
        capacity: 0,
        flow: 0,
        residual: forward
      };
      forward.residual = residual;
      this.adj[from].push(forward);
      this.adj[to].push(residual);
    });
  }

  calcMaxFlow(src: number, dst: number): number {
    let maxFlow = 0;

    while (this.bfs(src, dst)) {
      let flowIncrease = 0;
      this.next.fill(0);
      do {
        flowIncrease = this.dfs(src, dst);
        maxFlow += flowIncrease;
      } while (flowIncrease > 0);
    }

    setMessageToQueue(`Максимальный поток: ${maxFlow}`);
    setIsTaskQueueFilled();
    setIsMessageQueueFilled();
    return maxFlow;
  }

  dfs(src: number, dst: number, u = src, bottleneck = 1): number {
    if (u === dst) {
      return bottleneck; // Достигнут сток, возвращаем bottleneck
    }

    for (; this.next[u] < this.adj[u].length; this.next[u]++) {
      const edge = this.adj[u][this.next[u]];

      const residual = edge.capacity - edge.flow; // Вычисляем остаточную пропускную способность ребра
      if (this.levels[edge.v] > this.levels[u] && residual > 0) {
        // Если вершина следующего ребра находится на следующем уровне и остаточная пропускная способность больше 0
        const flow = this.dfs(src, dst, edge.v, Math.min(bottleneck, residual)); // Рекурсивный вызов dfs для следующей вершины
        if (flow > 0) {
          edge.flow += bottleneck; // Увеличиваем поток через текущее ребро на bottleneck
          if (edge.residual) {
            edge.residual.flow += bottleneck; // Увеличиваем поток через обратное ребро на bottleneck
          }
          addTasksToQueue({
            event: addSelectionElement,
            payload: `${edge.v}`
          });
          addTasksToQueue({
            event: addSelectionElement,
            payload: `${u}`
          });
          addTasksToQueue({
            event: changeEdge,
            payload: {
              id: `${u}-${edge.v}`,
              source: u.toString(),
              target: edge.v.toString(),
              label: edge.flow.toString(),
              size: 3
            }
          });
          addTasksToQueue({
            event: addActiveElement,
            payload: `${u}-${edge.v}`
          });
          setMessageToQueue(`Пропускаем блокирующий поток в размере ${edge.flow} через ребро ${u - 1}-${edge.v - 1}`);
          return bottleneck; // Возвращаем bottleneck
        }
      }
    }

    return 0; // Не найдено пути до стока, возвращаем 0
  }

  bfs(src: number, dst: number): boolean {
    this.levels.fill(-1);
    this.levels[src] = 0;
    const q = [src];

    while (q.length > 0 && this.levels[dst] === -1) {
      const u = q.pop()!;
      addTasksToQueue({
        event: addActiveElement,
        payload: u.toString()
      });
      setMessageToQueue(`Запускаем обход вершины номер ${u - 1}`);
      for (let i = 0; i < this.adj[u].length; i++) {
        const nextEdge = this.adj[u][i];
        const { v } = nextEdge;
        addTasksToQueue({
          event: addActiveElement,
          payload: `${v}`
        });
        const residual = nextEdge.capacity - nextEdge.flow;
        addTasksToQueue({
          event: addActiveElement,
          payload: `${u}-${v}`
        });
        setMessageToQueue(`Проверяем ребро ${u - 1}-${v - 1}`);
        if (residual > 0 && this.levels[v] === -1) {
          setMessageToQueue(`Помещаем ребро ${u - 1}-${v - 1} в очередь`);
          q.push(v);
          setMessageToQueue(`Очередь: ${q.map(v => v - 1)}`);
          this.levels[v] = this.levels[u] + 1; // Устанавливаем уровень вершины v
        }
      }
    }

    return this.levels[dst] !== -1; // Возвращаем true, если достигнут сток, иначе false
  }
}
