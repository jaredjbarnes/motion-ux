import Observable from "./Observable.js";
import DefaultClock from "./DefaultClock.js";
import SlopeTimelineBuilder from "./SlopeTimelineBuilder.js";
import BlendedTimeline from "./BlendedTimeline.js";

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

export default class Player extends Observable {
  constructor(
    timeline,
    { clock, duration, timeScale, repeatDirection, render }
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
    this._timeline = timeline;
    this._clock = clock || defaultClock;
    this._state = STOPPED;
    this._render = typeof render === "function" ? render : defaultRender;
    this._slopeTimelineBuilder = new SlopeTimelineBuilder();

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

  set repeatDirection(value) {
    if ((value !== 0) & (value !== 1)) {
      return;
    }

    this._repeatDirection = value;
  }

  get state() {
    return this._state;
  }

  get timeline() {
    return this._timeline;
  }

  set timeline(timeline) {
    if (typeof timeline.render === "function") {
      this._timeline = timeline;
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
        timeline: this._timeline,
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
          timeline: this._timeline,
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
          timeline: this._timeline,
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
          timeline: this._timeline,
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
          timeline: this._timeline,
        });

        this._time = 1;
        this.seek(adjustedTime);
        this._state = REVERSE;
      }
    } else {
      this.seek(time);
    }
  }

  seek(time) {
    const lastTime = this._time;
    this._time = time;

    this._timeline.update(this._time);
    this._render(this._timeline);

    this.notify({
      type: "TICK",
      time,
      lastTime,
      timeline: this._timeline,
    });
  }

  stop() {
    if (this._state !== STOPPED) {
      this._state = STOPPED;
      this._clock.unregister(this.tick);

      this.notify({
        type: "STOPPED",
        timeline: this._timeline,
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
        timeline: this._timeline,
      });
    }
  }

  transitionToTimeline(timeline, duration, easing) {
    const slopeTimeline = this._slopeTimelineBuilder.build(
      this._timeline,
      this._time,
      this._duration,
      duration,
      this._state
    );

    const blendedTimeline = new BlendedTimeline(
      slopeTimeline,
      timeline,
      easing
    );

    this._timeline = blendedTimeline;
    this._time = 0;
    this._duration = duration;

    this.notify({
      type: "TRANSITIONED",
      timeline: this._timeline,
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
