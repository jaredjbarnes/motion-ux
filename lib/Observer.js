"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var states = {
  ACTIVE: 1,
  STOPPED: 0,
  DISPOSED: -1
};

var Observer =
/*#__PURE__*/
function () {
  function Observer(type, callback, unbind) {
    _classCallCheck(this, Observer);

    this.type = type;
    this.callback = callback;
    this.unbind = unbind;
    this.state = states.ACTIVE;
  }

  _createClass(Observer, [{
    key: "notify",
    value: function notify(event) {
      if (event.type === this.type) {
        this.callback(event);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.state === states.ACTIVE) {
        this.state = states.STOPPED;
      }
    }
  }, {
    key: "start",
    value: function start() {
      if (this.state !== states.DISPOSED) {
        this.state = states.ACTIVE;
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.state = states.DISPOSED;
      this.unbind();
    }
  }]);

  return Observer;
}();

exports.default = Observer;
//# sourceMappingURL=Observer.js.map