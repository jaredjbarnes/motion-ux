(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.motionUX = {}));
}(this, (function (exports) { 'use strict';

  const defaultPoints = [];
  class BezierCurve {
      constructor(points) {
          this.points = defaultPoints;
          this.reducedPoints = defaultPoints;
          this.setPoints(points);
      }
      setPoints(points) {
          this.points = points;
          this.reducedPoints = new Array(points.length);
          Object.freeze(this.points);
      }
      valueAt(percentage) {
          const points = this.points;
          const reducedPoints = this.reducedPoints;
          const length = points.length;
          for (let x = 0; x < length; x++) {
              reducedPoints[x] = points[x];
          }
          for (let x = 0; x < length; x++) {
              const innerLength = length - x - 1;
              for (let y = 0; y < innerLength; y++) {
                  const nextPoint = reducedPoints[y + 1];
                  const point = reducedPoints[y];
                  reducedPoints[y] = (nextPoint - point) * percentage + point;
              }
          }
          return reducedPoints[0];
      }
      clone() {
          return new BezierCurve(this.points.slice());
      }
  }

  const emptyArray = [];
  class Animator {
      constructor(keyframe) {
          this.keyframe = keyframe;
          this.time = 0;
          this.bezierCurve = new BezierCurve([]);
      }
      getNumberValue(from, controls = emptyArray, to) {
          const elapsedTime = this.time - this.keyframe.startAt;
          const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
          const timeWithEasing = this.keyframe.easing(elapsedTime / animationDuration);
          const points = [from, ...controls, to];
          this.bezierCurve.setPoints(points);
          return this.bezierCurve.valueAt(timeWithEasing);
      }
      getStringValue(from, to) {
          if (this.time >= this.keyframe.startAt) {
              return to;
          }
          else {
              return from;
          }
      }
      traverse(fromObject, controlsObject, toObject, resultObject) {
          Object.keys(fromObject).forEach((key) => {
              const from = fromObject[key];
              const to = toObject[key];
              const controls = controlsObject.map((c) => c[key]);
              if (typeof from === "number") {
                  resultObject[key] = this.getNumberValue(from, controls, to);
              }
              else if (typeof from === "string") {
                  resultObject[key] = this.getStringValue(from, to);
              }
              else if (typeof from === "object" && from != null) {
                  this.traverse(fromObject[key], controlsObject[key], toObject[key], resultObject[key]);
              }
          });
      }
      update(time) {
          this.time = time;
          if (typeof this.keyframe.from === "string") {
              this.keyframe.result = this.getStringValue(this.keyframe.from, this.keyframe.to);
          }
          else if (typeof this.keyframe.from === "number") {
              this.keyframe.result = this.getNumberValue(this.keyframe.from, this.keyframe.controls, this.keyframe.to);
          }
          else if (typeof this.keyframe.from === "object" &&
              this.keyframe.from != null) {
              this.traverse(this.keyframe.from, this.keyframe.controls, this.keyframe.to, this.keyframe.result);
          }
          return this.keyframe.result;
      }
  }

  const sortAsc = (animatorA, animatorB) => {
      return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
  };
  class Animation {
      constructor(name, keyframes) {
          this._time = 0;
          this.animators = [];
          this.name = name;
          this.currentValues = {};
          this.keyframes = keyframes;
      }
      set keyframes(keyframes) {
          this.animators = keyframes.map((keyframe) => new Animator(keyframe));
          this._createCurrentValues();
          // Sort by time.
          this.animators.sort(sortAsc);
      }
      get keyframes() {
          return this.animators.map((a) => a.keyframe);
      }
      _createCurrentValues() {
          this.currentValues = this.animators.reduce((results, animator) => {
              const keyframe = animator.keyframe;
              const property = keyframe.property;
              results[property] = keyframe.result;
              return results;
          }, {});
      }
      _saveCurrentValues() {
          const visitedMap = new Map();
          const animators = this.animators;
          const length = animators.length;
          // Assign all values at least once.
          // This initials values beyond the time we are at.
          for (let x = 0; x < length; x++) {
              const keyframe = animators[x].keyframe;
              const key = keyframe.property;
              if (!visitedMap.has(key)) {
                  visitedMap.set(key, true);
                  this.currentValues[keyframe.property] = keyframe.result;
              }
          }
          // Assign if the value of the start at was before the time now.
          // Since we have it sorted, the most current will win.
          for (let x = 0; x < length; x++) {
              const keyframe = animators[x].keyframe;
              if (keyframe.startAt <= this._time) {
                  this.currentValues[keyframe.property] = keyframe.result;
              }
          }
      }
      update(time) {
          this._time = time;
          this.animators.forEach((animator) => {
              animator.update(time);
          });
          this._saveCurrentValues();
          return this;
      }
      clone() {
          const keyframes = this.animators.map((a) => a.keyframe.clone());
          return new Animation(this.name, keyframes);
      }
  }

  const states = {
      ACTIVE: 1,
      STOPPED: 0,
      DISPOSED: -1,
  };
  class Observer {
      constructor(type, callback, unbind) {
          this.type = type;
          this.callback = callback;
          this.unbind = unbind;
          this.state = states.ACTIVE;
      }
      notify(event) {
          if (event.type === this.type) {
              this.callback(event);
          }
      }
      stop() {
          if (this.state === states.ACTIVE) {
              this.state = states.STOPPED;
          }
      }
      start() {
          if (this.state !== states.DISPOSED) {
              this.state = states.ACTIVE;
          }
      }
      dispose() {
          this.state = states.DISPOSED;
          this.unbind();
      }
  }

  class TimeObserver extends Observer {
      constructor(time, callback, unbind) {
          super("TIME_OBSERVER", callback, unbind);
          this.time = time;
      }
      notify(event) {
          if (typeof event.lastTime === "number" && typeof event.time === "number") {
              const high = Math.max(event.time, event.lastTime);
              const low = Math.min(event.time, event.lastTime);
              if (this.time >= low && this.time <= high) {
                  this.callback(event);
              }
          }
      }
  }

  class Observable {
      constructor() {
          this.observers = [];
      }
      observeTimeOnce(time, callback) {
          const observer = this.observeTime(time, (event) => {
              callback(event);
              observer.dispose();
          });
          return observer;
      }
      observeTime(time, callback) {
          const observer = new TimeObserver(time, callback, () => {
              const index = this.observers.indexOf(observer);
              if (index > -1) {
                  this.observers.splice(index, 1);
              }
          });
          this.observers.push(observer);
          return observer;
      }
      observeOnce(type, callback) {
          const observer = this.observe(type, (event) => {
              callback(event);
              observer.dispose();
          });
          return observer;
      }
      observe(type, callback) {
          const observer = new Observer(type, callback, () => {
              const index = this.observers.indexOf(observer);
              if (index > -1) {
                  this.observers.splice(index, 1);
              }
          });
          this.observers.push(observer);
          return observer;
      }
      notify(event) {
          this.observers.forEach((observer) => {
              observer.notify(event);
          });
      }
      clearObservers() {
          this.observers = [];
      }
      dispose() {
          this.clearObservers();
      }
  }

  class DefaultClock {
      constructor() {
          this.registeredCallbacks = new Map();
          this._tick = this._tick.bind(this);
          this.animationFrame = null;
      }
      _tick() {
          this.registeredCallbacks.forEach((callback) => {
              callback();
          });
          if (this.registeredCallbacks.size > 0) {
              this.animationFrame = window.requestAnimationFrame(this._tick);
          }
          else {
              this.animationFrame = null;
          }
      }
      register(callback) {
          this.registeredCallbacks.set(callback, callback);
          if (this.animationFrame == null) {
              this._tick();
          }
      }
      unregister(callback) {
          this.registeredCallbacks.delete(callback);
      }
      now() {
          return performance.now();
      }
  }

  const defaultClock = new DefaultClock();
  function defaultRender() { }
  var PlayerState;
  (function (PlayerState) {
      PlayerState[PlayerState["REVERSE"] = -1] = "REVERSE";
      PlayerState[PlayerState["STOPPED"] = 0] = "STOPPED";
      PlayerState[PlayerState["FORWARD"] = 1] = "FORWARD";
  })(PlayerState || (PlayerState = {}));
  var RepeatDirection;
  (function (RepeatDirection) {
      RepeatDirection[RepeatDirection["DEFAULT"] = 0] = "DEFAULT";
      RepeatDirection[RepeatDirection["ALTERNATE"] = 1] = "ALTERNATE";
  })(RepeatDirection || (RepeatDirection = {}));
  class Player extends Observable {
      constructor() {
          super();
          this._animation = null;
          this._timeScale = 1;
          this._time = 0;
          this._step = 0;
          this._duration = 0;
          this._lastTimestamp = 0;
          this._iterations = 0;
          this._repeat = 1;
          this._repeatDirection = RepeatDirection.DEFAULT;
          this._clock = defaultClock;
          this._state = PlayerState.STOPPED;
          this._render = defaultRender;
          this._delay = 0;
          this.tick = this.tick.bind(this);
      }
      get time() {
          return this._time;
      }
      set time(value) {
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
      set repeatDirection(value) {
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
      set animation(animation) {
          this._animation = animation;
      }
      get render() {
          return this._render;
      }
      set render(render) {
          this._render = render;
      }
      get iterations() {
          return this._iterations;
      }
      set iterations(value) {
          if (value >= 0) {
              this._iterations = value;
          }
      }
      get clock() {
          return this._clock;
      }
      set clock(value) {
          this._clock = value;
      }
      get delay() {
          return this._delay;
      }
      set delay(value) {
          this._delay = value;
      }
      tick() {
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
          if (this._state === PlayerState.REVERSE) {
              this.stepBackward();
          }
          else if (this._state === PlayerState.FORWARD) {
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
              if (repeatDirection === RepeatDirection.ALTERNATE) {
                  const adjustedTime = 1 - (time - 1);
                  this._time = 1;
                  this.seek(adjustedTime);
                  this._state = PlayerState.REVERSE;
              }
              else {
                  const adjustedTime = time - 1;
                  this.notify({
                      type: "TICK",
                      time: 0,
                      lastTime,
                      animation: this._animation,
                  });
                  this._time = 0;
                  this.seek(adjustedTime);
                  this._state = PlayerState.FORWARD;
              }
          }
          else {
              this.seek(time);
          }
      }
      stepBackward() {
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
              if (repeatDirection === RepeatDirection.ALTERNATE) {
                  const adjustedTime = time * -1;
                  this._time = 0;
                  this.seek(adjustedTime);
                  this._state = PlayerState.FORWARD;
              }
              else {
                  const adjustedTime = 1 + time;
                  this.notify({
                      type: "TICK",
                      time: 1,
                      lastTime,
                      animation: this._animation,
                  });
                  this._time = 1;
                  this.seek(adjustedTime);
                  this._state = PlayerState.REVERSE;
              }
          }
          else {
              this.seek(time);
          }
      }
      seek(time) {
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
          if (this._state !== PlayerState.STOPPED) {
              this._state = PlayerState.STOPPED;
              this._clock.unregister(this.tick);
              this.notify({
                  type: "STOPPED",
                  animation: this._animation,
              });
          }
          return this;
      }
      play() {
          if (this._state !== PlayerState.FORWARD) {
              this._lastTimestamp = this._clock.now() + this._delay;
              this._state = PlayerState.FORWARD;
              this._clock.register(this.tick);
              this.notify({
                  type: "PLAYED",
                  animation: this._animation,
              });
          }
          return this;
      }
      reverse() {
          if (this._state !== PlayerState.REVERSE) {
              this._lastTimestamp = this._clock.now() + this._delay;
              this._state = PlayerState.REVERSE;
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
  }

  var easeInQuad = (percentage) => {
      return percentage * percentage;
  };

  var easeOutQuad = (percentage) => {
      return -percentage * (percentage - 2);
  };

  var easeInOutQuad = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
          return (1 / 2) * percentage * percentage;
      return (-1 / 2) * (--percentage * (percentage - 2) - 1);
  };

  var easeInElastic = (percentage) => {
      const p = 0.3 / 1;
      const s = p / 4;
      const a = 1;
      if (percentage <= 0)
          return 0;
      if (percentage >= 1)
          return 1;
      return -(a *
          Math.pow(2, 10 * (percentage -= 1)) *
          Math.sin(((percentage - s) * (2 * Math.PI)) / p));
  };

  var easeInOutElastic = (t) => {
      var b = 0;
      var c = 1;
      var d = 1;
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
          return b;
      if ((t /= d / 2) == 2)
          return b + c;
      if (!p)
          p = d * (0.3 / 1);
      if (a < Math.abs(c)) {
          a = c;
          var s = p / 4;
      }
      else
          var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      if (t < 1)
          return (-0.5 *
              (a *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
              b);
      return (a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
          c +
          b);
  };

  var easeOutElastic = (percentage) => {
      const p = 0.3 / 1;
      const s = p / 4;
      const a = 1;
      if (percentage <= 0)
          return 0;
      if (percentage >= 1)
          return 1;
      return (a *
          Math.pow(2, -10 * percentage) *
          Math.sin(((percentage - s) * (2 * Math.PI)) / p) +
          1);
  };

  var easeInOutBack = (percentage) => {
      const s = 1.70158 * 1.525;
      if ((percentage /= 1 / 2) < 1) {
          return (1 / 2) * (percentage * percentage * ((s + 1) * percentage - s));
      }
      return ((1 / 2) * ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2));
  };

  var easeOutBounce = (percentage) => {
      let t = percentage;
      if ((t /= 1) < 1 / 2.75) {
          return 7.5625 * t * t;
      }
      else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      }
      else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      }
      else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
  };

  var easeInBounce = (percentage) => {
      return 1 - easeOutBounce(1 - percentage);
  };

  var easeInOutBounce = (percentage) => {
      if (percentage < 0.5) {
          return easeInBounce(percentage * 2) * 0.5;
      }
      else {
          return easeOutBounce(percentage * 2 - 1) * 0.5 + 0.5;
      }
  };

  var easeInCubic = (percentage) => {
      return percentage * percentage * percentage;
  };

  var easeOutCubic = (percentage) => {
      return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1);
  };

  var easeInOutCubic = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
          return (1 / 2) * percentage * percentage * percentage;
      return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
  };

  var easeInQuart = (percentage) => {
      return 1 * (percentage /= 1) * percentage * percentage * percentage;
  };

  var easeOutQuart = (percentage) => {
      return (-1 *
          ((percentage = percentage / 1 - 1) * percentage * percentage * percentage -
              1));
  };

  var easeInOutQuart = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
          return (1 / 2) * percentage * percentage * percentage * percentage;
      return ((-1 / 2) * ((percentage -= 2) * percentage * percentage * percentage - 2));
  };

  var easeInQuint = (percentage) => {
      return (1 * (percentage /= 1) * percentage * percentage * percentage * percentage);
  };

  var easeOutQuint = (percentage) => {
      return (1 *
          ((percentage = percentage / 1 - 1) *
              percentage *
              percentage *
              percentage *
              percentage +
              1));
  };

  var easeInOutQuint = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
          return ((1 / 2) * percentage * percentage * percentage * percentage * percentage);
      return ((1 / 2) *
          ((percentage -= 2) * percentage * percentage * percentage * percentage + 2));
  };

  var easeInSine = (percentage) => {
      return -Math.cos(percentage * (Math.PI / 2)) + 1;
  };

  var easeOutSine = (percentage) => {
      return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
  };

  var easeInOutSine = (percentage) => {
      return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
  };

  var easeInExpo = (percentage) => {
      return percentage == 0 ? 0 : Math.pow(2, 10 * (percentage - 1));
  };

  var easeOutExpo = (percentage) => {
      return percentage == 1 ? 1 : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
  };

  var easeInOutExpo = (percentage) => {
      if (percentage == 0)
          return 0;
      if (percentage == 1)
          return 1;
      if ((percentage /= 1 / 2) < 1)
          return (1 / 2) * Math.pow(2, 10 * (percentage - 1));
      return (1 / 2) * (-Math.pow(2, -10 * --percentage) + 2);
  };

  var easeInCirc = (percentage) => {
      return -(Math.sqrt(1 - percentage * percentage) - 1);
  };

  var easeOutCirc = (percentage) => {
      return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
  };

  var easeInOutCirc = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
          return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
      return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
  };

  var easeInBack = (percentage) => {
      const s = 1.70158;
      return percentage * percentage * ((s + 1) * percentage - s);
  };

  var easeOutBack = (percentage) => {
      const s = 1.70158;
      return (1 *
          ((percentage = percentage / 1 - 1) *
              percentage *
              ((s + 1) * percentage + s) +
              1));
  };

  var easeLinear = (percentage) => {
      return percentage;
  };

  const easings = {
      easeInQuad: easeInQuad,
      easeOutQuad: easeOutQuad,
      easeInOutQuad: easeInOutQuad,
      easeInCubic: easeInCubic,
      easeOutCubic: easeOutCubic,
      easeInOutCubic: easeInOutCubic,
      easeInQuart: easeInQuart,
      easeOutQuart: easeOutQuart,
      easeInOutQuart: easeInOutQuart,
      easeInQuint: easeInQuint,
      easeOutQuint: easeOutQuint,
      easeInOutQuint: easeInOutQuint,
      easeInSine: easeInSine,
      easeOutSine: easeOutSine,
      easeInOutSine: easeInOutSine,
      easeInExpo: easeInExpo,
      easeOutExpo: easeOutExpo,
      easeInOutExpo: easeInOutExpo,
      easeInCirc: easeInCirc,
      easeOutCirc: easeOutCirc,
      easeInOutCirc: easeInOutCirc,
      easeInElastic: easeInElastic,
      easeOutElastic: easeOutElastic,
      easeInOutElastic: easeInOutElastic,
      easeInBack: easeInBack,
      easeOutBack: easeOutBack,
      easeInOutBack: easeInOutBack,
      easeInBounce: easeInBounce,
      easeOutBounce: easeOutBounce,
      easeInOutBounce: easeInOutBounce,
      linear: easeLinear,
  };

  const easingOutMap = {
      linear: [1],
      quad: [1, 1],
      cubic: [1, 1, 1],
      quart: [1, 1, 1, 1],
      back: [0, 0, -0.5],
      quint: [1, 1, 1, 1, 1],
      expo: [1, 1, 1, 1, 1, 1],
      circ: [0.65, 0.75, 0.85, 0.95, 1, 1, 1, 1],
      elastic: [2, 2, -1, 1.5, 1.5, 0.75, 1.25, 0.85, 1, 1, 1],
  };
  const easingInMap = {
      linear: [0],
      quad: [0, 0],
      cubic: [0, 0, 0],
      quart: [0, 0, 0, 0],
      back: [1.5, 1, 1],
      quint: [0, 0, 0, 0, 0],
      expo: [0, 0, 0, 0, 0, 0],
      circ: [0, 0, 0, 0, 0.05, 0.15, 0.25, 0.35],
      elastic: [0, 0, 0, 0.15, -0.25, 0.25, -0.5, -0.5, 2, -1, -1],
  };
  function createDynamicEasing(easingIn, easingOut) {
      const points = [...easingInMap[easingIn], ...easingOutMap[easingOut]];
      const bezierCurve = new BezierCurve(points);
      return (percentage) => {
          return bezierCurve.valueAt(percentage);
      };
  }

  const complexFrameKeys = ["controlsIn", "controlsOut", "easeIn", "easeOut"];
  class KeyframesGenerator {
      constructor() {
          this.transformValue = (value) => value;
          this.sortPercentages = (keyA, keyB) => {
              if (keyA === "from") {
                  return -1;
              }
              if (keyB === "from") {
                  return 1;
              }
              if (keyA === "to") {
                  return 1;
              }
              if (keyB === "to") {
                  return -1;
              }
              const keyAParts = keyA.split("%");
              const keyBParts = keyB.split("%");
              const keyANumber = parseFloat(keyAParts[0]);
              const keyBNumber = parseFloat(keyBParts[0]);
              if (keyANumber < keyBNumber) {
                  return -1;
              }
              else if (keyANumber > keyBNumber) {
                  return 1;
              }
              return 0;
          };
      }
      setTransformValue(transformValue) {
          this.transformValue = transformValue;
      }
      isComplexKeyframe(value) {
          const keys = Object.keys(value);
          return (keys.includes("value") && keys.some((k) => complexFrameKeys.includes(k)));
      }
      getDecimalFromPercentage(percentage) {
          if (percentage === "to") {
              return 1;
          }
          if (percentage === "from") {
              return 0;
          }
          const percentageParts = percentage.split("%");
          let decimal = parseFloat(percentageParts[0]) / 100;
          if (isNaN(decimal)) {
              throw new Error(`Unknown keyframe step: ${decimal}. Expected format 10% or 10.01% etc`);
          }
          decimal = Math.max(0, decimal);
          decimal = Math.min(1, decimal);
          return decimal;
      }
      getEaseIn(currentValue) {
          if (this.isComplexKeyframe(currentValue) && currentValue.easeOut != null) {
              return currentValue.easeOut || "linear";
          }
          else {
              return "linear";
          }
      }
      getEaseOut(nextValue) {
          if (this.isComplexKeyframe(nextValue) && nextValue.easeIn != null) {
              return nextValue.easeIn || "linear";
          }
          else {
              return "linear";
          }
      }
      getControlsIn(currentValue) {
          if (this.isComplexKeyframe(currentValue) &&
              Array.isArray(currentValue.controlsOut)) {
              return currentValue.controlsOut.map((v) => this.transformValue(v));
          }
          else {
              return [];
          }
      }
      getControlsOut(nextValue) {
          if (this.isComplexKeyframe(nextValue) &&
              Array.isArray(nextValue.controlsIn)) {
              return nextValue.controlsIn.map((v) => this.transformValue(v));
          }
          else {
              return [];
          }
      }
      getFrom(currentValue) {
          if (this.isComplexKeyframe(currentValue)) {
              return this.transformValue(currentValue.value);
          }
          else {
              return this.transformValue(currentValue);
          }
      }
      getTo(nextValue) {
          if (this.isComplexKeyframe(nextValue)) {
              return this.transformValue(nextValue.value);
          }
          else {
              return this.transformValue(nextValue);
          }
      }
      generate(animationKeyframes) {
          const timeKeys = Object.keys(animationKeyframes);
          const keyframes = [];
          let lastKeyFramePercentage = 0;
          timeKeys.sort(this.sortPercentages);
          for (let index = 0; index < timeKeys.length - 1; index++) {
              const key = timeKeys[index];
              const nextKey = timeKeys[index + 1];
              const currentAnimationKeyframe = animationKeyframes[key];
              const nextAnimationKeyframe = animationKeyframes[nextKey] || null;
              const startAt = lastKeyFramePercentage;
              const endAt = this.getDecimalFromPercentage(timeKeys[index + 1]);
              lastKeyFramePercentage = endAt;
              Object.keys(currentAnimationKeyframe).forEach((key) => {
                  const currentValue = currentAnimationKeyframe[key];
                  const nextValue = nextAnimationKeyframe[key];
                  if (nextValue == null) {
                      throw new Error(`All keyframe declarations need to have the same properties. Missing '${key}' from one of the keyframes. ${JSON.stringify(animationKeyframes)}`);
                  }
                  const easingIn = this.getEaseIn(currentValue);
                  const easingOut = this.getEaseOut(nextValue);
                  const easing = createDynamicEasing(easingIn, easingOut);
                  const controlsIn = this.getControlsIn(currentValue);
                  const controlsOut = this.getControlsOut(nextValue);
                  const controls = [...controlsIn, ...controlsOut];
                  const from = this.getFrom(currentValue);
                  const to = this.getTo(nextValue);
                  const keyframe = new Keyframe({
                      property: key,
                      from,
                      to,
                      controls,
                      easing,
                      startAt,
                      endAt,
                  });
                  keyframes.push(keyframe);
              });
          }
          return keyframes;
      }
  }

  const keyframesGenerator$1 = new KeyframesGenerator();
  class Keyframe {
      constructor(config) {
          this.property = config.property;
          this.to = config.to;
          this.from = config.from;
          this.result = JSON.parse(JSON.stringify(config.from));
          this.startAt = typeof config.startAt === "number" ? config.startAt : 0;
          this.endAt = typeof config.endAt === "number" ? config.endAt : 1;
          this.controls = Array.isArray(config.controls) ? config.controls : [];
          this.easing =
              typeof config.easing === "function" ? config.easing : easings.linear;
      }
      static createKeyframes(animationKeyframes) {
          return keyframesGenerator$1.generate(animationKeyframes);
      }
      clone() {
          return new Keyframe({
              property: this.property,
              to: JSON.parse(JSON.stringify(this.to)),
              from: JSON.parse(JSON.stringify(this.from)),
              startAt: this.startAt,
              endAt: this.endAt,
              controls: this.controls.map((c) => JSON.parse(JSON.stringify(c))),
              easing: this.easing,
          });
      }
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  class Node {
      constructor(type, name, startIndex, endIndex, isComposite = false) {
          this.children = [];
          this.value = "";
          this.type = type;
          this.name = name;
          this.startIndex = startIndex;
          this.endIndex = endIndex;
          this.isComposite = isComposite;
          if (typeof this.startIndex !== "number" ||
              typeof this.endIndex !== "number") {
              throw new Error("Invalid Arguments: startIndex and endIndex need to be number.");
          }
      }
  }

  class CompositeNode extends Node {
      constructor(type, name, startIndex = 0, endIndex = 0) {
          super(type, name, startIndex, endIndex, true);
      }
      clone() {
          const node = new CompositeNode(this.type, this.name, this.startIndex, this.endIndex);
          node.children = this.children.map((child) => {
              return child.clone();
          });
          return node;
      }
      toString() {
          return this.children.map((child) => child.toString()).join("");
      }
  }

  class ValueNode extends Node {
      constructor(type, name, value, startIndex = 0, endIndex = 0) {
          super(type, name, startIndex, endIndex);
          this.value = value;
      }
      clone() {
          return new ValueNode(this.type, this.name, this.value, this.startIndex, this.endIndex);
      }
      toString() {
          return this.value;
      }
  }

  class CursorHistory {
      constructor() {
          this.isRecording = false;
          this.furthestMatch = {
              pattern: null,
              astNode: null,
          };
          this.furthestError = null;
          this.patterns = [];
          this.astNodes = [];
          this.errors = [];
      }
      addMatch(pattern, astNode) {
          if (this.isRecording) {
              this.patterns.push(pattern);
              this.astNodes.push(astNode);
          }
          if (this.furthestMatch.astNode == null ||
              astNode.endIndex >= this.furthestMatch.astNode.endIndex) {
              this.furthestMatch.pattern = pattern;
              this.furthestMatch.astNode = astNode;
          }
      }
      addError(error) {
          if (this.isRecording) {
              this.errors.push(error);
          }
          if (this.furthestError == null || error.index >= this.furthestError.index) {
              this.furthestError = error;
          }
      }
      startRecording() {
          this.isRecording = true;
      }
      stopRecording() {
          this.isRecording = false;
          this.clear();
      }
      clear() {
          this.patterns.length = 0;
          this.astNodes.length = 0;
          this.errors.length = 0;
      }
      getFurthestError() {
          return this.furthestError;
      }
      getFurthestMatch() {
          return this.furthestMatch;
      }
      getLastMatch() {
          if (this.isRecording) {
              return {
                  pattern: this.patterns[this.patterns.length - 1] || null,
                  astNode: this.astNodes[this.astNodes.length - 1] || null,
              };
          }
          else {
              return this.furthestMatch;
          }
      }
      getLastError() {
          return this.errors[this.errors.length - 1] || null;
      }
      getAllParseStacks() {
          const stacks = this.astNodes.reduce((acc, node) => {
              let container = acc[acc.length - 1];
              if (node.startIndex === 0) {
                  container = [];
                  acc.push(container);
              }
              container.push(node);
              return acc;
          }, []);
          // There are times when the matching will fail and hit again on the same node.
          // This filters them out.
          // We simply check to see if there is any overlap with the previous one,
          // and if there is we don't add it. This is why we move backwards.
          const cleanedStack = stacks.map((stack) => {
              const cleanedStack = [];
              for (let x = stack.length - 1; x >= 0; x--) {
                  const currentNode = stack[x];
                  const previousNode = stack[x + 1];
                  if (previousNode == null) {
                      cleanedStack.unshift(currentNode);
                  }
                  else {
                      const left = Math.max(currentNode.startIndex, previousNode.startIndex);
                      const right = Math.min(currentNode.endIndex, previousNode.endIndex);
                      const isOverlapping = left <= right;
                      if (!isOverlapping) {
                          cleanedStack.unshift(currentNode);
                      }
                  }
              }
              return cleanedStack;
          });
          return cleanedStack;
      }
      getLastParseStack() {
          const stacks = this.getAllParseStacks();
          return stacks[stacks.length - 1] || [];
      }
  }

  class Cursor {
      constructor(text) {
          this.text = text;
          this.assertValidity();
          this.index = 0;
          this.length = text.length;
          this.history = new CursorHistory();
          this.isInErrorState = false;
      }
      assertValidity() {
          if (this.isNullOrEmpty(this.text)) {
              throw new Error("Illegal Argument: Cursor needs to have a string that has a length greater than 0.");
          }
      }
      startRecording() {
          this.history.startRecording();
      }
      stopRecording() {
          this.history.stopRecording();
      }
      get parseError() {
          return this.history.getFurthestError();
      }
      get lastMatch() {
          return this.history.getFurthestMatch();
      }
      throwError(parseError) {
          this.isInErrorState = true;
          this.history.addError(parseError);
      }
      addMatch(pattern, astNode) {
          this.history.addMatch(pattern, astNode);
      }
      resolveError() {
          this.isInErrorState = false;
      }
      hasUnresolvedError() {
          return this.isInErrorState;
      }
      isNullOrEmpty(value) {
          return value == null || (typeof value === "string" && value.length === 0);
      }
      hasNext() {
          return this.index + 1 < this.text.length;
      }
      hasPrevious() {
          return this.index - 1 >= 0;
      }
      next() {
          if (this.hasNext()) {
              this.index++;
          }
          else {
              throw new Error("Cursor: Out of Bounds Exception.");
          }
      }
      previous() {
          if (this.hasPrevious()) {
              this.index--;
          }
          else {
              throw new Error("Cursor: Out of Bounds Exception.");
          }
      }
      mark() {
          return this.index;
      }
      moveToMark(mark) {
          this.index = mark;
      }
      moveToBeginning() {
          this.index = 0;
      }
      moveToEnd() {
          this.index = this.text.length - 1;
      }
      getChar() {
          return this.text.charAt(this.index);
      }
      getIndex() {
          return this.index;
      }
      setIndex(index) {
          if (typeof index === "number") {
              if (index < 0 || index > this.lastIndex()) {
                  throw new Error("Cursor: Out of Bounds Exception.");
              }
              this.index = index;
          }
      }
      isAtBeginning() {
          return this.index === 0;
      }
      isAtEnd() {
          return this.index === this.text.length - 1;
      }
      lastIndex() {
          return this.length - 1;
      }
      didSuccessfullyParse() {
          return !this.hasUnresolvedError() && this.isAtEnd();
      }
  }

  class ParseError {
      constructor(message, index, pattern) {
          this.name = "ParseError";
          this.message = message;
          this.index = index;
          this.pattern = pattern;
      }
  }

  class Pattern {
      constructor(type = "", name, children = []) {
          this._type = type;
          this._name = name;
          this._children = [];
          this._parent = null;
          this.isSequence = false;
          this._assertName();
          this.children = children;
      }
      _assertName() {
          if (typeof this.name !== "string") {
              throw new Error("Invalid Argument: Patterns needs to have a name that's a string.");
          }
      }
      exec(text) {
          const cursor = new Cursor(text);
          const node = this.parse(cursor);
          if (cursor.didSuccessfullyParse()) {
              return node;
          }
          else {
              return null;
          }
      }
      test(text) {
          return this.exec(text) != null;
      }
      get name() {
          return this._name;
      }
      get type() {
          return this._type;
      }
      get parent() {
          return this._parent;
      }
      set parent(value) {
          if (value instanceof Pattern) {
              this._parent = value;
          }
      }
      get children() {
          return this._children;
      }
      set children(value) {
          this._children = value;
          this._cloneChildren();
          this._assertChildren();
          this._assignAsParent();
      }
      _assertChildren() {
          // Empty,can be overridden by subclasses.
      }
      _cloneChildren() {
          // We need to clone the patterns so nested patterns can be parsed.
          this._children = this._children.map((pattern) => {
              if (!(pattern instanceof Pattern)) {
                  throw new Error(`The ${this.name} pattern has an invalid child pattern.`);
              }
              return pattern.clone();
          });
          // We need to freeze the children so they aren't modified.
          Object.freeze(this._children);
      }
      _assignAsParent() {
          this._children.forEach((child) => (child.parent = this));
      }
      getNextTokens() {
          var _a, _b, _c;
          const parent = this._parent;
          if (parent != null) {
              const siblings = parent.children;
              const index = siblings.findIndex((c) => c === this);
              const nextSibling = siblings[index + 1];
              // I don't like this, so I think we need to rethink this.
              if (parent.type.indexOf("repeat") === 0) {
                  const tokens = parent.getNextTokens();
                  if (index === 0 && siblings.length > 1) {
                      return nextSibling.getTokens().concat(tokens);
                  }
                  else if (index === 1) {
                      return siblings[0].getTokens().concat(tokens);
                  }
                  else {
                      return this.getTokens().concat(tokens);
                  }
              }
              // Another thing I don't like.
              if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.indexOf("and")) === 0 &&
                  nextSibling != null &&
                  ((_c = nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.type) === null || _c === void 0 ? void 0 : _c.indexOf("optional")) === 0) {
                  let tokens = [];
                  for (let x = index + 1; x < siblings.length; x++) {
                      const child = siblings[x];
                      if (child.type.indexOf("optional") === 0) {
                          tokens = tokens.concat(child.getTokens());
                      }
                      else {
                          tokens = tokens.concat(child.getTokens());
                          break;
                      }
                      if (x === siblings.length - 1) {
                          tokens = tokens.concat(this._parent.getNextTokens());
                      }
                  }
                  return tokens;
              }
              // If you are an or you have already qualified.
              if (parent.type.indexOf("or") === 0) {
                  return parent.getNextTokens();
              }
              if (nextSibling != null) {
                  return nextSibling.getTokens();
              }
              else {
                  return parent.getNextTokens();
              }
          }
          return [];
      }
      getTokenValue() {
          return null;
      }
  }

  class ValuePattern extends Pattern {
      constructor(type, name, children = []) {
          super(type, name, children);
      }
  }

  class RegexValue extends ValuePattern {
      constructor(name, regex) {
          super("regex-value", name);
          this.node = null;
          this.substring = "";
          this.regexString = regex;
          this.regex = new RegExp(`^${regex}`, "g");
          this._assertArguments();
      }
      _assertArguments() {
          if (typeof this.regexString !== "string") {
              throw new Error("Invalid Arguments: The regex argument needs to be a string of regex.");
          }
          if (this.regexString.length < 1) {
              throw new Error("Invalid Arguments: The regex string argument needs to be at least one character long.");
          }
          if (this.regexString.charAt(0) === "^") {
              throw new Error("Invalid Arguments: The regex string cannot start with a '^' because it is expected to be in the middle of a string.");
          }
          if (this.regexString.charAt(this.regexString.length - 1) === "$") {
              throw new Error("Invalid Arguments: The regex string cannot end with a '$' because it is expected to be in the middle of a string.");
          }
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPattern();
          return this.node;
      }
      _reset(cursor) {
          this.cursor = cursor;
          this.regex.lastIndex = 0;
          this.substring = this.cursor.text.substr(this.cursor.getIndex());
          this.node = null;
      }
      _tryPattern() {
          const result = this.regex.exec(this.substring);
          if (result != null && result.index === 0) {
              const currentIndex = this.cursor.getIndex();
              const newIndex = currentIndex + result[0].length - 1;
              this.node = new ValueNode("regex-value", this.name, result[0], currentIndex, newIndex);
              this.cursor.index = newIndex;
              this.cursor.addMatch(this, this.node);
          }
          else {
              this._processError();
          }
      }
      _processError() {
          const message = `ParseError: Expected regex pattern of '${this.regexString}' but found '${this.substring}'.`;
          const parseError = new ParseError(message, this.cursor.getIndex(), this);
          this.cursor.throwError(parseError);
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new RegexValue(name, this.regexString);
      }
      getTokenValue() {
          return this.name;
      }
      getTokens() {
          return [this.name];
      }
  }

  class OptionalValue extends ValuePattern {
      constructor(pattern) {
          super("optional-value", "optional-value", [pattern]);
          this._assertArguments();
      }
      _assertArguments() {
          if (!(this.children[0] instanceof ValuePattern)) {
              throw new Error("Invalid Arguments: Expected a ValuePattern.");
          }
      }
      parse(cursor) {
          const mark = cursor.mark();
          const node = this.children[0].parse(cursor);
          if (cursor.hasUnresolvedError() || node == null) {
              cursor.resolveError();
              cursor.moveToMark(mark);
              return null;
          }
          else {
              cursor.addMatch(this, node);
              return node;
          }
      }
      clone() {
          return new OptionalValue(this.children[0]);
      }
      getTokens() {
          return this._children[0].getTokens();
      }
  }

  class Literal extends ValuePattern {
      constructor(name, literal) {
          super("literal", name);
          this.node = null;
          this.mark = 0;
          this.substring = "";
          this.literal = literal;
          this._assertArguments();
      }
      _assertArguments() {
          if (typeof this.literal !== "string") {
              throw new Error("Invalid Arguments: The literal argument needs to be a string of characters.");
          }
          if (this.literal.length < 1) {
              throw new Error("Invalid Arguments: The literalString argument needs to be at least one character long.");
          }
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPattern();
          return this.node;
      }
      _reset(cursor) {
          this.cursor = cursor;
          this.mark = this.cursor.mark();
          this.substring = this.cursor.text.substring(this.mark, this.mark + this.literal.length);
          this.node = null;
      }
      _tryPattern() {
          if (this.substring === this.literal) {
              this._processMatch();
          }
          else {
              this._processError();
          }
      }
      _processError() {
          const message = `ParseError: Expected '${this.literal}' but found '${this.substring}'.`;
          const parseError = new ParseError(message, this.cursor.getIndex(), this);
          this.cursor.throwError(parseError);
      }
      _processMatch() {
          this.node = new ValueNode("literal", this.name, this.substring, this.mark, this.mark + this.literal.length - 1);
          this.cursor.index = this.node.endIndex;
          this.cursor.addMatch(this, this.node);
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new Literal(name, this.literal);
      }
      getTokenValue() {
          return this.literal;
      }
      getTokens() {
          return [this.getTokenValue()];
      }
  }

  class RepeatValue extends ValuePattern {
      constructor(name, pattern, divider) {
          super("repeat-value", name, divider != null ? [pattern, divider] : [pattern]);
          this.nodes = [];
          this.mark = 0;
          this.node = null;
          this._pattern = this.children[0];
          this._divider = this.children[1];
          this._assertArguments();
      }
      _assertArguments() {
          if (this._pattern instanceof OptionalValue) {
              throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
          }
      }
      _reset(cursor) {
          this.nodes = [];
          this.cursor = cursor;
          this.mark = this.cursor.mark();
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPattern();
          return this.node;
      }
      _tryPattern() {
          while (true) {
              const node = this._pattern.parse(this.cursor);
              if (this.cursor.hasUnresolvedError()) {
                  this._processMatch();
                  break;
              }
              else {
                  this.nodes.push(node);
                  if (node.endIndex === this.cursor.lastIndex()) {
                      this._processMatch();
                      break;
                  }
                  this.cursor.next();
                  if (this._divider != null) {
                      const mark = this.cursor.mark();
                      const node = this._divider.parse(this.cursor);
                      if (this.cursor.hasUnresolvedError()) {
                          this.cursor.moveToMark(mark);
                          this._processMatch();
                          break;
                      }
                      else {
                          this.nodes.push(node);
                          this.cursor.next();
                      }
                  }
              }
          }
      }
      _processMatch() {
          this.cursor.resolveError();
          if (this.nodes.length === 0) {
              const parseError = new ParseError(`Did not find a repeating match of ${this.name}.`, this.mark, this);
              this.cursor.throwError(parseError);
              this.node = null;
          }
          else {
              const value = this.nodes.map((node) => node.value).join("");
              this.node = new ValueNode("repeat-value", this.name, value, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
              this.cursor.index = this.node.endIndex;
              this.cursor.addMatch(this, this.node);
          }
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new RepeatValue(name, this._pattern, this._divider);
      }
      getTokens() {
          return this._pattern.getTokens();
      }
  }

  class CompositePattern extends Pattern {
      constructor(type, name, children = []) {
          super(type, name, children);
      }
  }

  class OptionalComposite extends CompositePattern {
      constructor(pattern) {
          super("optional-composite", "optional-composite", [pattern]);
      }
      parse(cursor) {
          const mark = cursor.mark();
          this.mark = mark;
          const node = this.children[0].parse(cursor);
          if (cursor.hasUnresolvedError()) {
              cursor.resolveError();
              cursor.moveToMark(mark);
              return null;
          }
          else {
              if (node != null) {
                  cursor.addMatch(this, node);
              }
              return node;
          }
      }
      clone() {
          return new OptionalComposite(this.children[0]);
      }
      getTokens() {
          return this._children[0].getTokens();
      }
  }

  class AndComposite extends CompositePattern {
      constructor(name, patterns = []) {
          super("and-composite", name, patterns);
          this._assertArguments();
      }
      _assertArguments() {
          if (this._children.length < 2) {
              throw new Error("Invalid Argument: AndValue needs to have more than one value pattern.");
          }
      }
      _reset(cursor) {
          this.index = 0;
          this.nodes = [];
          this.node = null;
          this.cursor = cursor;
          this.mark = this.cursor.mark();
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPatterns();
          return this.node;
      }
      _tryPatterns() {
          while (true) {
              const pattern = this._children[this.index];
              const node = pattern.parse(this.cursor);
              if (this.cursor.hasUnresolvedError()) {
                  this.cursor.moveToMark(this.mark);
                  break;
              }
              else {
                  this.nodes.push(node);
              }
              if (!this._next()) {
                  this._processValue();
                  break;
              }
          }
      }
      _next() {
          if (this._hasMorePatterns()) {
              if (this.cursor.hasNext()) {
                  // If the last result was a failed optional, then don't increment the cursor.
                  if (this.nodes[this.nodes.length - 1] != null) {
                      this.cursor.next();
                  }
                  this.index++;
                  return true;
              }
              else if (this.nodes[this.nodes.length - 1] == null) {
                  this.index++;
                  return true;
              }
              this._assertRestOfPatternsAreOptional();
              return false;
          }
          else {
              return false;
          }
      }
      _hasMorePatterns() {
          return this.index + 1 < this._children.length;
      }
      _assertRestOfPatternsAreOptional() {
          const areTheRestOptional = this.children.every((pattern, index) => {
              return (index <= this.index ||
                  pattern instanceof OptionalValue ||
                  pattern instanceof OptionalComposite);
          });
          if (!areTheRestOptional) {
              const parseError = new ParseError(`Could not match ${this.name} before string ran out.`, this.index, this);
              this.cursor.throwError(parseError);
          }
      }
      _processValue() {
          if (!this.cursor.hasUnresolvedError()) {
              this.nodes = this.nodes.filter((node) => node != null);
              const lastNode = this.nodes[this.nodes.length - 1];
              const startIndex = this.mark;
              const endIndex = lastNode.endIndex;
              this.node = new CompositeNode("and-composite", this.name, startIndex, endIndex);
              this.node.children = this.nodes;
              this.cursor.index = this.node.endIndex;
              this.cursor.addMatch(this, this.node);
          }
          else {
              this.node = null;
          }
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new AndComposite(name, this._children);
      }
      getTokens() {
          let tokens = [];
          for (let x = 0; x < this._children.length; x++) {
              const child = this._children[x];
              if (child instanceof OptionalValue ||
                  child instanceof OptionalComposite) {
                  tokens = tokens.concat(child.getTokens());
              }
              else {
                  tokens = tokens.concat(child.getTokens());
                  break;
              }
          }
          return tokens;
      }
  }

  class OrComposite extends CompositePattern {
      constructor(name, patterns) {
          super("or-composite", name, patterns);
          this._assertArguments();
      }
      _assertArguments() {
          if (this._children.length < 2) {
              throw new Error("Invalid Argument: OrValue needs to have more than one value pattern.");
          }
          const hasOptionalChildren = this._children.some((pattern) => pattern instanceof OptionalValue || pattern instanceof OptionalComposite);
          if (hasOptionalChildren) {
              throw new Error("OrComposite cannot have optional values.");
          }
      }
      _reset(cursor) {
          this.cursor = cursor;
          this.mark = null;
          this.index = 0;
          this.node = null;
          this.mark = cursor.mark();
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPattern();
          if (this.node != null) {
              this.cursor.addMatch(this, this.node);
          }
          return this.node;
      }
      _tryPattern() {
          while (true) {
              const pattern = this._children[this.index];
              this.node = pattern.parse(this.cursor);
              if (this.cursor.hasUnresolvedError()) {
                  if (this.index + 1 < this._children.length) {
                      this.cursor.resolveError();
                      this.index++;
                      this.cursor.moveToMark(this.mark);
                  }
                  else {
                      this.node = null;
                      break;
                  }
              }
              else {
                  this.cursor.index = this.node.endIndex;
                  break;
              }
          }
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new OrComposite(name, this._children);
      }
      getTokens() {
          const tokens = this._children.map((c) => c.getTokens());
          const hasPrimitiveTokens = tokens.every((t) => t.every((value) => typeof value === "string"));
          if (hasPrimitiveTokens && tokens.length > 0) {
              return tokens.reduce((acc, t) => acc.concat(t), []);
          }
          return this._children[0].getTokens();
      }
  }

  class RepeatComposite extends CompositePattern {
      constructor(name, pattern, divider) {
          super("repeat-composite", name, divider != null ? [pattern, divider] : [pattern]);
          this.nodes = [];
          this.mark = 0;
          this.node = null;
          this._pattern = this.children[0];
          this._divider = this.children[1];
          this._assertArguments();
      }
      _assertArguments() {
          if (this._pattern instanceof OptionalComposite) {
              throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
          }
      }
      _reset(cursor) {
          this.nodes = [];
          this.cursor = cursor;
          this.mark = this.cursor.mark();
      }
      parse(cursor) {
          this._reset(cursor);
          this._tryPattern();
          return this.node;
      }
      _tryPattern() {
          while (true) {
              const node = this._pattern.parse(this.cursor);
              if (this.cursor.hasUnresolvedError() || node == null) {
                  this._processMatch();
                  break;
              }
              else {
                  this.nodes.push(node);
                  if (node.endIndex === this.cursor.lastIndex()) {
                      this._processMatch();
                      break;
                  }
                  this.cursor.next();
                  if (this._divider != null) {
                      const mark = this.cursor.mark();
                      const node = this._divider.parse(this.cursor);
                      if (this.cursor.hasUnresolvedError() || node == null) {
                          this.cursor.moveToMark(mark);
                          this._processMatch();
                          break;
                      }
                      else {
                          this.nodes.push(node);
                          this.cursor.next();
                      }
                  }
              }
          }
      }
      _processMatch() {
          this.cursor.resolveError();
          if (this.nodes.length === 0) {
              this.cursor.throwError(new ParseError(`Did not find a repeating match of ${this.name}.`, this.mark, this));
              this.node = null;
          }
          else {
              this.node = new CompositeNode("repeat-composite", this.name, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
              this.node.children = this.nodes;
              this.cursor.index = this.node.endIndex;
              this.cursor.addMatch(this, this.node);
          }
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new RepeatComposite(name, this._pattern, this._divider);
      }
      getTokens() {
          return this._pattern.getTokens();
      }
  }

  class RecursivePattern extends Pattern {
      constructor(name) {
          super("recursive", name);
          this.pattern = null;
          this.isRecursing = false;
      }
      getPattern() {
          return this._climb(this.parent, (pattern) => {
              if (pattern == null) {
                  return false;
              }
              return pattern.name === this.name;
          });
      }
      _climb(pattern, isMatch) {
          if (isMatch(pattern)) {
              return pattern;
          }
          else {
              if (pattern && pattern.parent != null) {
                  return this._climb(pattern.parent, isMatch);
              }
              return null;
          }
      }
      parse(cursor) {
          if (this.pattern == null) {
              const pattern = this.getPattern();
              if (pattern == null) {
                  cursor.throwError(new ParseError(`Couldn't find parent pattern to recursively parse, with the name ${this.name}.`, cursor.index, this));
                  return null;
              }
              this.pattern = pattern.clone();
              this.pattern.parent = this;
          }
          const node = this.pattern.parse(cursor);
          if (!cursor.hasUnresolvedError() && node != null) {
              cursor.addMatch(this, node);
          }
          return node;
      }
      clone(name) {
          if (typeof name !== "string") {
              name = this.name;
          }
          return new RecursivePattern(name);
      }
      getTokenValue() {
          var _a;
          return ((_a = this.getPattern()) === null || _a === void 0 ? void 0 : _a.getTokenValue()) || null;
      }
      getTokens() {
          var _a;
          if (!this.isRecursing) {
              this.isRecursing = true;
              const tokens = ((_a = this.getPattern()) === null || _a === void 0 ? void 0 : _a.getTokens()) || [];
              this.isRecursing = false;
              return tokens;
          }
          return [];
      }
  }

  class Visitor {
      constructor(root = null, selectedNodes = []) {
          this.root = root;
          this.selectedNodes = selectedNodes;
      }
      flatten() {
          this.selectedNodes.forEach((node) => {
              if (node.isComposite) {
                  const children = [];
                  Visitor.walkUp(node, (descendant) => {
                      if (!descendant.isComposite) {
                          children.push(descendant);
                      }
                  });
                  node.children = children;
              }
          });
          return this;
      }
      remove() {
          if (this.root == null) {
              return this;
          }
          this.recursiveRemove(this.root);
          return this;
      }
      recursiveRemove(node) {
          const nodesToRemove = this.selectedNodes;
          if (node.isComposite && Array.isArray(node.children)) {
              for (let x = 0; x < node.children.length; x++) {
                  if (nodesToRemove.indexOf(node.children[x]) > -1) {
                      node.children.splice(x, 1);
                      x--;
                  }
                  else {
                      this.recursiveRemove(node.children[x]);
                  }
              }
          }
      }
      wrap(callback) {
          const visitor = new Visitor(this.root);
          visitor.selectRoot().transform((node) => {
              if (this.selectedNodes.includes(node)) {
                  return callback(node);
              }
              return node;
          });
          return this;
      }
      unwrap() {
          if (this.root == null) {
              return this;
          }
          Visitor.walkDown(this.root, (node, stack) => {
              if (this.selectedNodes.includes(node)) {
                  const parent = stack[stack.length - 1];
                  const grandParent = stack[stack.length - 2];
                  if (parent != null && grandParent != null) {
                      const index = grandParent.children.indexOf(parent);
                      if (index > -1) {
                          grandParent.children.splice(index, 1, ...parent.children);
                      }
                  }
              }
          });
          return this;
      }
      prepend(callback) {
          if (this.root == null) {
              return this;
          }
          Visitor.walkUp(this.root, (node, stack) => {
              if (this.selectedNodes.includes(node)) {
                  const parent = stack[stack.length - 1];
                  if (parent != null) {
                      const index = parent.children.indexOf(node);
                      if (index > -1) {
                          parent.children.splice(index, 0, callback(node));
                      }
                  }
              }
          });
          return this;
      }
      append(callback) {
          if (this.root == null) {
              return this;
          }
          Visitor.walkDown(this.root, (node, stack) => {
              if (this.selectedNodes.includes(node)) {
                  const parent = stack[stack.length - 1];
                  if (parent != null) {
                      const index = parent.children.indexOf(node);
                      if (index > -1) {
                          parent.children.splice(index + 1, 0, callback(node));
                      }
                  }
              }
          });
          return this;
      }
      transform(callback) {
          this.selectedNodes.forEach((node) => {
              return this.recursiveTransform(node, callback);
          });
          return this;
      }
      recursiveTransform(node, callback) {
          if (node.isComposite && Array.isArray(node.children)) {
              const length = node.children.length;
              for (let x = 0; x < length; x++) {
                  node.children[x] = this.recursiveTransform(node.children[x], callback);
              }
          }
          return callback(node);
      }
      selectAll() {
          return this.select((n) => true);
      }
      selectNode(node) {
          return new Visitor(this.root, [...this.selectedNodes, node]);
      }
      deselectNode(node) {
          const visitor = new Visitor(this.root, this.selectedNodes.slice());
          return visitor.filter((n) => n !== node);
      }
      select(callback) {
          if (this.root == null) {
              return this;
          }
          const node = this.root;
          const selectedNodes = [];
          if (node.isComposite) {
              Visitor.walkDown(node, (descendant) => {
                  if (callback(descendant)) {
                      selectedNodes.push(descendant);
                  }
              });
          }
          return new Visitor(this.root, selectedNodes);
      }
      forEach(callback) {
          this.selectedNodes.forEach(callback);
          return this;
      }
      filter(callback) {
          return new Visitor(this.root, this.selectedNodes.filter(callback));
      }
      map(callback) {
          return new Visitor(this.root, this.selectedNodes.map(callback));
      }
      selectRoot() {
          if (this.root == null) {
              return this;
          }
          return new Visitor(this.root, [this.root]);
      }
      first() {
          return this.get(0);
      }
      last() {
          return this.get(this.selectedNodes.length - 1);
      }
      get(index) {
          const node = this.selectedNodes[index];
          if (node == null) {
              throw new Error(`Couldn't find node at index: ${index}, out of ${this.selectedNodes.length}.`);
          }
          return new Visitor(node, []);
      }
      clear() {
          this.selectedNodes = [];
          return this;
      }
      setRoot(root) {
          this.root = root;
          return this;
      }
      static select(root, callback) {
          if (callback != null) {
              return new Visitor(root).select(callback);
          }
          else {
              return new Visitor(root);
          }
      }
      static walkUp(node, callback, ancestors = []) {
          ancestors.push(node);
          if (node.isComposite && Array.isArray(node.children)) {
              const children = node.children.slice();
              children.forEach((c) => this.walkUp(c, callback, ancestors));
          }
          ancestors.pop();
          callback(node, ancestors);
          return this;
      }
      static walkDown(node, callback, ancestors = []) {
          callback(node, ancestors);
          ancestors.push(node);
          if (node.isComposite && Array.isArray(node.children)) {
              const children = node.children.slice();
              children.forEach((c) => this.walkDown(c, callback, ancestors));
          }
          ancestors.pop();
          return this;
      }
  }

  const divider = new RegexValue("divider", "\\s*[,]\\s*");

  const number = new RegexValue("number", "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?");

  const unitType = new RegexValue("unit-type", "[a-zA-Z%]+");
  const unit = new AndComposite("unit", [number, unitType]);

  const hex = new RegexValue("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");

  const name = new RegexValue("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

  const space$1 = new Literal("optional-space", " ");
  const spaces$1 = new RepeatValue("optional-spaces", space$1);
  const optionalSpaces = new OptionalValue(spaces$1);

  const openParen = new Literal("open-paren", "(");
  const closeParen = new Literal("close-paren", ")");
  const values$1 = new RecursivePattern("values");
  const args = new RepeatComposite("arguments", values$1, divider);
  const optionalArgs = new OptionalComposite(args);
  const method = new AndComposite("method", [
      name,
      openParen,
      optionalSpaces,
      optionalArgs,
      optionalSpaces,
      closeParen
  ]);

  const openBracket = new Literal("open-square-bracket", "[");
  const closeBracket = new Literal("close-square-bracket", "]");
  const items = new RepeatComposite("items", number, divider);
  const array = new AndComposite("array", [
      openBracket,
      optionalSpaces,
      items,
      optionalSpaces,
      closeBracket,
  ]);

  const value = new OrComposite("value", [
      array,
      hex,
      method,
      unit,
      number,
      name,
  ]);

  const space = new Literal("space", " ");
  const spaces = new RepeatValue("spaces", space);

  const values = new RepeatComposite("values", value, spaces);

  const cssValue = new RepeatComposite("css-value", values, divider);

  const visitor = new Visitor();
  const keyframesGenerator = new KeyframesGenerator();
  keyframesGenerator.setTransformValue((value) => {
      return convertToValue(value);
  });
  const convertToValue = (value) => {
      const node = cssValue.exec(value);
      if (node == null) {
          return [];
      }
      visitor
          .setRoot(node)
          .selectRoot()
          .flatten()
          .clear()
          .select((n) => n.name === "optional-spaces")
          .remove()
          .clear()
          .select((n) => n.name === "spaces")
          .transform((n) => {
          n.value = " ";
          return n;
      });
      return node.children.map((n) => {
          if (n.name === "number") {
              return parseFloat(n.value);
          }
          else {
              return n.value;
          }
      });
  };
  class CssKeyframe extends Keyframe {
      constructor(_a) {
          var { from, to, easing = "linear", controls = [] } = _a, config = __rest(_a, ["from", "to", "easing", "controls"]);
          const toValue = convertToValue(to);
          const fromValue = convertToValue(from);
          const controlsValues = controls.map((c) => convertToValue(c));
          const easingValue = easings[easing];
          super(Object.assign(Object.assign({}, config), { from: fromValue, to: toValue, controls: controlsValues, easing: easingValue }));
      }
      static createKeyframes(animationKeyframes) {
          return keyframesGenerator.generate(animationKeyframes);
      }
  }

  const emptyFn$1 = () => 0;
  class ObjectVisitor {
      constructor(callback = emptyFn$1) {
          this.visitor = emptyFn$1;
          this.setVisitor(callback);
      }
      visit(object) {
          this.walk(object);
      }
      walk(object) {
          if (typeof object === "object" && object != null) {
              for (let key in object) {
                  if (typeof object[key] === "number") {
                      object[key] = this.visitor(object[key]);
                  }
                  else if (typeof object[key] === "object") {
                      this.walk(object[key]);
                  }
              }
          }
      }
      setVisitor(visitor) {
          if (typeof visitor === "function") {
              this.visitor = visitor;
          }
          else {
              this.visitor = emptyFn$1;
          }
          this.visitor = visitor;
      }
  }

  const emptyFn = () => 0;
  class ObjectsVisitor {
      constructor(callback = emptyFn) {
          this.visitor = emptyFn;
          this.setVisitor(callback);
      }
      visit(left, right, output) {
          this.walk(left, right, output);
      }
      walk(left, right, output) {
          if (typeof left === "object" && left != null) {
              for (let key in left) {
                  if (typeof left[key] === "number" &&
                      typeof right[key] === "number" &&
                      typeof output[key] === "number") {
                      output[key] = this.visitor(left[key], right[key]);
                  }
                  else if (typeof left[key] === "object") {
                      this.walk(left[key], right[key], output[key]);
                  }
              }
          }
      }
      setVisitor(visitor) {
          if (typeof visitor === "function") {
              this.visitor = visitor;
          }
          else {
              this.visitor = emptyFn;
          }
          this.visitor = visitor;
      }
  }

  const add = (left, right) => {
      return left + right;
  };
  const subtract = (left, right) => {
      return left - right;
  };
  const multiply = (left, right) => {
      return left * right;
  };
  const divide = (left, right) => {
      return left / right;
  };
  class ObjectOperator {
      constructor() {
          this.objectsVisitor = new ObjectsVisitor();
          this.visitor = new ObjectVisitor();
      }
      assign(object, number) {
          this.visitor.setVisitor(() => {
              return number;
          });
          this.visitor.visit(object);
      }
      add(left, right, output) {
          this.objectsVisitor.setVisitor(add);
          this.objectsVisitor.visit(left, right, output);
      }
      subtract(left, right, output) {
          this.objectsVisitor.setVisitor(subtract);
          this.objectsVisitor.visit(left, right, output);
      }
      multiply(left, right, output) {
          this.objectsVisitor.setVisitor(multiply);
          this.objectsVisitor.visit(left, right, output);
      }
      divide(left, right, output) {
          this.objectsVisitor.setVisitor(divide);
          this.objectsVisitor.visit(left, right, output);
      }
  }

  const nullableAnimation = new Animation("null", [
      new Keyframe({ from: 0, to: 0, property: "null" }),
  ]);
  const objectOperator = new ObjectOperator();
  const FORWARD = 1;
  class SlopeAnimationBuilder {
      constructor() {
          this.direction = 0;
          this.newDuration = 0;
          this.duration = 0;
          this.offset = 0;
          this.delta = 0.01;
          this.animation = nullableAnimation;
      }
      cloneValues(values) {
          return JSON.parse(JSON.stringify(values));
      }
      build(animation, offset, duration, newDuration, direction) {
          this.animation = animation;
          this.offset = offset;
          this.duration = duration;
          this.newDuration = newDuration;
          this.direction = direction;
          // If the offset is at or near the end get the last slope. We
          if (this.offset + this.delta > 1) {
              this.offset -= this.delta;
          }
          this.calculate();
          this.createSlopeTimeline();
          return this.slopeAnimation;
      }
      cacheValues() {
          this.deltaStepValues = this.cloneValues(this.nowValues);
          this.scaleValues = this.cloneValues(this.nowValues);
          this.dynamicValues = this.cloneValues(this.nowValues);
          this.cacheDeltaStepValues();
          this.cacheScaleValues();
      }
      cacheDeltaStepValues() {
          Object.keys(this.deltaStepValues).forEach((property) => {
              objectOperator.assign(this.deltaStepValues[property], this.delta);
          });
      }
      cacheScaleValues() {
          const scale = this.newDuration / this.duration;
          Object.keys(this.scaleValues).forEach((property) => {
              objectOperator.assign(this.scaleValues[property], scale);
          });
      }
      cacheDeltaValueForward() {
          this.animation.update(this.offset + this.delta);
          this.deltaValues = this.cloneValues(this.animation.currentValues);
      }
      cacheDeltaValueStopped() {
          this.animation.update(this.offset);
          this.deltaValues = this.cloneValues(this.animation.currentValues);
      }
      calculate() {
          this.animation.update(this.offset);
          this.nowValues = this.cloneValues(this.animation.currentValues);
          this.toValues = this.cloneValues(this.nowValues);
          if (this.direction === FORWARD) {
              this.cacheDeltaValueForward();
          }
          else {
              this.cacheDeltaValueStopped();
          }
          Object.keys(this.nowValues).forEach((property) => {
              const value = this.nowValues[property];
              if (typeof value === "object" && value != null) {
                  this.cacheValues();
                  this.calculateObject(property);
              }
              else {
                  this.calculatePrimitive(property);
              }
          });
      }
      calculatePrimitive(property) {
          const now = this.nowValues[property];
          const dxNow = this.deltaValues[property];
          const scale = this.newDuration / this.duration;
          const diff = dxNow - now;
          const derivative = diff / this.delta;
          const scaled = derivative * scale;
          const to = now + scaled;
          this.toValues[property] = to;
      }
      calculateObject(property) {
          const now = this.nowValues[property];
          const delta = this.deltaValues[property];
          const deltaStep = this.deltaStepValues[property];
          const scale = this.scaleValues[property];
          const dynamicValue = this.dynamicValues[property];
          const to = this.toValues[property];
          objectOperator.subtract(delta, now, dynamicValue);
          objectOperator.divide(dynamicValue, deltaStep, dynamicValue);
          objectOperator.multiply(dynamicValue, scale, dynamicValue);
          objectOperator.add(now, dynamicValue, to);
          this.toValues[property] = to;
      }
      createSlopeTimeline() {
          const keyframes = Object.keys(this.nowValues)
              .map((property) => {
              return new Keyframe({
                  property,
                  from: this.nowValues[property],
                  controls: [],
                  to: this.toValues[property],
                  startAt: 0,
                  endAt: 1,
                  easing: easings.linear,
              });
          })
              .flat();
          this.slopeAnimation = new Animation("slope", keyframes);
      }
  }

  const slopeAnimationBuilder = new SlopeAnimationBuilder();
  class ExtendedAnimation {
      constructor(animation, animationDuration, offset, playerState, extendedDuration = 0) {
          this.animation = animation;
          this.animationDuration = animationDuration;
          this.offset = offset;
          this.playerState = playerState;
          this.extendedDuration = extendedDuration;
          this.currentValues = this.animation.currentValues;
          this.name = this.animation.name;
          this.slopeAnimation = slopeAnimationBuilder.build(this.animation, 1, animationDuration, extendedDuration, playerState);
      }
      update(time) {
          const offsetTime = this.offset + time;
          if (offsetTime + slopeAnimationBuilder.delta > 1) {
              if (this.slopeAnimation == null) {
                  return this;
              }
              const overflowTime = offsetTime + slopeAnimationBuilder.delta - 1;
              this.slopeAnimation.update(overflowTime);
              this.currentValues = this.slopeAnimation.currentValues;
          }
          else {
              if (this.animation == null) {
                  return this;
              }
              this.animation.update(offsetTime);
              this.currentValues = this.animation.currentValues;
          }
          return this;
      }
      clone() {
          return new ExtendedAnimation(this.animation.clone(), this.animationDuration, this.offset, this.playerState, this.extendedDuration);
      }
  }

  class BlendedAnimation extends Animation {
      constructor(fromAnimation, toAnimation, easing = easings.linear) {
          const fromValues = fromAnimation.currentValues;
          const toValues = toAnimation.currentValues;
          const properties = Object.keys(fromValues);
          const keyframes = properties
              .map((name) => {
              const from = fromValues[name];
              const to = toValues[name];
              if (to == null) {
                  throw new Error(`Blended animations need to have the same properties to animate.  From Animation: ${JSON.stringify(Object.keys(from))}, To Animation: ${JSON.stringify(Object.keys(to))}`);
              }
              return new Keyframe({
                  property: name,
                  startAt: 0,
                  endAt: 1,
                  from,
                  to,
                  controls: [],
                  easing: easing || easings.linear,
              });
          })
              .flat();
          super(`blended`, keyframes);
          this.easing = easing;
          this.properties = properties;
          this.fromAnimation = fromAnimation;
          this.toAnimation = toAnimation;
      }
      updateKeyframes() {
          const length = this.properties.length;
          for (let x = 0; x < length; x++) {
              const animator = this.animators[x];
              const property = animator.keyframe.property;
              const keyframe = animator.keyframe;
              keyframe.to = this.toAnimation.currentValues[property];
              keyframe.from = this.fromAnimation.currentValues[property];
          }
      }
      update(time) {
          this.fromAnimation.update(time);
          this.toAnimation.update(time);
          this.updateKeyframes();
          super.update(time);
          return this;
      }
      clone() {
          return new BlendedAnimation(this.fromAnimation.clone(), this.toAnimation.clone(), this.easing);
      }
  }

  class StatefulMotion {
      constructor() {
          this.currentState = null;
          this.states = {};
          this.observer = null;
          this.segueObserver = null;
          this.player = new Player();
      }
      registerState(name, state) {
          this.states[name] = state;
      }
      registerStates(states) {
          Object.keys(states).forEach((name) => this.registerState(name, states[name]));
      }
      isFallThrough(name) {
          if (this.currentState == null) {
              return false;
          }
          const allFallThroughStates = this.getFallThrough(name, []);
          return allFallThroughStates.includes(this.currentState);
      }
      getFallThrough(name, stack) {
          const state = this.states[name];
          if (state != null && typeof state.segueTo === "string") {
              stack.push(state.segueTo);
              this.getFallThrough(state.segueTo, stack);
          }
          return stack;
      }
      changeState(name) {
          var _a, _b;
          const state = this.states[name];
          if (this.isFallThrough(name) ||
              state == null ||
              this.currentState === name) {
              return this;
          }
          this.currentState = name;
          (_a = this.observer) === null || _a === void 0 ? void 0 : _a.dispose();
          (_b = this.segueObserver) === null || _b === void 0 ? void 0 : _b.dispose();
          if (this.player.animation == null) {
              this.player.animation = state.animation.clone();
          }
          else {
              const remainingDuration = (1 - this.player.time) * this.states[this.currentState].duration;
              const extendedDuration = state.transitionDuration - remainingDuration;
              const from = new ExtendedAnimation(this.player.animation, this.player.duration, this.player.time, this.player.state, extendedDuration);
              this.player.animation = new BlendedAnimation(from, state.animation.clone(), easings[state.transitionEasing]);
          }
          this.player.seek(0);
          this.player.duration = state.transitionDuration;
          this.player.iterations = 0;
          this.player.repeat = Infinity;
          this.observer = this.player.observeTimeOnce(1, () => {
              this.player.animation = state.animation.clone();
              this.player.duration = state.duration;
              this.player.repeat = state.iterationCount;
          });
          this.segueObserver = this.player.observeTime(1, () => {
              if (this.player.iterations >= state.iterationCount &&
                  typeof state.segueTo === "string" &&
                  this.states[state.segueTo]) {
                  this.changeState(state.segueTo);
              }
          });
          this.player.play();
          return this;
      }
  }

  exports.Animation = Animation;
  exports.Animator = Animator;
  exports.BezierCurve = BezierCurve;
  exports.CssKeyframe = CssKeyframe;
  exports.Keyframe = Keyframe;
  exports.Player = Player;
  exports.StatefulMotion = StatefulMotion;
  exports.createDynamicEasing = createDynamicEasing;
  exports.easings = easings;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.browser.js.map
