export interface IDoublyLinkedList<T> {
  add(item: T): void;
  addAt(index: number, item: T): void;
  addFirst(item: T): void;
  addLast(item: T): void;
  clear(): void;
  contains(item: T): boolean;
  get(index: number): T;
  getFirst(): T;
  getLast(): T;
  indexOf(item: T): number;
  remove(item: T): T | null;
  removeAt(index: number): T | null;
  set(index: number, item: T): T;
  getSize(): number;
  toString(): string;
  toStringBackwards(): string;
}

class Node<T> {
  public prev!: Node<T>;
  public next!: Node<T>;
  public data!: T;
}

type DummyNode = Node<any>;

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  private dummy: DummyNode;
  private n: number = 0;

  constructor() {
    this.dummy = new Node();
    this.dummy.data = null;
    this.dummy.next = this.dummy;
    this.dummy.prev = this.dummy;
  }

  public addAt(i: number, item: T): void {
    if (i < 0 || i > this.n) {
      throw Error("Index out of bounds");
    }
    const u = new Node<T>();
    u.data = item;

    const c = this.findNodeAt(i);

    // add before i
    // set new node references
    u.next = c;
    u.prev = c.prev;

    // merge rest of list
    u.next.prev = u;
    u.prev.next = u;
    this.n++;
  }

  public addFirst(item: T) {
    this.addAt(0, item);
  }

  public addLast(item: T) {
    this.addAt(this.n, item);
  }
  public add(item: T) {
    this.addAt(this.n, item);
  }

  public getSize() {
    return this.n;
  }

  public clear() {
    this.dummy.next = this.dummy;
    this.dummy.prev = this.dummy;
  }

  public contains(item: T): boolean {
    return !!this.findNodeEq(item);
  }

  public get(index: number): T {
    return this.findNodeAt(index).data;
  }

  // O(n)
  public findNodeEq(x: T): Node<T> | null {
    let c = this.dummy.next;
    while (c !== this.dummy) {
      if (c.data === x) {
        return c;
      }
      c = c.next;
    }
    return null;
  }

  // O( min(i, n - i ) )
  public findNodeAt(i: number): Node<T> {
    if (i < 0 || i > this.n) {
      throw Error("Index out of bounds");
    }

    let c = this.dummy;

    // iterate forwards
    if (i < Math.floor(this.n / 2)) {
      c = c.next; // always need to go forward at least once because the first node is the dummy node
      for (let j = 0; j < i; j++) {
        c = c.next;
      }
    } else {
      for (let j = this.n; j > i; j--) {
        c = c.prev;
      }
    }

    return c;
  }

  public getFirst() {
    return this.get(0);
  }
  public getLast() {
    return this.get(this.n - 1);
  }

  // O(n)
  public indexOf(item: T): number {
    let currNode = this.dummy.next;
    let currIndex = 0;
    while (currNode !== this.dummy) {
      if (currNode.data === item) {
        return currIndex;
      }
      currNode = currNode.next;
      currIndex++;
    }
    return -1;
  }

  public remove(item: T): T | null {
    const c = this.findNodeEq(item);
    if (!c) {
      return null;
    }

    // splice
    this.splice(c);
    return c.data;
  }

  public removeAt(index: number): T {
    const c = this.findNodeAt(index);
    this.splice(c);
    return c.data;
  }

  public splice(u: Node<T>): void {
    u.prev.next = u.next;
    u.next.prev = u.prev;
    this.n--;
  }

  public set(index: number, item: T): T {
    const c = this.findNodeAt(index);
    const { data } = c;
    c.data = item;
    return data;
  }

  public toString(): string {
    let str = "";
    let currNode = this.dummy.next;
    while (currNode !== this.dummy) {
      str += `${currNode.data},`;
      currNode = currNode.next;
    }
    str = str.slice(0, str.length - 1);

    return `[${str}]`;
  }

  public toStringBackwards(): string {
    let str = "";
    let currNode = this.dummy.prev;
    while (currNode !== this.dummy) {
      str += `${currNode.data},`;
      currNode = currNode.prev;
    }
    str = str.slice(0, str.length - 1);

    return `[${str}]`;
  }
}
