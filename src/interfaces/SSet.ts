import { Set } from "./Set";

// The SSet interface represents a sorted set of elements.
// An SSet stores elements from some total order, so that any two elements x and y can be compared.
// In code examples, this will be done with a method called compare(x,y)
export interface SSet<T> extends Set<T> {}
// The difference between a USet and an SSet is in the find method:
// find(x): locate x in the sorted set;
// find the smallest element y in the set such that y >= x. Return y or null of no such element exists
// AKA "successor search"
