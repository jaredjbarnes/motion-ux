export default class DefaultClock {
  constructor() {
    this.registeredCallbacks = new Map();
    this.count = 1;
    this.animationFrame = null;
  }

  tickIfNecessary() {
    if (this.animationFrame == null) {
      this.animationFrame = null;

      this.animationFrame = this.requestAnimationFrame(() => {
        this.registeredCallbacks.forEach(callback => {
          callback();
        });
        if (this.registeredCallbacks.size > 0) {
          this.tickIfNecessary();
        }
      });
    }
  }

  stopIfNecessary() {
    if (this.registeredCallbacks.size <= 0){
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  requestAnimationFrame(callback) {
    const id = count++;
    this.registeredCallbacks.set(id, callback);
    this.tickIfNecessary();
    return id;
  }

  cancelAnimationFrame(id) {
    this.registeredCallbacks.delete(id);
    this.stopIfNecessary();
  }

  now() {
    return performance.now();
  }
}
