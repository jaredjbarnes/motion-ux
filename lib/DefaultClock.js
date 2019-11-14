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
  }

  _createClass(DefaultClock, [{
    key: "requestAnimationFrame",
    value: function (_requestAnimationFrame) {
      function requestAnimationFrame(_x) {
        return _requestAnimationFrame.apply(this, arguments);
      }

      requestAnimationFrame.toString = function () {
        return _requestAnimationFrame.toString();
      };

      return requestAnimationFrame;
    }(function (callback) {
      return requestAnimationFrame(callback);
    })
  }, {
    key: "cancelAnimationFrame",
    value: function (_cancelAnimationFrame) {
      function cancelAnimationFrame(_x2) {
        return _cancelAnimationFrame.apply(this, arguments);
      }

      cancelAnimationFrame.toString = function () {
        return _cancelAnimationFrame.toString();
      };

      return cancelAnimationFrame;
    }(function (id) {
      return cancelAnimationFrame(id);
    })
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