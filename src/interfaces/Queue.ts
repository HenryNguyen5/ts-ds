export interface Queue<T> {
  add(x: T): void;
  remove(): T;
}
