export class BTNode {
  public parent: BTNode | null = null;
  public left: BTNode | null = null;
  public right: BTNode | null = null;
}

export class BinaryTree {
  public r = new BTNode();

  public depth(node: BTNode): number {
    let d = 0;
    while (node !== this.r) {
      d++;
      node = node.parent!;
    }
    return d;
  }

  public size(n: BTNode | null): number {
    if (n === null) {
      return 0;
    }

    return 1 + this.size(n.left) + this.size(n.right);
  }

  public height(n: BTNode | null): number {
    if (n === null) {
      return -1;
    }
    return 1 + Math.max(this.height(n.left), this.height(n.right));
  }

  // preorder
  public traverse2(): void {
    let u: BTNode | null = this.r;
    let prev: BTNode | null = null;
    let next: BTNode | null = null;

    while (u !== null) {
      // we're decending left side
      if (u.parent === prev) {
        if (u.left !== null) {
          next = u.left;
        } else if (u.right !== null) {
          next = u.right;
        } else {
          next = u.parent;
        }
      } else if (u.left === prev) {
        // acending left side
        if (u.right !== null) {
          next = u.right;
        } else {
          next = u.parent;
        }
      } else {
        // acending right side
        next = u.parent;
      }
      prev = u;
      u = next;
    }
  }

  public size2() {
    let u: BTNode | null = this.r;
    let prev: BTNode | null = null;
    let next: BTNode | null = null;
    let size = 0;
    while (u !== null) {
      // we're decending left side
      if (u.parent === prev) {
        size++;

        if (u.left !== null) {
          next = u.left;
        } else if (u.right !== null) {
          next = u.right;
        } else {
          next = u.parent;
        }
      } else if (u.left === prev) {
        // acending left side
        if (u.right !== null) {
          next = u.right;
        } else {
          next = u.parent;
        }
      } else {
        // acending right side
        next = u.parent;
      }
      prev = u;
      u = next;
    }
    return size;
  }
  public bfTraverse() {
    let arr: BTNode[] = [];
    if (this.r !== null) {
      arr.push(this.r);
    }
    while (arr.length > 0) {
      let n = arr.shift();
      if (n!.left) {
        arr.push(n!.left!);
      }
      if (n!.right) {
        arr.push(n!.right!);
      }
    }
  }
}
