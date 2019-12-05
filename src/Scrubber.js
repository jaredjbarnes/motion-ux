import Observable from "./Observable.js";

const repeatDirections = {
  DEFAULT: 0,
  ALTERNATE: 1
};

const states = {
  FORWARD: 1,
  REVERSE: -1,
  STOPPED: 0
};

export default class Scrubber extends Observable {
  static get repeatDirections() {
    return repeatDirections;
  }

  static get states() {
    return states;
  }

  constructor({
    clock,
    duration,
    timeScale,
    render,
    repeatDirection = Scrubber.repeatDirections.DEFAULT
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

    this.clock = clock;
    this.state = Scrubber.states.STOPPED;
    this.timeScale = timeScale;
    this.duration = duration;
    this.render = render;
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

    // Virtually Nothing.
    if (value === 0 || value < 0) {
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

  play() {
    if (this.state !== Scrubber.states.FORWARD) {
      this.notify({
        type: "PLAYED"
      });

      this._lastTimestamp = this.clock.now();
      this.state = Scrubber.states.FORWARD;
      this._loop();
    }
  }

  _loop() {
    this.clock.cancelAnimationFrame(this._animationFrame);

    this._animationFrame = this.clock.requestAnimationFrame(() => {
      this._loop();
      this.tick();
    });
  }

  tick() {
    const timestamp = this.clock.now();
    const deltaTime = timestamp - this._lastTimestamp;
    let step = deltaTime / this.duration * this._timeScale;

    if (step > 1) {
      step = 1;
    }

    if (deltaTime === 0) {
      return;
    }

    if (this.state === Scrubber.states.REVERSE) {
      let progress = this._progress - step;
      const repeatDirection = this.repeatDirection;
      const ALTERNATE = Scrubber.repeatDirections.ALTERNATE;

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
          this.state = Scrubber.states.FORWARD;
        } else {
          progress = 1 + progress;
          this.seek(progress);
          this.state = Scrubber.states.REVERSE;
        }
      } else {
        this.seek(progress);
      }
    } else if (this.state === Scrubber.states.FORWARD) {
      let progress = this._progress + step;
      const repeatDirection = this.repeatDirection;
      const ALTERNATE = Scrubber.repeatDirections.ALTERNATE;

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
          this.state = Scrubber.states.REVERSE;
        } else {
          progress = progress - 1;
          this.seek(progress);
          this.state = Scrubber.states.FORWARD;
        }
      } else {
        this.seek(progress);
      }
    }

    this._lastTimestamp = timestamp;
  }

  stop() {
    if (this.state !== Scrubber.states.STOPPED) {
      this.notify({
        type: "STOPPED"
      });

      this.state = Scrubber.states.STOPPED;
    }
    this.clock.cancelAnimationFrame(this._animationFrame);
  }

  reverse() {
    if (this.state !== Scrubber.states.REVERSE) {
      this.notify({
        type: "REVERSED"
      });

      this._lastTimestamp = this.clock.now();
      this.state = Scrubber.states.REVERSE;
      this._loop();
    }
  }

  seek(progress) {
    const lastProgress = this._progress;
    this._progress = progress;

    this.render();

    this.notify({
      type: "RENDER",
      progress: progress,
      lastProgress: lastProgress
    });
  }
}
