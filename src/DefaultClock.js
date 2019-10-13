export default class DefaultClock {
  requestAnimationFrame(callback) {
    return requestAnimationFrame(callback);
  }

  cancelAnimationFrame(id) {
    return cancelAnimationFrame(id);
  }

  now() {
    return performance.now();
  }
}
