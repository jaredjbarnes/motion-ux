export default class DefaultClock {
  constructor() {
    this.registeredCallbacks = new Map();
    this._tick = this._tick.bind(this);
    this.animationFrame = null;
  }

  _tick() {
    this.registeredCallbacks.forEach(callback => {
      callback();
    });

    this.animationFrame = requestAnimationFrame(this._tick);
  }

  register(callback) {
    this.registeredCallbacks.set(callback, callback);

    if (this.animationFrame == null) {
      this._tick();
    }
  }

  unregister(callback) {
    this.registeredCallbacks.delete(callback);

    if (this.registeredCallbacks.size <= 0) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  now() {
    return performance.now();
  }
}
