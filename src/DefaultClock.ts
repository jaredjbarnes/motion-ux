import {IClock, TickCallback} from "./IClock";

export default class DefaultClock implements IClock {
  public registeredCallbacks: Map<TickCallback, TickCallback>;
  public animationFrame: any;

  constructor() {
    this.registeredCallbacks = new Map();
    this._tick = this._tick.bind(this);
    this.animationFrame = null;
  }

  _tick() {
    this.registeredCallbacks.forEach((callback) => {
      callback();
    });

    if (this.registeredCallbacks.size > 0) {
      this.animationFrame = window.requestAnimationFrame(this._tick);
    } else {
      this.animationFrame = null;
    }
  }

  register(callback: TickCallback) {
    this.registeredCallbacks.set(callback, callback);

    if (this.animationFrame == null) {
      this._tick();
    }
  }

  unregister(callback: TickCallback) {
    this.registeredCallbacks.delete(callback);
  }

  now() {
    return performance.now();
  }
}
