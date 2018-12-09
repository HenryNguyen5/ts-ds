// uses array to implicity represent a binary tree
// elements are heap-ordered
// the value stored at any index i is not smaller than the value stored at index parent (i)
// with the exception of the root value i = 0
// the smallest value in the priority queue is stored at position 0 (the root)
export class BinaryHeap<T> {
  public a: T[] = [];
  public n = 0;
  public left(i: number): number {
    return 2 * i + 1;
  }
  public right(i: number): number {
    return 2 * i + 2;
  }
  public parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  public add(x: T) {
    if (this.n + 1 > this.a.length) {
      this.resize();
    }
    this.a[this.n] = x;
    this.n++;
    this.bubbleUp(this.n - 1);
    return true;
  }

  // maintain heap property by repeatedly swapping
  // x with its parent
  // until x is greater than its parent
  public bubbleUp(i: number): void {
    let p = this.parent(i);
    while (this.a[i] < this.a[p]) {
      let tmp = this.a[i];
      this.a[i] = this.a[p];
      this.a[p] = tmp;
      i = p;
      p = this.parent(i);
    }
  }

  // remove the smallest value from the heap
  public remove() {
    const x = this.a[0];
    this.a[0] = this.a[this.n - 1];
    this.n--;

    this.trickleDown();
    if (this.n * 3 < this.a.length) {
      this.resize();
    }
    return x;
  }
  public trickleDown() {
    let i = 0;
    let left = this.left(i);
    let right = this.right(i);
    const { a, n } = this;
    // check if a swap is suitable and indices are in range
    while ((left < n && a[i] > a[left]) || (right < n && a[i] > a[right])) {
      if (i > n) {
        return;
      }
      // if both left and right indices are in range, check which is lesser and swap i with it
      if (left < n && right < n) {
        // right is smaller
        if (a[left] > a[right]) {
          // swap
          let tmp = a[i];
          a[i] = a[right];
          a[right] = tmp;

          i = right;
        } else {
          // swap
          let tmp = a[i];
          a[i] = a[left];
          a[left] = tmp;
          i = left;
        }
      }
      // left indice is 1 less than right, so it may be in range and swappable
      else if (left < n) {
        if (a[left] < a[i]) {
          // swap
          let tmp = a[i];
          a[i] = a[left];
          a[left] = tmp;
          i = left;
        }
      }

      right = this.right(i);
      left = this.left(i);
    }
  }
  private resize() {
    const b = new Array(this.a.length * 2);
    for (let i = 0; i < this.a.length; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  }
}
