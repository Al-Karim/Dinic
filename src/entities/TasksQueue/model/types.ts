import { Event } from 'effector';
import { GraphEdge } from 'reagraph';

export type TaskT = {
  event: Event<any>,
  payload: GraphEdge | string
}
