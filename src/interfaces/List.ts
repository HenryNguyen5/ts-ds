export interface List<T> {
  // return n, the size of the list
  size(): number;
  // return the value x_i
  get(i: number): T;
  // set the value x_i equal to x, returning the old value
  set(i: number, x: T): T;
  // add the value x at position i, displacing the values x_i....x_(n-1)
  add(i: number, x: T): void;
  // remove the value x_i, displacing the values x_(i-1)....x_(n-1)
  remove(i: number): T;
}
