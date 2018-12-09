export interface Set<T> {
  size(): number;
  add(x: T): boolean;
  remove(X: T): T | null;
  find(x: T): T | null;
}
