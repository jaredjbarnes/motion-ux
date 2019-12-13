"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MockClock =
/*#__PURE__*/
function () {
  function MockClock() {
    _classCallCheck(this, MockClock);

    this.requests = new Map();
    this.idCount = 1;
    this.time = 0;
  }

  _createClass(MockClock, [{
    key: "register",
    value: function register(callback) {
      this.requests.set(callback, callback);
    }
  }, {
    key: "unregister",
    value: function unregister(callback) {
      this.requests.delete(callback);
    }
  }, {
    key: "now",
    value: function now() {
      return this.time;
    }
  }, {
    key: "setTime",
    value: function setTime(time) {
      if (time > this.time) {
        this.time = time;
      }
    }
  }, {
    key: "tick",
    value: function tick(time) {
      this.setTime(time);
      this.requests.values().forEach(function (callback) {
        callback();
      });
    }
  }]);

  return MockClock;
}();

exports.default = MockClock;
//# sourceMappingURL=MockClock.js.map