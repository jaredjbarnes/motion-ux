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
        (animator.options.target[animator.options.name] = animator.render(this.scrubber.progress, this.duration))
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
