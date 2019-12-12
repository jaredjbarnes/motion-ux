"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DefaultClock = _interopRequireDefault(require("./DefaultClock.js"));

var _Scrubber = _interopRequireDefault(require("./Scrubber.js"));

var _AnimatorCreator = _interopRequireDefault(require("./AnimatorCreator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.adjustmentAnimators = [];
    this.render = this.render.bind(this);
    this.scrubber = new _Scrubber.default({
      clock: clock,
      duration: duration,
      render: this.render
    });
    this.duration = duration;
    this.animators = new _AnimatorCreator.default(animations).getAnimators();
  }

  _createClass(Timeline, [{
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
      var progress = this.progress;
      var values = this.getValuesAt(progress);
      return values;
    }
  }, {
    key: "getCurrentValues",
    value: function getCurrentValues() {
      return this.getValuesAt(this.progress);
    }
  }, {
    key: "getValuesAt",
    value: function getValuesAt(progress) {
      var _this = this;

      var results = {};
      this.animators.filter(function (animator) {
        var animation = results[animator.options.name];

        if (animation == null) {
          animation = results[animator.options.name] = {};
        }

        if (animation[animator.options.property] == null) {
          animation[animator.options.property] = animator.options.from;
        }

        return animator.options.startAt <= progress;
      }).forEach(function (animator) {
        var animation = results[animator.options.name];
        animation[animator.options.property] = animator.render(progress, _this.duration);
      });
      this.animators.filter(function (animator) {
        var min = Math.max(animator.options.startAt, progress);
        var max = Math.min(animator.options.endAt, progress);
        return min <= max;
      }).forEach(function (animator) {
        var animation = results[animator.options.name];
        animation[animator.options.property] = animator.render(progress, _this.duration);
      });
      return results;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.scrubber.dispose();
    }
  }, {
    key: "observeTime",
    value: function observeTime() {
      return this.scrubber.observeTime.apply(this.scrubber, arguments);
    }
  }, {
    key: "observe",
    value: function observe() {
      return this.scrubber.observe.apply(this.scrubber, arguments);
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
  }, {
    key: "progress",
    get: function get() {
      return this.scrubber.progress;
    }
  }]);

  return Timeline;
}();

exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map