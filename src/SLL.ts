export interface ISinglyLinkedList<T> {
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
  removeAt(index: number): T;
  set(index: number, item: T): T;
  getSize(): number;
  toString(): string;
}

class Node<T> {
  public next: Node<T> | null = null;
  constructor(public data: T) {}
}

export class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  public getSize(): number {
    return this.size;
  }

  /**
   * Add an item to the tail of the list
   * @param item
   */
  public add(item: T): void {
    this.addAt(this.size, item);
  }

  public addFirst(item: T): void {
    this.addAt(0, item);
  }

  public addLast(item: T): void {
    this.add(item);
  }

  public addAt(index: number, item: T): void {
    if (index > this.size) {
      throw Error("Index out of bounds");
    }
    this.size++;

    let currIndex = 0;
    let currNode = this.head;
    let prevNode: Node<T> | null = null;

    // [1,2,3]
    while (currIndex !== index) {
      currIndex++;
      prevNode = currNode;
      currNode = currNode!.next;
    }

    if (prevNode === null) {
      // we're at the head
      const prevHead = this.head;
      this.head = new Node(item);
      this.head.next = prevHead;
      return;
    }

    // we're inbetween / at tail
    prevNode.next = new Node(item);
    prevNode.next.next = currNode;
    return;
  }

  public clear(): void {
    this.head = null;
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

  public indexOf(item: T) {
    let currIndex = 0;
    let currNode = this.head;
    while (currNode !== null) {
      if (item === currNode.data) {
        return currIndex;
      }
      currIndex++;
      currNode = currNode.next;
    }
    return -1;
  }

  public remove(item: T): T | null {
    let prevNode: Node<T> | null = null;
    let currNode = this.head;

    while (currNode !== null) {
      if (item === currNode.data) {
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
    // item is head
    if (prevNode === null) {
      const nextHead = this.head!.next;
      const prevHead = this.head;
      this.head = nextHead;
      return prevHead ? prevHead.data : null;
    }

    // inbetween or tail
    const nextNode = currNode.next;
    prevNode.next = nextNode;

    return currNode ? currNode.data : null;
  }

  public removeAt(index: number): T {
    if (index > this.size - 1) {
      throw Error("Index out of bounds");
    }
    this.size--;

    let prevNode: Node<T> | null = null;
    let currNode = this.head;
    let currIndex = 0;

    // [1,2,3]
    while (currIndex !== index) {
      prevNode = currNode;
      currNode = currNode!.next;
      currIndex++;
    }

    // head
    if (prevNode === null) {
      const nextHead = this.head!.next;
      const prevHead = this.head;
      this.head = nextHead;
      return prevHead!.data;
    }

    // inbetween or tail
    const nodeToRemove = currNode;
    prevNode.next = currNode!.next;
    return nodeToRemove!.data;
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

    const prevData = currNode!.data;
    currNode!.data = item;
    return prevData;
  }

  public toString(): string {
    let str = "";
    let curNode = this.head;
    while (curNode !== null) {
      str += `${curNode.data},`;

      curNode = curNode.next;
    }

    str = str.slice(0, str.length - 1);
    return `[${str}]`;
  }
}
