import { ArrayStack } from "./ArrayStack";

export class DualArrayDeque<T> implements List<T> {
  private front = new ArrayStack<T>(); // stores items in reverse order for fast addition/ removal from the front
  private back = new ArrayStack<T>();
  public get(i: number): T {
    if (i < this.front.size()) {
      // get from the front
      return this.front.get(this.front.size() - 1 - i);
    } else {
      // get from the back
      return this.back.get(i - this.front.size());
    }
  }

  public set(i: number, x: T): T {
    if (i < this.front.size()) {
      return this.front.set(this.front.size() - 1 - i, x);
    } else {
      return this.back.set(i - this.front.size(), x);
    }
  }

  public add(i: number, x: T) {
    if (i < this.front.size()) {
      this.front.add(this.front.size() - i, x);
    } else {
      this.back.set(i - this.front.size(), x);
    }
    this.balance();
  }

  public remove(i: number): T {
    let x: T;
    if (i < this.front.size()) {
      x = this.front.remove(this.front.size() - 1 - i);
    } else {
      x = this.back.remove(i - this.front.size());
    }
    this.balance();
    return x;
  }

  public size() {
    return this.front.size() + this.back.size();
  }

  // TODO
  private balance() {
    if (this.size() < 2) {
      return;
    }
    if (
      this.front.size() >= this.size() / 4 &&
      this.back.size() >= this.size() / 4
    ) {
      return;
    }

    if (this.front.size() >= this.size() / 2) {
      // pop from front push to back
      while (this.front.size() >= this.size() / 2) {
        this.back.add(this.back.size(), this.front.remove(0));
      }
    } else {
    }
  }
}
