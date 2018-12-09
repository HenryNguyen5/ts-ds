// A dynamic array implemented using static arrays
export class BackingArray<T> {
  protected a: T[] = new Array(1);
  // number of elements
  protected n = 0;
}
