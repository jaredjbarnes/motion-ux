import Observable from "./Observable";
import DefaultClock from "./DefaultClock";
import { IClock } from "./IClock";

const NEARLY_ZERO = 0.00001;
const defaultClock = new DefaultClock();
function defaultRender() {}

export enum PlayerState {
  REVERSE = -1,
  STOPPED = 0,
  FORWARD = 1,
}

export enum RepeatDirection {
  DEFAULT = 0,
  ALTERNATE = 1,
}

export default class Player extends Observable {
  private _timeScale: number;
  private _time: number;
  private _step: number;
  private _duration: number;
  private _lastTimestamp: number;
  private _iterations: number;
  private _repeat: number;
  private _repeatDirection: RepeatDirection;
  private _clock: IClock;
  private _state: PlayerState;
  private _render: (time: number) => void;

  constructor(clock?: IClock) {
    super();
    this._timeScale = 1;
    this._time = 0;
    this._step = 0;
    this._duration = NEARLY_ZERO;
    this._lastTimestamp = 0;
    this._iterations = 0;
    this._repeat = 1;
    this._repeatDirection = RepeatDirection.DEFAULT;
    this._clock = clock || defaultClock;
    this._state = PlayerState.STOPPED;
    this._render = defaultRender;
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
      value = NEARLY_ZERO;
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

  get render() {
    return this._render;
  }

  set render(render: (time: number) => void) {
    this._render = render;
  }

  get iterations() {
    return this._iterations;
  }

  set iterations(value: number) {
    if (value >= 0) {
      this._iterations = value;
    }
  }

  get clock() {
    return this._clock;
  }

  set clock(value: IClock) {
    this._clock = value;
  }

  private tick() {
    const timestamp = this._clock.now();
    const deltaTime = timestamp - this._lastTimestamp;
    this._step = (deltaTime / this._duration) * this._timeScale;

    if (this._step > 1) {
      this._step = 1;
    }

    // This helps with unneeded renders.
    if (deltaTime <= 0) {
      return;
    }

    if (this._state === PlayerState.REVERSE) {
      this.stepBackward();
    } else if (this._state === PlayerState.FORWARD) {
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
      });

      if (this._iterations >= this._repeat) {
        this.seek(1);
        this.stop();
        return;
      }

      if (repeatDirection === RepeatDirection.ALTERNATE) {
        const adjustedTime = 1 - (time - 1);

        this._time = 1;
        this.seek(adjustedTime);
        this._state = PlayerState.REVERSE;
      } else {
        const adjustedTime = time - 1;

        this.notify({
          type: "TICK",
          time: 0,
          lastTime,
        });

        this._time = 0;
        this.seek(adjustedTime);
        this._state = PlayerState.FORWARD;
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
      });

      if (this._iterations >= this._repeat) {
        this.seek(0);
        this.stop();
        return;
      }

      if (repeatDirection === RepeatDirection.ALTERNATE) {
        const adjustedTime = time * -1;

        this._time = 0;
        this.seek(adjustedTime);
        this._state = PlayerState.FORWARD;
      } else {
        const adjustedTime = 1 + time;

        this.notify({
          type: "TICK",
          time: 1,
          lastTime,
        });

        this._time = 1;
        this.seek(adjustedTime);
        this._state = PlayerState.REVERSE;
      }
    } else {
      this.seek(time);
    }
  }

  seek(time: number) {
    const lastTime = this._time;
    this._time = time;

    this._render(this._time);

    this.notify({
      type: "TICK",
      time,
      lastTime,
    });

    return this;
  }

  stop() {
    if (this._state !== PlayerState.STOPPED) {
      this._state = PlayerState.STOPPED;
      this._render(this._time);

      this._clock.unregister(this.tick);

      this.notify({
        type: "STOPPED",
      });
    }

    return this;
  }

  play() {
    if (this._state !== PlayerState.FORWARD) {
      this._lastTimestamp = this._clock.now();

      this._state = PlayerState.FORWARD;
      this._clock.register(this.tick);

      this.notify({
        type: "PLAYED",
      });
    }

    return this;
  }

  reverse() {
    if (this._state !== PlayerState.REVERSE) {
      this._lastTimestamp = this._clock.now();

      this._state = PlayerState.REVERSE;
      this._clock.register(this.tick);

      this.notify({
        type: "REVERSED",
      });
    }

    return this;
  }

  dispose() {
    this.stop();
    super.dispose();
  }
}
