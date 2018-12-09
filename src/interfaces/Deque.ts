export interface Deque<T> {
  addFirst(x: T): void;
  addLast(x: T): void;
  removeFirst(): T;
  removeLast(): T;
}
