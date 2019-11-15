import DefaultClock from "./DefaultClock.js";
import TimelineOption from "./TimelineOption.js";
import Scrubber from "./Scrubber.js";
import ValuesNodeAnimator from "./animators/ValuesNodeAnimator.js";
import values from "./patterns/values.js";
import { Cursor } from "../node_modules/clarity-pattern-parser/src/index.js";

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
      animation => new TimelineOption(animation)
    );
  }

  _createAnimators() {
    this.animationOptions.sort((a, b) => {
      return a.startAt - b.startAt;
    });

    this.animators = this.animationOptions.map(options => {
      let fromNode;
      let toNode;

      try {
        fromNode = values.parse(new Cursor(options.from));
        toNode = values.parse(new Cursor(options.to));
      } catch (error) {
        throw new Error(
          `Parse Error: could not parse css ${options.to}, or ${options.from}`
        );
      }

      return new ValuesNodeAnimator({
        ...options,
        fromNode,
        toNode
      });
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
      .forEach(
        animator =>
          (animator.options.target[animator.options.name] = animator.render(
            this.scrubber.progress,
            this.duration
          ))
      );
  }

  observeTime() {
    this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    this.scrubber.observe.apply(this.scrubber, arguments);
  }
}
