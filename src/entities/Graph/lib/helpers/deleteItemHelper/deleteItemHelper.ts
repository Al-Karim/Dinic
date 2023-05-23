import { GraphElementBaseAttributes } from 'reagraph';

// Хелепер для удаления вершин и ребер
export const deleteItemHelper = <T extends GraphElementBaseAttributes>(items: T[], deletingItemId: string): T[] => (
  items.filter(item => item.id !== deletingItemId)
);
