import Observable from "./Observable.js";
import DefaultClock from "./DefaultClock.js";
import Animator from "./Animator.js";
import Animation from "./Animation.js";

const defaultClock = new DefaultClock();

const repeatDirections = {
  DEFAULT: 0,
  ALTERNATE: 1,
};

const states = {
  FORWARD: 1,
  REVERSE: -1,
  STOPPED: 0,
};

const sortDesc = (animatorA, animatorB) => {
  return animatorB.animation.startAt - animatorA.animation.startAt;
};

const sortAsc = (animatorA, animatorB) => {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

export default class Timeline extends Observable {
  static get repeatDirections() {
    return repeatDirections;
  }

  static get states() {
    return states;
  }

  constructor({
    animations,
    clock,
    duration,
    timeScale,
    repeatDirection = Timeline.repeatDirections.DEFAULT,
  }) {
    super();
    this._timeScale = 1;
    this._progress = 0;
    this._duration = 0;
    this._lastTimestamp = 0;
    this._animationFrame = null;
    this._iterations = 0;
    this._repeat = 1;
    this._repeatDirection = repeatDirection;
    this.tick = this.tick.bind(this);
    this.currentValues = {};
    this.initialValues = {};

    this.clock = clock || defaultClock;
    this.state = Timeline.states.STOPPED;
    this.timeScale = timeScale;
    this.duration = duration;

    this.animators = animations.map(
      (animation) => new Animator(new Animation(animation))
    );

    this.createCurrentValues();
    this.createInitialValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  get progress() {
    return this._progress;
  }

  get timeScale() {
    return this._timeScale;
  }

  set timeScale(value) {
    if (value > 0) {
      this._timeScale = value;
    }
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    if (typeof value !== "number") {
      value = 0;
    }

    // Virtually Nothing. All Math blows up if the duration is "0".
    if (value <= 0) {
      value = 0.00001;
    }

    this._duration = value;
  }

  get repeat() {
    return this._repeat;
  }

  set repeat(value) {
    if (typeof value !== "number" && value > 0) {
      return;
    }

    this._repeat = value;
  }

  get repeatDirection() {
    return this._repeatDirection;
  }

  set repeatDirection(value) {
    if ((value !== 0) & (value !== 1)) {
      return;
    }

    this._repeatDirection = value;
  }

  createCurrentValues() {
    this.currentValues = this.animators.reduce((results, animator) => {
      let animation = results[animator.animation.name];

      if (animation == null) {
        animation = results[animator.animation.name] = {};
      }

      if (animation[animator.animation.property] == null) {
        animation[animator.animation.property] = animator.animation.from;
      }

      return results;
    }, {});
  }

  createInitialValues() {
    this.animators.sort(sortDesc);

    this.initialValues = this.animators.reduce((results, animator) => {
      let animation = results[animator.animation.name];

      if (animation == null) {
        animation = results[animator.animation.name] = {};
      }

      animation[animator.animation.property] = animator.animation.from;

      return results;
    }, {});
  }

  applyInitialValues() {
    Object.keys(this.currentValues).forEach((animationName) => {
      Object.keys(this.currentValues[animationName]).forEach((property) => {
        this.currentValues[animationName][property] = this.initialValues[
          animationName
        ][property];
      });
    });
  }

  play() {
    if (this.state !== Timeline.states.FORWARD) {
      this._lastTimestamp = this.clock.now();
      this.state = Timeline.states.FORWARD;
      this.clock.register(this.tick);

      this.notify({
        type: "PLAYED",
      });
    }
  }

  tick() {
    const timestamp = this.clock.now();
    const deltaTime = timestamp - this._lastTimestamp;
    let step = (deltaTime / this.duration) * this._timeScale;

    if (step > 1) {
      step = 1;
    }

    if (deltaTime === 0) {
      return;
    }

    if (this.state === Timeline.states.REVERSE) {
      let progress = this._progress - step;
      const repeatDirection = this.repeatDirection;
      const ALTERNATE = Timeline.repeatDirections.ALTERNATE;

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
          this.state = Timeline.states.FORWARD;
        } else {
          progress = 1 + progress;
          this.seek(progress);
          this.state = Timeline.states.REVERSE;
        }
      } else {
        this.seek(progress);
      }
    } else if (this.state === Timeline.states.FORWARD) {
      let progress = this._progress + step;
      const repeatDirection = this.repeatDirection;
      const ALTERNATE = Timeline.repeatDirections.ALTERNATE;

      if (progress >= 1) {
        this._iterations++;

        if (this._iterations >= this._repeat) {
          this.seek(1);
          this.stop();
          return;
        }

        if (repeatDirection === ALTERNATE) {
          progress = 1 - (progress - 1);
          this.seek(progress);
          this.state = Timeline.states.REVERSE;
        } else {
          progress = progress - 1;
          this.seek(progress);
          this.state = Timeline.states.FORWARD;
        }
      } else {
        this.seek(progress);
      }
    }

    this._lastTimestamp = timestamp;
  }

  stop() {
    if (this.state !== Timeline.states.STOPPED) {
      this.state = Timeline.states.STOPPED;
      this.clock.unregister(this.tick);

      this.notify({
        type: "STOPPED",
      });
    }
  }

  reverse() {
    if (this.state !== Timeline.states.REVERSE) {
      this._lastTimestamp = this.clock.now();
      this.state = Timeline.states.REVERSE;
      this.clock.register(this.tick);

      this.notify({
        type: "REVERSED",
      });
    }
  }

  seek(progress) {
    const lastProgress = this._progress;
    this._progress = progress;

    const animations = this.getValuesAt(progress);

    this.notify({
      type: "RENDER",
      progress: progress,
      lastProgress: lastProgress,
      animations,
    });
  }

  getValuesAt(time) {
    this.applyInitialValues();
    const results = this.currentValues;

    // Animate the values that are less than the current time.
    this.animators
      .filter((animator) => {
        return animator.animation.startAt <= time;
      })
      .forEach((animator) => {
        const animation = results[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });

    this.animators
      .filter((animator) => {
        const min = Math.max(animator.animation.startAt, time);
        const max = Math.min(animator.animation.endAt, time);

        return min <= max;
      })
      .forEach((animator) => {
        const animation = results[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });

    return results;
  }

  getCurrentValues() {
    return this.currentValues;
  }

  dispose() {
    this.stop();
    super.dispose();
  }
}
