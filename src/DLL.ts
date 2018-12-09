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
  public prev: Node<T> | null = null;
  public next: Node<T> | null = null;
  constructor(public data: T) {}
}

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  public addAt(index: number, item: T): void {
    if (index > this.size) {
      throw Error("Index out of bounds");
    }
    this.size++;
    let prevNode: Node<T> | null = null;
    let currNode = this.head;
    let currIndex = 0;

    while (currIndex !== index) {
      currIndex++;
      prevNode = currNode;
      currNode = currNode!.next;
    }

    // if we're adding a new head
    if (prevNode === null && currNode === null) {
      this.head = new Node(item);
      this.tail = this.head;
      return;
    }

    // if we're adding a head to an existing list
    if (prevNode === null) {
      const prevHead = this.head!;
      this.head = new Node(item);
      this.head.next = prevHead;
      this.head.next.prev = this.head;
      return;
    }

    // if we're adding to tail
    if (currNode === null) {
      prevNode.next = new Node(item);
      prevNode.next.prev = prevNode;
      this.tail = prevNode.next;
      return;
    }

    //if we're adding to the middle
    prevNode.next = new Node(item);
    prevNode.next.prev = prevNode;
    prevNode.next.next = currNode;
    currNode.prev = prevNode.next;
    return;
  }

  public addFirst(item: T) {
    this.addAt(0, item);
  }

  public addLast(item: T) {
    this.addAt(this.size, item);
  }
  public add(item: T) {
    this.addAt(this.size, item);
  }

  public getSize() {
    return this.size;
  }

  public clear() {
    this.head = null;
    this.tail = null;
  }
  public contains(item: T): boolean {
    let currNode = this.head;
    while (currNode !== null) {
      if (currNode.data === item) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }

  public get(index: number): T {
    if (index > this.size - 1) {
      throw Error("Index out of bounds");
    }

    let currNode = this.head;
    let currIndex = 0;
    while (currIndex !== index) {
      currNode = currNode!.next;
      currIndex++;
    }
    return currNode!.data;
  }

  public getFirst() {
    return this.get(0);
  }
  public getLast() {
    return this.get(this.size - 1);
  }

  public indexOf(item: T): number {
    let currNode = this.head;
    let currIndex = 0;
    while (currNode !== null) {
      if (currNode.data === item) {
        return currIndex;
      }
      currNode = currNode.next;
      currIndex++;
    }
    return -1;
  }

  public remove(item: T): T | null {
    let currNode = this.head;
    let prevNode: Node<T> | null = null;

    while (currNode !== null) {
      if (currNode.data === item) {
        break;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }

    // didnt find item
    if (currNode === null) {
      return null;
    }

    this.size--;
    // remove head
    if (prevNode === null) {
      const prevHead = this.head;
      this.head = this.head!.next;
      // check if we need to set prev
      if (this.head) {
        this.head.prev = null;
      }
      return prevHead!.data;
    }

    const nodeToRemove = prevNode.next;

    // remove tail
    if (currNode === this.tail) {
      this.tail = prevNode;
      prevNode.next = null;
      return nodeToRemove!.data;
    } else {
      // remove middle
      prevNode.next = currNode.next;
      prevNode.next!.prev = prevNode;
      return nodeToRemove!.data;
    }
  }

  public removeAt(index: number): T {
    if (index > this.size - 1) {
      throw Error("Index out of bounds");
    }

    this.size--;
    let currIndex = 0;
    let currNode = this.head;
    let prevNode: Node<T> | null = null;

    while (currIndex !== index) {
      currIndex++;
      prevNode = currNode;
      currNode = currNode!.next;
    }

    // remove head
    if (prevNode === null) {
      const prevHead = this.head!;
      this.head = this.head!.next;
      if (this.head) {
        this.head.prev = null;
      }
      return prevHead.data;
    }

    // remove tail
    const nodeToRemove = prevNode.next;
    if (currNode === this.tail) {
      prevNode.next = null;
      this.tail = prevNode;
      return nodeToRemove!.data;
    } else {
      // remove middle
      prevNode.next = currNode!.next;
      prevNode.next!.prev = prevNode;
      return nodeToRemove!.data;
    }
  }

  public set(index: number, item: T): T {
    if (index > this.size - 1) {
      throw Error("Index out of bounds");
    }

    let currNode = this.head;
    let currIndex = 0;

    while (currIndex !== index) {
      currNode = currNode!.next;
      currIndex++;
    }

    // setting head
    const prevData = currNode!.data;
    currNode!.data = item;
    return prevData;
  }

  public toString(): string {
    let str = "";
    let currNode = this.head;
    while (currNode !== null) {
      str += `${currNode.data},`;
      currNode = currNode.next;
    }
    str = str.slice(0, str.length - 1);

    return `[${str}]`;
  }

  public toStringBackwards(): string {
    let str = "";
    let currNode = this.tail;
    while (currNode !== null) {
      str += `${currNode.data},`;
      currNode = currNode.prev;
    }
    str = str.slice(0, str.length - 1);

    return `[${str}]`;
  }
}
