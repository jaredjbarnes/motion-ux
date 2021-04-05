import Observable from "./Observable";
import DefaultClock from "./DefaultClock";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";
import BlendedAnimation from "./BlendedAnimation";
import { IClock } from "./IClock";
import { EasingFunction } from "./easings";
import Animation from "./Animation";

const defaultClock = new DefaultClock();

const DEFAULT = 0;
const ALTERNATE = 1;

const FORWARD = 1;
const REVERSE = -1;
const STOPPED = 0;

const repeatDirections = {
  DEFAULT,
  ALTERNATE,
};

const states = {
  FORWARD,
  REVERSE,
  STOPPED,
};

function defaultRender() {}

export type RepeatDirection = 0 | 1;
export type States = 1 | -1 | 0;

export interface PlayerOptions {
  clock?: IClock;
  duration: number;
  repeatDirection: RepeatDirection;
  states: States;
  timeScale: number;
  render: ()=>void;
}

export default class Player extends Observable {
	public _timeScale: number;
	public _time: number;
	public _step: any;
	public _duration: number;
	public _lastTimestamp: number;
	public _animationFrame: any;
	public _iterations: any;
	public _repeat: any;
	public _repeatDirection: any;
	public _animation: any;
	public _clock: any;
	public _state: any;
	public _render: any;
	public _slopeAnimationBuilder: any;

  constructor(
    animation: Animation,
    { clock, duration, timeScale, repeatDirection, render }: PlayerOptions
  ) {
    super();
    this._timeScale = typeof timeScale === "number" ? timeScale : 1;
    this._time = 0;
    this._step = 0;
    this._duration = duration;
    this._lastTimestamp = 0;
    this._animationFrame = null;
    this._iterations = 0;
    this._repeat = 1;
    this._repeatDirection =
      typeof repeatDirection === "number" ? repeatDirection : DEFAULT;
    this._animation = animation;
    this._clock = clock || defaultClock;
    this._state = STOPPED;
    this._render = typeof render === "function" ? render : defaultRender;
    this._slopeAnimationBuilder = new SlopeAnimationBuilder();

    this.tick = this.tick.bind(this);
  }

  get time() {
    return this._time;
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

  set repeatDirection(value: RepeatDirection) {
    if ((value !== 0) && (value !== 1)) {
      return;
    }

    this._repeatDirection = value;
  }

  get state() {
    return this._state;
  }

  get animation() {
    return this._animation;
  }

  set animation(animation) {
    if (typeof animation.render === "function") {
      this._animation = animation;
    }
  }

  get iterations() {
    return this._iterations;
  }

  play() {
    if (this._state !== FORWARD) {
      this._lastTimestamp = this._clock.now();
      this._state = FORWARD;
      this._clock.register(this.tick);

      this.notify({
        type: "PLAYED",
        animation: this._animation,
      });
    }
  }

  tick() {
    const timestamp = this._clock.now();
    const deltaTime = timestamp - this._lastTimestamp;
    this._step = (deltaTime / this._duration) * this._timeScale;

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

  stepForward() {
    let time = this._time + this._step;
    let lastTime = this._time;

    const repeatDirection = this._repeatDirection;

    if (time >= 1) {
      this._iterations++;

      if (this._iterations >= this._repeat) {
        this.seek(1);
        this.stop();
        return;
      }

      if (repeatDirection === ALTERNATE) {
        const adjustedTime = 1 - (time - 1);

        this.notify({
          type: "TICK",
          time: 1,
          lastTime,
          animation: this._animation,
        });

        this._time = 1;
        this.seek(adjustedTime);
        this._state = REVERSE;
      } else {
        const adjustedTime = time - 1;

        this.notify({
          type: "TICK",
          time: 1,
          lastTime,
          animation: this._animation,
        });

        this._time = 0;
        this.seek(adjustedTime);
        this._state = FORWARD;
      }
    } else {
      this.seek(time);
    }
  }

  stepBackward() {
    let time = this._time - this._step;
    let lastTime = this._time;

    const repeatDirection = this._repeatDirection;

    if (time <= 0) {
      this._iterations++;

      if (this._iterations >= this._repeat) {
        this.seek(0);
        this.stop();
        return;
      }

      if (repeatDirection === ALTERNATE) {
        const adjustedTime = time * -1;

        this.notify({
          type: "TICK",
          time: 0,
          lastTime,
          animation: this._animation,
        });

        this._time = 0;
        this.seek(adjustedTime);
        this._state = FORWARD;
      } else {
        const adjustedTime = 1 + time;

        this.notify({
          type: "TICK",
          time: 1,
          lastTime,
          animation: this._animation,
        });

        this._time = 1;
        this.seek(adjustedTime);
        this._state = REVERSE;
      }
    } else {
      this.seek(time);
    }
  }

  seek(time: number) {
    const lastTime = this._time;
    this._time = time;

    this._animation.update(this._time);
    this._render(this._animation);

    this.notify({
      type: "TICK",
      time,
      lastTime,
      animation: this._animation,
    });
  }

  stop() {
    if (this._state !== STOPPED) {
      this._state = STOPPED;
      this._clock.unregister(this.tick);

      this.notify({
        type: "STOPPED",
        animation: this._animation,
      });
    }
  }

  reverse() {
    if (this._state !== REVERSE) {
      this._lastTimestamp = this._clock.now();
      this._state = REVERSE;
      this._clock.register(this.tick);

      this.notify({
        type: "REVERSED",
        animation: this._animation,
      });
    }
  }

  transitionToAnimation(animation: Animation, duration: number, easing: EasingFunction) {
    const slopeAnimation = this._slopeAnimationBuilder.build(
      this._animation,
      this._time,
      this._duration,
      duration,
      this._state
    );

    const blendedAnimation = new BlendedAnimation(
      slopeAnimation,
      animation,
      easing
    );

    this._animation = blendedAnimation;
    this._time = 0;
    this._duration = duration;

    this.notify({
      type: "TRANSITION",
      animation: this._animation,
    });

    const observer = this.observeTime(1, () => {
      this._animation = animation;
      observer.dispose();
      transitionObserver.dispose();
    });

    const transitionObserver = this.observe("TRANSITION", () => {
      observer.dispose();
      transitionObserver.dispose();
    });

    return this;
  }

  dispose() {
    this.stop();
    super.dispose();
  }

  static get repeatDirections() {
    return repeatDirections;
  }

  static get states() {
    return states;
  }
}
