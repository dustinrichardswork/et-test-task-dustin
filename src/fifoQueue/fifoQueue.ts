/**
 * Dumb and inefficient FIFO (First In First Out) Queue implementation.
 */
export class FifoQueue<T> {
  private arr: Array<T>;

  constructor(arr?: Array<T>) {
    this.arr = arr ?? [];
  }

  push(x: T) {
    this.arr.push(x);
  }

  pushAll(arr: T[]) {
    for (const x of arr) {
      this.push(x);
    }
  }

  pop(): T | undefined {
    return this.arr.shift();
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }
}
