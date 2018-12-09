interface IHashMap<T> {
  get(key: string): T | undefined;
  set(key: string, item: T): void;
  toString(): string;
}

interface IBucketItem<T> {
  key: string;
  item: T;
}

// hashing with chaining
// n <= t.length
export class Hashmap<T> implements IHashMap<T> {
  private buckets: IBucketItem<T>[][] = [];
  constructor(private readonly numOfBuckets = 10_000) {
    for (let i = 0; i < numOfBuckets; i++) {
      this.buckets.push([]);
    }
  }

  public set(key: string, item: T) {
    const bucket = this.buckets[this.hash(key)];
    for (const bucketItem of bucket) {
      if (bucketItem.key === key) {
        bucketItem.item = item;
        return;
      }
    }
    bucket.push({ key, item });
  }

  public get(key: string): T | undefined {
    const bucket = this.buckets[this.hash(key)];
    const item = bucket.find(bucketItem => bucketItem.key === key);
    return item && item.item;
  }

  public toString() {
    return JSON.stringify(this.buckets);
  }

  // should be implemented via multiplicative hashing
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.numOfBuckets;
  }
}
