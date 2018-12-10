class Node<T> {
  public next: Node<T> | null = null;
  constructor(public data: T) {}
}

export class SinglyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private n: number = 0;

  public getSize(): number {
    return this.n;
  }

  public push(x: T) {
    const u = new Node(x);

    u.next = this.head;
    this.head = u;

    if (this.n === 0) {
      this.tail = u;
    }

    this.n++;
  }

  public pop(): T | null {
    const prevHead = this.head;
    this.n--;
    if (prevHead) {
      this.head = prevHead.next;
    }
    if (this.n === 0) {
      this.tail = null;
    }

    return prevHead ? prevHead.data : null;
  }

  public add(x: T) {
    const u = new Node(x);
    if (this.n === 0) {
      this.head = u;
    } else {
      this.tail!.next = u;
    }

    this.tail = u;
    this.n++;
  }

  public remove(): T | null {
    return this.pop();
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
