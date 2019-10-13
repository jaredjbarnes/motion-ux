"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer = _interopRequireDefault(require("./Observer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimeObserver extends _Observer.default {
  constructor(time, callback, unbind) {
    super(null, callback, unbind);
    this.time = time;
  }

  notify(event) {
    if (typeof event.lastProgress === "number" && typeof event.progress === "number") {
      const high = Math.max(event.progress, event.lastProgress);
      const low = Math.min(event.progress, event.lastProgress);

      if (this.time >= low && this.time <= high) {
        this.callback(event);
      }
    }
  }

}

exports.default = TimeObserver;