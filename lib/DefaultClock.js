"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DefaultClock =
/*#__PURE__*/
function () {
  function DefaultClock() {
    _classCallCheck(this, DefaultClock);

    this.registeredCallbacks = new Map();
    this._tick = this._tick.bind(this);
    this.animationFrame = null;
  }

  _createClass(DefaultClock, [{
    key: "_tick",
    value: function _tick() {
      this.registeredCallbacks.forEach(function (callback) {
        callback();
      });

      if (this.registeredCallbacks.size > 0) {
        this.animationFrame = requestAnimationFrame(this._tick);
      } else {
        this.animationFrame = null;
      }
    }
  }, {
    key: "register",
    value: function register(callback) {
      this.registeredCallbacks.set(callback, callback);

      if (this.animationFrame == null) {
        this._tick();
      }
    }
  }, {
    key: "unregister",
    value: function unregister(callback) {
      this.registeredCallbacks.delete(callback);
    }
  }, {
    key: "now",
    value: function now() {
      return performance.now();
    }
  }]);

  return DefaultClock;
}();

exports.default = DefaultClock;
//# sourceMappingURL=DefaultClock.js.map