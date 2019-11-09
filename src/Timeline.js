import DefaultClock from "./DefaultClock.js";
import AnimationOptions from "./AnimationOptions.js";
import Scrubber from "./Scrubber.js";
import getAnimator from "./animators/getAnimator.js";

const defaultClock = new DefaultClock();

export default class Timeline {
  static get repeatDirections() {
    return Scrubber.repeatDirections;
  }

  constructor({ animations, duration, clock = defaultClock }) {
    this.clock = clock;
    this.animations = animations;
    this.animationOptions = [];
    this.render = this.render.bind(this);
    this.scrubber = new Scrubber({
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
    this.animationOptions = this.animations.map(
      animation => new AnimationOptions(animation)
    );
  }

  _createAnimators() {
    this.animationOptions.sort((a, b) => {
      return a.startAt - b.startAt;
    });

    this.animators = this.animationOptions.map(options => {
      const Animator = getAnimator(options);

      if (Animator == null) {
        throw new Error(
          `Cannot find animator for name, "${options.name}".`
        );
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

    this.animators
      .filter(animator => {
        return animator.options.startAt <= progress;
      })
      .forEach(animator =>
        animator.render(this.scrubber.progress, this.duration)
      );

    this.animators
      .filter(animator => {
        const min = Math.max(animator.options.startAt, progress);
        const max = Math.min(animator.options.endAt, progress);

        return min <= max;
      })
      .forEach(animator =>
        animator.render(this.scrubber.progress, this.duration)
      );
  }

  observeTime() {
    this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    this.scrubber.observe.apply(this.scrubber, arguments);
  }
}
