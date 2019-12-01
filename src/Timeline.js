import DefaultClock from "./DefaultClock.js";
import TimelineOption from "./TimelineOption.js";
import Scrubber from "./Scrubber.js";
import AnimatorCreator from "./AnimatorCreator.js";

const defaultClock = new DefaultClock();

export default class Timeline {
  static get repeatDirections() {
    return Scrubber.repeatDirections;
  }

  constructor({ animations, duration, clock = defaultClock }) {
    this.clock = clock;
    this.adjustmentAnimators = [];
    this.render = this.render.bind(this);
    this.scrubber = new Scrubber({
      clock,
      duration,
      render: this.render
    });
    this.duration = duration;
    this.animators = new AnimatorCreator(animations).getAnimators();
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

    Array.from(values.keys()).forEach(target => {
      const changes = values.get(target);

      Object.keys(changes).forEach(key => {
        target[key] = changes[key];
      });
    });
  }

  getCurrentValues() {
    return this.getValuesAt(this.progress);
  }

  getValuesAt(progress) {
    const results = new Map();

    this.animators
      .filter(animator => {
        return animator.options.startAt <= progress;
      })
      .forEach(animator => {
        if (!results.has(animator.options.target)) {
          results.set(animator.options.target, {});
        }

        const changes = results.get(animator.options.target);
        changes[animator.options.name] = animator.render(
          progress,
          this.duration
        );
      });

    this.animators
      .filter(animator => {
        const min = Math.max(animator.options.startAt, progress);
        const max = Math.min(animator.options.endAt, progress);

        return min <= max;
      })
      .forEach(animator => {
        if (!results.has(animator.options.target)) {
          results.set(animator.options.target, {});
        }

        const changes = results.get(animator.options.target);
        changes[animator.options.name] = animator.render(
          progress,
          this.duration
        );
      });

    return results;
  }

  observeTime() {
    this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    this.scrubber.observe.apply(this.scrubber, arguments);
  }
}
