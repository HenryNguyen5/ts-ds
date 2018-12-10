import { randomBytes } from "crypto";

interface Item<K, V> {
  key: K;
  value: V;
}

export class HashMap<K, V> {
  private n = 0;
  private d = 1;
  private a: Item<K, V>[][] = [];
  private z: number;
  private wordSize = 32;

  constructor() {
    this.a = new Array(1 << this.d).fill(null).map(() => []);
    // {1, ....2^w - 1 }
    this.z = (randomBytes(4).readUInt32BE(0) | 1) >>> 0;
  }

  public set(key: K, value: V): void {
    // set item  if exist
    const item = this.getItem(key);
    if (item) {
      item.value = value;
      return;
    }

    if (this.n + 1 > this.a.length) {
      this.resize();
    }

    const bucket = this.a[this.hash(key)];
    bucket.push({ key, value });
    this.n++;
  }

  public get(key: K): V | null {
    const item = this.getItem(key);
    return item !== undefined ? item.value : null;
  }

  public remove(key: K): V | null {
    const item = this.get(key);
    if (!item) {
      return null;
    }
    this.a[this.hash(key)] = this.a[this.hash(key)].filter(
      item => item.key !== key
    );

    this.n--;
    return item;
  }

  private getItem(key: K): Item<K, V> | undefined {
    const bucket = this.a[this.hash(key)];
    return bucket.find(item => item.key === key);
  }

  private resize() {
    this.d++;
    const b: Item<K, V>[][] = new Array(1 << this.d).fill(null).map(() => []);
    const oldTable = this.a;
    this.a = b;
    this.n = 0;
    for (const bucket of oldTable) {
      for (const item of bucket) {
        this.set(item.key, item.value);
      }
    }
  }

  private hash(key: K) {
    return Math.imul(this.z, this.hashCode(key)) >>> (this.wordSize - this.d);
  }

  private hashCode(key: K) {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      hash = Math.imul(hash, 31) + keyString.charCodeAt(i);
      hash = hash >>> 0;
    }
    return hash;
  }
}
