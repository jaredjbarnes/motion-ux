"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer = _interopRequireDefault(require("./Observer.js"));

var _TimeObserver = _interopRequireDefault(require("./TimeObserver.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Observable {
  constructor() {
    this.observers = [];
  }

  observeTime(time, callback) {
    const observer = new _TimeObserver.default(time, callback, () => {
      const index = this.observers.indexOf(observer);

      if (index > -1) {
        this.observers.splice(index, 1);
      }
    });
    this.observers.push(observer);
    return observer;
  }

  observe(type, callback) {
    const observer = new _Observer.default(type, callback, () => {
      const index = this.observers.indexOf(observer);

      if (index > -1) {
        this.observers.splice(index, 1);
      }
    });
    this.observers.push(observer);
    return observer;
  }

  notify(event) {
    this.observers.forEach(observer => {
      observer.notify(event);
    });
  }

}

exports.default = Observable;