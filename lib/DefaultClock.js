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
    this.count = 1;
    this.animationFrame = null;
  }

  _createClass(DefaultClock, [{
    key: "tickIfNecessary",
    value: function tickIfNecessary() {
      var _this = this;

      if (this.animationFrame == null) {
        this.animationFrame = null;
        this.animationFrame = this.requestAnimationFrame(function () {
          _this.registeredCallbacks.forEach(function (callback) {
            callback();
          });

          if (_this.registeredCallbacks.size > 0) {
            _this.tickIfNecessary();
          }
        });
      }
    }
  }, {
    key: "stopIfNecessary",
    value: function stopIfNecessary() {
      if (this.registeredCallbacks.size <= 0) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    }
  }, {
    key: "requestAnimationFrame",
    value: function requestAnimationFrame(callback) {
      var id = this.count++;
      this.registeredCallbacks.set(id, callback);
      this.tickIfNecessary();
      return id;
    }
  }, {
    key: "cancelAnimationFrame",
    value: function cancelAnimationFrame(id) {
      this.registeredCallbacks.delete(id);
      this.stopIfNecessary();
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