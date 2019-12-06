export default class MockClock {
  constructor() {
    this.requests = new Map();
    this.idCount = 1;
    this.time = 0;
  }
  requestAnimationFrame(callback) {
    const id = this.idCount;
    this.idCount++;
    this.requests.set(id, callback);

    return id;
  }

  cancelAnimationFrame(id) {
    this.requests.delete(id); 
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
