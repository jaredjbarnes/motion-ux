import Observable from "./Observable";
import DefaultClock from "./DefaultClock";
import { IClock } from "./IClock";
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
export type PlayerState = 1 | -1 | 0;

export default class Player extends Observable {
  private _timeScale: number;
  private _time: number;
  private _step: number;
  private _duration: number;
  private _lastTimestamp: number;
  private _iterations: number;
  private _repeat: number;
  private _repeatDirection: RepeatDirection;
  private _animation: Animation<any> | null = null;
  private _clock: IClock;
  private _state: PlayerState;
  private _render: (animation: Animation<any>) => void;
  private _delay: number;

  constructor() {
    super();
    this._timeScale = 1;
    this._time = 0;
    this._step = 0;
    this._duration = 0;
    this._lastTimestamp = 0;
    this._iterations = 0;
    this._repeat = 1;
    this._repeatDirection = DEFAULT;
    this._clock = defaultClock;
    this._state = STOPPED;
    this._render = defaultRender;
    this._delay = 0;
    this.tick = this.tick.bind(this);
  }

  get time() {
    return this._time;
  }

  set time(value: number) {
    this._time = value;
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
    if (value !== 0 && value !== 1) {
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

  set animation(animation: Animation<any> | null) {
    this._animation = animation;
  }

  get render() {
    return this._render;
  }

  set render(render: (animation: Animation<any>) => void) {
    this._render = render;
  }

  get iterations() {
    return this._iterations;
  }

  get clock() {
    return this._clock;
  }

  set clock(value: IClock) {
    this._clock = value;
  }

  get delay() {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }

  private tick() {
    const timestamp = this._clock.now();
    const deltaTime = timestamp - this._lastTimestamp;
    this._step = (deltaTime / this._duration) * this._timeScale;

    if (this._step > 1) {
      this._step = 1;
    }

    // This helps with unneeded renders as well as delays.
    if (deltaTime <= 0) {
      return;
    }

    if (this._state === REVERSE) {
      this.stepBackward();
    } else if (this._state === FORWARD) {
      this.stepForward();
    }

    this._lastTimestamp = timestamp;
  }

  private stepForward() {
    let time = this._time + this._step;
    let lastTime = this._time;

    const repeatDirection = this._repeatDirection;

    if (time >= 1) {
      this._iterations++;

      this.notify({
        type: "TICK",
        time: 1,
        lastTime,
        animation: this._animation,
      });

      if (this._iterations >= this._repeat) {
        this.seek(1);
        this.stop();
        return;
      }

      if (repeatDirection === ALTERNATE) {
        const adjustedTime = 1 - (time - 1);

        this._time = 1;
        this.seek(adjustedTime);
        this._state = REVERSE;
      } else {
        const adjustedTime = time - 1;

        this.notify({
          type: "TICK",
          time: 0,
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

  private stepBackward() {
    let time = this._time - this._step;
    let lastTime = this._time;

    const repeatDirection = this._repeatDirection;

    if (time <= 0) {
      this._iterations++;

      this.notify({
        type: "TICK",
        time: 0,
        lastTime,
        animation: this._animation,
      });

      if (this._iterations >= this._repeat) {
        this.seek(0);
        this.stop();
        return;
      }

      if (repeatDirection === ALTERNATE) {
        const adjustedTime = time * -1;

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

    if (this._animation == null) {
      return;
    }

    this._animation.update(this._time);
    this._render(this._animation);

    this.notify({
      type: "TICK",
      time,
      lastTime,
      animation: this._animation,
    });

    return this;
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

    return this;
  }

  play() {
    if (this._state !== FORWARD) {
      this._lastTimestamp = this._clock.now() + this._delay;

      this._state = FORWARD;
      this._clock.register(this.tick);

      this.notify({
        type: "PLAYED",
        animation: this._animation,
      });
    }

    return this;
  }

  reverse() {
    if (this._state !== REVERSE) {
      this._lastTimestamp = this._clock.now() + this._delay;

      this._state = REVERSE;
      this._clock.register(this.tick);

      this.notify({
        type: "REVERSED",
        animation: this._animation,
      });
    }

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
