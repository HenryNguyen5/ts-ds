import { BackingArray } from "./BackingArray";
import { List } from "./interfaces/List";

export class ArrayDeque<T> extends BackingArray<T> implements List<T> {
  private j = 0;

  public get(i: number): T {
    if (i < 0 || i > this.n) {
      throw Error("Out of bounds");
    }

    return this.a[(this.j + i) % this.a.length];
  }

  public set(i: number, x: T): T {
    const y = this.a[(this.j + i) % this.a.length];
    this.a[(this.j + i) % this.a.length] = x;
    return y;
  }

  // we shift O(min(i, n-i )) elements
  public add(i: number, x: T): void {
    if (this.n + 1 > this.a.length) {
      this.resize();
    }

    // we want this operation to be fast when i is small or large which is the
    // whole of a deque

    if (i < Math.floor(this.n / 2)) {
      // shift all elements left
      this.j = this.j === 0 ? this.a.length : this.j - 1;

      for (let k = 0; k < i; k++) {
        this.a[(this.j + k) % this.a.length] = this.a[
          (this.j + k + 1) % this.a.length
        ];
      }
    } else {
      // shift all elements right
      for (let k = this.n; k > i; k--) {
        this.a[(this.j + k) % this.a.length] = this.a[
          (this.j + k - 1) % this.a.length
        ];
      }
    }

    this.a[(i + this.j) % this.a.length] = x;
    this.n++;
  }

  // we shift O(min(i, n-i )) elements
  public remove(i: number): T {
    const x = this.a[(this.j + i) % this.a.length];
    if (i < Math.floor(this.n / 2)) {
      // shift all elements right
      for (let k = i; k > 0; k--) {
        this.a[(this.j + k) % this.a.length] = this.a[
          (this.j + k - 1) % this.a.length
        ];
      }
      this.j = (this.j + 1) % this.a.length;
    } else {
      //shift all elements left
      for (let k = i; k < this.n - 1; k++) {
        this.a[(this.j + k) % this.a.length] = this.a[
          (this.j + k + 1) % this.a.length
        ];
      }
    }

    this.n--;
    if (this.a.length <= 3 * this.n) {
      this.resize();
    }

    return x;
  }

  public size() {
    return this.n;
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
