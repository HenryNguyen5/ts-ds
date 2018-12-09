class Node<T> {
  public parent: Node<T> | null = null;
  public left: Node<T> | null = null;
  public right: Node<T> | null = null;
  public height: number = 0;
  constructor(public x: T) {}
}

export class BinarySearchTree<T> {
  private r: Node<T> | null = null;
  private n = 0;

  public findEQ(x: T): T | null {
    let w = this.r;
    while (w !== null) {
      const comp = this.compare(x, w.x);

      if (comp < 0) {
        w = w.left!;
      } else if (comp > 0) {
        w = w.right!;
      } else {
        return w.x;
      }
    }
    return null;
  }

  // find an element equal to or greater than x
  public find(x: T): Node<T> | null {
    let w = this.r;
    let z: Node<T> | null = null;
    while (w !== null) {
      const comp = this.compare(x, w.x);

      if (comp < 0) {
        z = w;
        w = w.left;
      } else if (comp > 0) {
        w = w.right;
      } else {
        return w;
      }
    }
    return z ? z : null;
  }

  public add(x: T) {
    const p = this.findLast(x);
    const u = new Node(x);
    return this.addChild(p, u);
  }

  private addChild(p: Node<T> | null, u: Node<T>) {
    if (p === null) {
      this.r = u;
    } else {
      const comp = this.compare(u.x, p.x);

      u.parent = p;
      if (comp < 0) {
        p.left = u;
      } else if (comp > 0) {
        p.right = u;
      } else {
        return false;
      }
    }

    this.n++;
    return true;
  }

  public findLast(x: T): Node<T> | null {
    let w = this.r;
    let prev: Node<T> | null = null;
    while (w !== null) {
      prev = w;
      const comp = this.compare(x, w.x);
      if (comp < 0) {
        w = w.left;
      } else if (comp > 0) {
        w = w.right;
      } else {
        return w;
      }
    }
    return prev;
  }

  public remove(u: Node<T>) {
    if (u.left === null || u.right === null) {
      this.splice(u);
      return;
    } else {
      let w = u.right;

      while (w.left !== null) {
        w = w.left;
      }

      u.x = w.x;
      this.splice(w);
    }
  }

  public rotateRight(u: Node<T>) {
    let w = u.left;
    let p: Node<T>;
    // swap out u's parents' child reference to w
    if (u.parent !== null) {
      p = u.parent;
      if (p.left === u) {
        p.left = w;
      } else {
        p.right = w;
      }
    }
    if (w === null) {
      return;
    }
    w.parent = u.parent;
    u.left = w.right;
    u.parent = w;
    if (u.left) {
      u.left.parent = u;
    }
    w.right = u;

    if (u === this.r) {
      this.r = w;
    }
  }

  public rotateLeft(w: Node<T>) {
    let u = w.right;
    if (w.parent) {
      if (w.parent.left === w) {
        w.parent.left = u;
      } else {
        w.parent.right === u;
      }
    }

    if (u) {
      u.parent = w.parent;
      w.right = u.left;
      if (w.right) {
        w.right.parent = w;
      }
      u.left = w;
    }

    w.parent = u;

    if (this.r === w) {
      this.r = u;
    }
  }

  // splice out u if it only has one child or less
  private splice(u: Node<T>) {
    let s: Node<T> | null;
    let p: Node<T> | null;
    // if we have a left child
    if (u.left !== null) {
      s = u.left;
    } else {
      s = u.right;
    }

    // if we're at the root
    if (u === this.r) {
      this.r = s;
      p = null;
    } else {
      // u's parent wont be null here since we know we're not at the root
      p = u.parent!;
      if (p.left === u) {
        p.left = s;
      } else {
        p.right = s;
      }
    }

    if (s !== null) {
      s.parent = p;
    }

    this.n--;
  }

  public height(n: Node<T> | null): number {
    if (n === null) {
      return -1;
    }
    return 1 + Math.max(this.height(n.left), this.height(n.right));
  }
  public toString() {
    if (this.r === null) {
      return;
    }
    let str = "";
    let currHeight = this.height(this.r);
    let currIter = 0;
    let nextHeightDecrease = 1;

    const q: Node<T>[] = [];
    q.push(this.r);
    while (q.length > 0) {
      const u = q.shift()!;
      u.height = currHeight;
      currIter++;
      if (currIter === nextHeightDecrease) {
        currHeight--;
        nextHeightDecrease = nextHeightDecrease * 2;
        str += "\n";
      }
      for (let i = 0; i < currHeight; i++) {
        str += " ";
      }
      str += `(${u.x})`;

      if (u.left) {
        q.push(u.left);
      }
      if (u.right) {
        q.push(u.right);
      }
    }
    return str;
  }

  private compare(a: T, b: T) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
}
