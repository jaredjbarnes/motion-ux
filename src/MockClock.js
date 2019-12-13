export default class MockClock {
  constructor() {
    this.requests = new Map();
    this.idCount = 1;
    this.time = 0;
  }

  register(callback) {
    this.requests.set(callback, callback);
  }

  unregister(callback) {
    this.requests.delete(callback); 
  }

  now() {
    return this.time;
  }

  setTime(time) {
    if (time > this.time) {
      this.time = time;
    }
  }

  tick(time) {
    this.setTime(time);

    this.requests.values().forEach((callback) => {
        callback();
    });
  }
}
