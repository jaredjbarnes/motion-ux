"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class DefaultClock {
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

exports.default = DefaultClock;