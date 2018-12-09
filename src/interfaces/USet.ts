import { Set } from "./Set";
// The USet interface represents an unordered set of unique elements, which mimics a mathematical set.
// A USet contains n distinct elements; no element appears more than once; the elements are in no specific order.

export interface USet<T> extends Set<T> {}
