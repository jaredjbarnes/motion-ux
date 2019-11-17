"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DefaultClock = _interopRequireDefault(require("./DefaultClock.js"));

var _TimelineOption = _interopRequireDefault(require("./TimelineOption.js"));

var _Scrubber = _interopRequireDefault(require("./Scrubber.js"));

var _ValuesNodeAnimator = _interopRequireDefault(require("./animators/ValuesNodeAnimator.js"));

var _values = _interopRequireDefault(require("./patterns/values.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultClock = new _DefaultClock.default();

var Timeline =
/*#__PURE__*/
function () {
  _createClass(Timeline, null, [{
    key: "repeatDirections",
    get: function get() {
      return _Scrubber.default.repeatDirections;
    }
  }]);

  function Timeline(_ref) {
    var animations = _ref.animations,
        duration = _ref.duration,
        _ref$clock = _ref.clock,
        clock = _ref$clock === void 0 ? defaultClock : _ref$clock;

    _classCallCheck(this, Timeline);

    this.clock = clock;
    this.animations = animations;
    this.animationOptions = [];
    this.render = this.render.bind(this);
    this.scrubber = new _Scrubber.default({
      clock: clock,
      duration: duration,
      render: this.render
    });
    this.duration = duration;

    this._assertAnimations();

    this._convertAnimations();

    this._createAnimators();
  }

  _createClass(Timeline, [{
    key: "_assertAnimations",
    value: function _assertAnimations() {
      if (!Array.isArray(this.animations)) {
        throw new Error("Expected animations to be an array.");
      }
    }
  }, {
    key: "_convertAnimations",
    value: function _convertAnimations() {
      this.animationOptions = this.animations.map(function (animation) {
        return new _TimelineOption.default(animation);
      });
    }
  }, {
    key: "_createAnimators",
    value: function _createAnimators() {
      this.animationOptions.sort(function (a, b) {
        return a.startAt - b.startAt;
      });
      this.animators = this.animationOptions.map(function (options) {
        var fromNode;
        var toNode;

        try {
          fromNode = _values.default.parse(new _clarityPatternParser.Cursor(options.from));
          toNode = _values.default.parse(new _clarityPatternParser.Cursor(options.to));
        } catch (error) {
          throw new Error("Parse Error: could not parse css ".concat(options.to, ", or ").concat(options.from));
        }

        return new _ValuesNodeAnimator.default(_objectSpread({}, options, {
          fromNode: fromNode,
          toNode: toNode
        }));
      });
    }
  }, {
    key: "play",
    value: function play() {
      this.scrubber.play();
    }
  }, {
    key: "reverse",
    value: function reverse() {
      this.scrubber.reverse();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.scrubber.stop();
    }
  }, {
    key: "seek",
    value: function seek(progress) {
      this.scrubber.seek(progress);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var progress = this.scrubber.progress;
      this.animators.filter(function (animator) {
        return animator.options.startAt <= progress;
      }).forEach(function (animator) {
        return animator.render(_this.scrubber.progress, _this.duration);
      });
      this.animators.filter(function (animator) {
        var min = Math.max(animator.options.startAt, progress);
        var max = Math.min(animator.options.endAt, progress);
        return min <= max;
      }).forEach(function (animator) {
        return animator.options.target[animator.options.name] = animator.render(_this.scrubber.progress, _this.duration);
      });
    }
  }, {
    key: "observeTime",
    value: function observeTime() {
      this.scrubber.observeTime.apply(this.scrubber, arguments);
    }
  }, {
    key: "observe",
    value: function observe() {
      this.scrubber.observe.apply(this.scrubber, arguments);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.scrubber.duration;
    },
    set: function set(value) {
      this.scrubber.duration = value;
    }
  }, {
    key: "timeScale",
    get: function get() {
      return this.scrubber.timeScale;
    },
    set: function set(value) {
      this.scrubber.timeScale = value;
    }
  }, {
    key: "repeat",
    get: function get() {
      return this.scrubber.repeat;
    },
    set: function set(value) {
      this.scrubber.repeat = value;
    }
  }, {
    key: "repeatDirection",
    get: function get() {
      return this.scrubber.repeatDirection;
    },
    set: function set(value) {
      this.scrubber.repeatDirection = value;
    }
  }]);

  return Timeline;
}();

exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map