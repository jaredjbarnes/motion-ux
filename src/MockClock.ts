import { IClock, TickCallback } from "./IClock";

export default class MockClock implements IClock {
  private requests: Map<TickCallback, TickCallback>;
  private time: any;

  constructor() {
    this.requests = new Map();
    this.time = 0;
  }

  register(callback: TickCallback) {
    this.requests.set(callback, callback);
  }

  unregister(callback: TickCallback) {
    this.requests.delete(callback);
  }

  now() {
    return this.time;
  }

  setTime(time: number) {
    if (time > this.time) {
      this.time = time;
    }
  }

  tick(time: number) {
    this.setTime(time);
    this.requests.forEach((callback) => {
      callback();
    });
  }
}
