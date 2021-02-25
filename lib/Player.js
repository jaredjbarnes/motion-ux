"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observable2 = _interopRequireDefault(require("./Observable.js"));

var _DefaultClock = _interopRequireDefault(require("./DefaultClock.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var defaultClock = new _DefaultClock.default();
var DEFAULT = 0;
var ALTERNATE = 1;
var FORWARD = 1;
var REVERSE = -1;
var STOPPED = 0;
var repeatDirections = {
  DEFAULT: DEFAULT,
  ALTERNATE: ALTERNATE
};
var states = {
  FORWARD: FORWARD,
  REVERSE: REVERSE,
  STOPPED: STOPPED
};

var Player =
/*#__PURE__*/
function (_Observable) {
  _inherits(Player, _Observable);

  function Player(timeline, _ref) {
    var _this;

    var clock = _ref.clock,
        duration = _ref.duration,
        timeScale = _ref.timeScale,
        repeatDirection = _ref.repeatDirection;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this));
    _this._timeScale = typeof timeScale === "number" ? timeScale : 1;
    _this._time = 0;
    _this._step = 0;
    _this._duration = duration;
    _this._lastTimestamp = 0;
    _this._animationFrame = null;
    _this._iterations = 0;
    _this._repeat = 1;
    _this._repeatDirection = typeof repeatDirection === "number" ? repeatDirection : DEFAULT;
    _this._timeline = timeline;
    _this._clock = clock || defaultClock;
    _this._state = STOPPED;
    _this.tick = _this.tick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Player, [{
    key: "play",
    value: function play() {
      if (this._state !== FORWARD) {
        this._lastTimestamp = this._clock.now();
        this._state = FORWARD;

        this._clock.register(this.tick);

        this.notify({
          type: "PLAYED",
          timeline: this._timeline
        });
      }
    }
  }, {
    key: "tick",
    value: function tick() {
      var timestamp = this._clock.now();

      var deltaTime = timestamp - this._lastTimestamp;
      this._step = deltaTime / this._duration * this._timeScale;

      if (this._step > 1) {
        this._step = 1;
      }

      if (deltaTime === 0) {
        return;
      }

      if (this._state === REVERSE) {
        this.stepBackward();
      } else if (this._state === FORWARD) {
        this.stepForward();
      }

      this._lastTimestamp = timestamp;
    }
  }, {
    key: "stepForward",
    value: function stepForward() {
      var time = this._time + this._step;
      var repeatDirection = this._repeatDirection;

      if (time >= 1) {
        this._iterations++;

        if (this._iterations >= this._repeat) {
          this.seek(1);
          this.stop();
          return;
        }

        if (repeatDirection === ALTERNATE) {
          time = 1 - (time - 1);
          this.seek(time);
          this._state = REVERSE;
        } else {
          time = time - 1;
          this.seek(time);
          this._state = FORWARD;
        }
      } else {
        this.seek(time);
      }
    }
  }, {
    key: "setBackward",
    value: function setBackward() {
      var time = this._time - this._step;
      var repeatDirection = this._repeatDirection;

      if (time <= 0) {
        this._iterations++;

        if (this._iterations >= this._repeat) {
          this.seek(0);
          this.stop();
          return;
        }

        if (repeatDirection === ALTERNATE) {
          time = time * -1;
          this.seek(time);
          this._state = FORWARD;
        } else {
          time = 1 + time;
          this.seek(time);
          this._state = REVERSE;
        }
      } else {
        this.seek(time);
      }
    }
  }, {
    key: "seek",
    value: function seek(time) {
      var lastTime = this._time;
      this._time = time;

      this._timeline.render(this._time);

      this.notify({
        type: "RENDER",
        time: time,
        lastTime: lastTime,
        timeline: this._timeline
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._state !== STOPPED) {
        this._state = STOPPED;

        this._clock.unregister(this.tick);

        this.notify({
          type: "STOPPED",
          timeline: this._timeline
        });
      }
    }
  }, {
    key: "reverse",
    value: function reverse() {
      if (this._state !== REVERSE) {
        this._lastTimestamp = this._clock.now();
        this._state = REVERSE;

        this._clock.register(this.tick);

        this.notify({
          type: "REVERSED",
          timeline: this._timeline
        });
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.stop();

      _get(_getPrototypeOf(Player.prototype), "dispose", this).call(this);
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
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
      } // Virtually Nothing. All Math blows up if the duration is "0".


      if (value <= 0) {
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
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "timeline",
    get: function get() {
      return this._timeline;
    },
    set: function set(timeline) {
      if (typeof timeline.render === "function") {
        this._timeline = timeline;
      }
    }
  }], [{
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

  return Player;
}(_Observable2.default);

exports.default = Player;
//# sourceMappingURL=Player.js.map