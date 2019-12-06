"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer = _interopRequireDefault(require("./Observer.js"));

var _TimeObserver = _interopRequireDefault(require("./TimeObserver.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Observable =
/*#__PURE__*/
function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.observers = [];
  }

  _createClass(Observable, [{
    key: "observeTime",
    value: function observeTime(time, callback) {
      var _this = this;

      var observer = new _TimeObserver.default(time, callback, function () {
        var index = _this.observers.indexOf(observer);

        if (index > -1) {
          _this.observers.splice(index, 1);
        }
      });
      this.observers.push(observer);
      return observer;
    }
  }, {
    key: "observe",
    value: function observe(type, callback) {
      var _this2 = this;

      var observer = new _Observer.default(type, callback, function () {
        var index = _this2.observers.indexOf(observer);

        if (index > -1) {
          _this2.observers.splice(index, 1);
        }
      });
      this.observers.push(observer);
      return observer;
    }
  }, {
    key: "notify",
    value: function notify(event) {
      this.observers.forEach(function (observer) {
        observer.notify(event);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.observers = [];
    }
  }]);

  return Observable;
}();

exports.default = Observable;
//# sourceMappingURL=Observable.js.map