"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.sort");

var _DefaultClock = _interopRequireDefault(require("./DefaultClock.js"));

var _AnimationOptions = _interopRequireDefault(require("./AnimationOptions.js"));

var _Scrubber = _interopRequireDefault(require("./Scrubber.js"));

var _getAnimator = _interopRequireDefault(require("./animators/getAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultClock = new _DefaultClock.default();

class Timeline {
  static get repeatDirections() {
    return _Scrubber.default.repeatDirections;
  }

  constructor(_ref) {
    let {
      animations,
      duration,
      clock = defaultClock
    } = _ref;
    this.clock = clock;
    this.animations = animations;
    this.animationOptions = [];
    this.render = this.render.bind(this);
    this.scrubber = new _Scrubber.default({
      clock,
      duration,
      render: this.render
    });
    this.duration = duration;

    this._assertAnimations();

    this._convertAnimations();

    this._createAnimators();
  }

  _assertAnimations() {
    if (!Array.isArray(this.animations)) {
      throw new Error("Expected animations to be an array.");
    }
  }

  _convertAnimations() {
    this.animationOptions = this.animations.map(animation => new _AnimationOptions.default(animation));
  }

  _createAnimators() {
    this.animationOptions.sort((a, b) => {
      return a.startAt - b.startAt;
    });
    this.animators = this.animationOptions.map(options => {
      const Animator = (0, _getAnimator.default)(options);

      if (Animator == null) {
        throw new Error("Cannot Animate Property: Unknown property, \"".concat(options.name, "\"."));
      }

      return new Animator(options);
    });
  }

  get duration() {
    return this.scrubber.duration;
  }

  set duration(value) {
    this.scrubber.duration = value;
  }

  get timeScale() {
    return this.scrubber.timeScale;
  }

  set timeScale(value) {
    this.scrubber.timeScale = value;
  }

  get repeat() {
    return this.scrubber.repeat;
  }

  set repeat(value) {
    this.scrubber.repeat = value;
  }

  get repeatDirection() {
    return this.scrubber.repeatDirection;
  }

  set repeatDirection(value) {
    this.scrubber.repeatDirection = value;
  }

  play() {
    this.scrubber.play();
  }

  reverse() {
    this.scrubber.reverse();
  }

  stop() {
    this.scrubber.stop();
  }

  seek(progress) {
    this.scrubber.seek(progress);
  }

  render() {
    const progress = this.scrubber.progress;
    this.animators.filter(animator => {
      return animator.options.startAt <= progress;
    }).forEach(animator => animator.render(this.scrubber.progress, this.duration));
    this.animators.filter(animator => {
      const min = Math.max(animator.options.startAt, progress);
      const max = Math.min(animator.options.endAt, progress);
      return min <= max;
    }).forEach(animator => animator.render(this.scrubber.progress, this.duration));
  }

  observeTime() {
    this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    this.scrubber.observe.apply(this.scrubber, arguments);
  }

}

exports.default = Timeline;