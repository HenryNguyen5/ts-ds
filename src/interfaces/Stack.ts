// Although we will normally not discuss the Stack,
// Deque and FIFO Queue interfaces in subsequent chapters,
// the terms Stack and Deque are sometimes used in the names of data structures
// that implement the List interface.When this happens,
// it highlights the fact that these data structures can be used to
// implement the Stack or Deque interface very efficiently.For example,
// the ArrayDeque class is an implementation of the List interface that implements all the Deque operations in constant time per operation.

export interface Stack<T> {
  push(x: T): void;
  pop(): T;
}
