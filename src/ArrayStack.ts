import { BackingArray } from "./BackingArray";
import { List } from "./interfaces/List";

export class ArrayStack<T> extends BackingArray<T> implements List<T> {
  // O(1)
  public get(i: number): T {
    if (i > this.n - 1 || i < 0) {
      throw Error("Index out of bounds");
    }
    return this.a[i];
  }

  // O(1)
  public set(i: number, x: T): T {
    if (i > this.n - 1 || i < 0) {
      throw Error("Index out of bounds");
    }

    const oldElement = this.a[i];
    this.a[i] = x;

    return oldElement;
  }

  // O(n - i) ignoring resizing,  proportional to the number of elements we shift
  public add(i: number, x: T) {
    if (i > this.n || i < 0) {
      throw Error("Index out of bounds");
    }

    // check if already full
    if (this.n + 1 > this.a.length) {
      // resize if so
      this.resize();
    }

    // shift elements to the right "i" times
    for (let j = this.n; j > i; j--) {
      this.a[j] = this.a[j - 1];
    }

    this.a[i] = x;
    this.n++;
  }

  // O(n - i), proportional to the number of elements we shift
  public remove(i: number): T {
    if (i > this.n - 1 || i < 0) {
      throw Error("Index out of bounds");
    }

    const x = this.a[i];
    // always leaves at least one element in a list
    for (let j = i; j < this.n - 1; j++) {
      this.a[j] = this.a[j + 1];
    }
    this.n--;

    if (this.a.length >= 3 * this.n) {
      this.resize();
    }
    return x;
  }

  public size() {
    return this.n;
  }

  // resizes array to 2*n
  // if an empty arraystack is created and any sequence of m >= 1 calls
  // to add/remove are performed, then the total time spent during all calls to resize() is O(m)

  // any time resize is called, the number of calls to add/remove since the last call is at least n/2 - 1
  // [1,2,,] -> [1,2,3,] -> [1,2,3,4] -> resize, 2 calls >= 4/2 - 1
  // [1,2,3,4] -> [1,2,3,] -> [1,2,,] -> [1,,,] -> resize 3 calls >= 4/2 - 1
  // if n_i denotes the value of n during the ith call to resize(), and r denotes the number of calls to resize()
  // then the total number of calls to add/remove is at least \sum{i = 1, r }(n_i/2 -1) <= m
  // which is equivalent to   \sum{i = 1, r}n_i  <= 2m + 2r
  private resize() {
    console.log("Resizing to length:", this.n * 2);
    // resize to a * 2
    const b = new Array(Math.max(1, this.n * 2));

    // copy over elements
    for (let i = 0; i < this.n; i++) {
      b[i] = this.a[i];
    }

    // set new array
    this.a = b;
  }
}
