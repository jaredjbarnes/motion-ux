import DefaultClock from "./DefaultClock.js";
import Scrubber from "./Scrubber.js";
import Animator from "./Animator.js";
import Animation from "./Animation.js";

const defaultClock = new DefaultClock();

export default class Timeline {
  static get repeatDirections() {
    return Scrubber.repeatDirections;
  }

  constructor({ animations, duration, clock = defaultClock }) {
    this.clock = clock;
    this.render = this.render.bind(this);
    this.scrubber = new Scrubber({
      clock,
      duration,
      render: this.render,
    });
    this.duration = duration;
    this.animators = animations.map(
      (animation) => new Animator(new Animation(animation))
    );
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

  get progress() {
    return this.scrubber.progress;
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
    const progress = this.progress;
    const values = this.getValuesAt(progress);
    return values;
  }

  getCurrentValues() {
    return this.getValuesAt(this.progress);
  }

  getValuesAt(progress) {
    const results = {};

    this.animators
      .filter((animator) => {
        let animation = results[animator.animation.name];

        if (animation == null) {
          animation = results[animator.animation.name] = {};
        }

        if (animation[animator.animation.property] == null) {
          animation[animator.animation.property] = animator.animation.from;
        }

        return animator.animation.startAt <= progress;
      })
      .forEach((animator) => {
        const animation = results[animator.animation.name];
        animation[animator.animation.property] = animator.render(progress);
      });

    this.animators
      .filter((animator) => {
        const min = Math.max(animator.animation.startAt, progress);
        const max = Math.min(animator.animation.endAt, progress);

        return min <= max;
      })
      .forEach((animator) => {
        const animation = results[animator.animation.name];
        animation[animator.animation.property] = animator.render(progress);
      });

    return results;
  }

  dispose() {
    this.scrubber.dispose();
  }

  observeTime() {
    return this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    return this.scrubber.observe.apply(this.scrubber, arguments);
  }
}
