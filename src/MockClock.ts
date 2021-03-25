import { IClock, TickCallback } from "./IClock";

export default class MockClock implements IClock {
  private requests: any;
  private idCount: any;
  private time: any;

  constructor() {
    this.requests = new Map();
    this.idCount = 1;
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

    this.requests.values().forEach((callback) => {
      callback();
    });
  }
}