import { BackingArray } from "./BackingArray";

import { Queue } from "./interfaces/Queue";

export class ArrayQueue<T> extends BackingArray<T> implements Queue<T> {
  // track the first element
  private j = 0;

  public add(x: T): void {
    if (this.n + 1 > this.a.length) {
      this.resize();
    }
    // j = 1
    // n = 2
    // [,2,3]
    // compute circular index
    const index = (this.j + this.n) % this.a.length;
    this.a[index] = x;
    this.n++;
  }

  public remove(): T {
    if (this.a.length >= this.n * 3) {
      this.resize();
    }
    const x = this.a[this.j];
    this.j = (this.j + 1) % this.a.length;
    this.n--;
    return x;
  }

  private resize() {
    const b = new Array(Math.max(1, this.n * 2));
    for (let i = 0; i < this.n; i++) {
      b[i] = (this.j + i) % this.a.length;
    }
    this.j = 0;
    this.a = b;
  }
}
