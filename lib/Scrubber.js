"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observable2 = _interopRequireDefault(require("./Observable.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var repeatDirections = {
  DEFAULT: 0,
  ALTERNATE: 1
};
var states = {
  FORWARD: 1,
  REVERSE: -1,
  STOPPED: 0
};

var Scrubber =
/*#__PURE__*/
function (_Observable) {
  _inherits(Scrubber, _Observable);

  _createClass(Scrubber, null, [{
    key: "repeatDirections",
    get: function get() {
      return repeatDirections;
    }
  }, {
    key: "states",
    get: function get() {
      return states;
    }
  }]);

  function Scrubber(_ref) {
    var _this;

    var clock = _ref.clock,
        duration = _ref.duration,
        timeScale = _ref.timeScale,
        render = _ref.render,
        _ref$repeatDirection = _ref.repeatDirection,
        repeatDirection = _ref$repeatDirection === void 0 ? Scrubber.repeatDirections.DEFAULT : _ref$repeatDirection;

    _classCallCheck(this, Scrubber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scrubber).call(this));
    _this._timeScale = 1;
    _this._progress = 0;
    _this._duration = 0;
    _this._lastTimestamp = 0;
    _this._animationFrame = null;
    _this._iterations = 0;
    _this._repeat = 1;
    _this._repeatDirection = repeatDirection;
    _this.clock = clock;
    _this.state = Scrubber.states.STOPPED;
    _this.timeScale = timeScale;
    _this.duration = duration;
    _this.render = render;
    return _this;
  }

  _createClass(Scrubber, [{
    key: "play",
    value: function play() {
      if (this.state !== Scrubber.states.FORWARD) {
        this.notify({
          type: "PLAYED"
        });
        this._lastTimestamp = this.clock.now();
        this.state = Scrubber.states.FORWARD;

        this._loop();
      }
    }
  }, {
    key: "_loop",
    value: function _loop() {
      var _this2 = this;

      this.clock.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = this.clock.requestAnimationFrame(function () {
        _this2._loop();

        _this2.tick();
      });
    }
  }, {
    key: "tick",
    value: function tick() {
      var timestamp = this.clock.now();
      var deltaTime = timestamp - this._lastTimestamp;
      var step = deltaTime / this.duration * this._timeScale;

      if (step > 1) {
        step = 1;
      }

      if (deltaTime === 0) {
        return;
      }

      if (this.state === Scrubber.states.REVERSE) {
        var progress = this._progress - step;
        var repeatDirection = this.repeatDirection;
        var ALTERNATE = Scrubber.repeatDirections.ALTERNATE;

        if (progress <= 0) {
          this._iterations++;

          if (this._iterations >= this._repeat) {
            this.seek(0);
            this.stop();
            return;
          }

          if (repeatDirection === ALTERNATE) {
            progress = progress * -1;
            this.seek(progress);
            this.state = Scrubber.states.FORWARD;
          } else {
            progress = 1 + progress;
            this.seek(progress);
            this.state = Scrubber.states.REVERSE;
          }
        } else {
          this.seek(progress);
        }
      } else if (this.state === Scrubber.states.FORWARD) {
        var _progress = this._progress + step;

        var _repeatDirection = this.repeatDirection;
        var _ALTERNATE = Scrubber.repeatDirections.ALTERNATE;

        if (_progress >= 1) {
          this._iterations++;

          if (this._iterations >= this._repeat) {
            this.seek(1);
            this.stop();
            return;
          }

          if (_repeatDirection === _ALTERNATE) {
            _progress = 1 - (_progress - 1);
            this.seek(_progress);
            this.state = Scrubber.states.REVERSE;
          } else {
            _progress = _progress - 1;
            this.seek(_progress);
            this.state = Scrubber.states.FORWARD;
          }
        } else {
          this.seek(_progress);
        }
      }

      this._lastTimestamp = timestamp;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.state !== Scrubber.states.STOPPED) {
        this.notify({
          type: "STOPPED"
        });
        this.state = Scrubber.states.STOPPED;
      }

      this.clock.cancelAnimationFrame(this._animationFrame);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      if (this.state !== Scrubber.states.REVERSE) {
        this.notify({
          type: "REVERSED"
        });
        this._lastTimestamp = this.clock.now();
        this.state = Scrubber.states.REVERSE;

        this._loop();
      }
    }
  }, {
    key: "seek",
    value: function seek(progress) {
      var lastProgress = this._progress;
      this._progress = progress;
      var animations = this.render();
      this.notify({
        type: "RENDER",
        progress: progress,
        lastProgress: lastProgress,
        animations: animations
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.stop();

      _get(_getPrototypeOf(Scrubber.prototype), "dispose", this).call(this);
    }
  }, {
    key: "progress",
    get: function get() {
      return this._progress;
    }
  }, {
    key: "timeScale",
    get: function get() {
      return this._timeScale;
    },
    set: function set(value) {
      if (value > 0) {
        this._timeScale = value;
      }
    }
  }, {
    key: "duration",
    get: function get() {
      return this._duration;
    },
    set: function set(value) {
      if (typeof value !== "number") {
        value = 0;
      } // Virtually Nothing.


      if (value === 0 || value < 0) {
        value = 0.00001;
      }

      this._duration = value;
    }
  }, {
    key: "repeat",
    get: function get() {
      return this._repeat;
    },
    set: function set(value) {
      if (typeof value !== "number" && value > 0) {
        return;
      }

      this._repeat = value;
    }
  }, {
    key: "repeatDirection",
    get: function get() {
      return this._repeatDirection;
    },
    set: function set(value) {
      if (value !== 0 & value !== 1) {
        return;
      }

      this._repeatDirection = value;
    }
  }]);

  return Scrubber;
}(_Observable2.default);

exports.default = Scrubber;
//# sourceMappingURL=Scrubber.js.map