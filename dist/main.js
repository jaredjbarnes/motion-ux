(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["motionUX"] = factory();
	else
		root["motionUX"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Timeline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return _Timeline_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easings", function() { return _easings_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var _DefaultClock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _TimelineOption_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _Scrubber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _AnimatorCreator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





const defaultClock = new _DefaultClock_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

class Timeline {
  static get repeatDirections() {
    return _Scrubber_js__WEBPACK_IMPORTED_MODULE_2__["default"].repeatDirections;
  }

  constructor({ animations, duration, clock = defaultClock }) {
    this.clock = clock;
    this.adjustmentAnimators = [];
    this.render = this.render.bind(this);
    this.scrubber = new _Scrubber_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      clock,
      duration,
      render: this.render
    });
    this.duration = duration;
    this.animators = new _AnimatorCreator_js__WEBPACK_IMPORTED_MODULE_3__["default"](animations).getAnimators();
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
    return this.scrubber.observeTime.apply(this.scrubber, arguments);
  }

  observe() {
    return this.scrubber.observe.apply(this.scrubber, arguments);
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultClock; });
class DefaultClock {
  requestAnimationFrame(callback) {
    return requestAnimationFrame(callback);
  }

  cancelAnimationFrame(id) {
    return cancelAnimationFrame(id);
  }

  now() {
    return performance.now();
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimelineOption; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class TimelineOption {
  constructor(animation) {
    this.target = animation.target;
    this.name = animation.name;
    this.to = animation.to;
    this.from = animation.from;
    this.startAt = animation.startAt;
    this.endAt = animation.endAt;
    this.easing = animation.easing;
    this.controls = animation.controls;

    if (typeof easing === "string") {
      this.easing = _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"][easing];
    }

    if (!Array.isArray(this.controls)) {
      this.controls = [];
    }

    this.easing = this.easing || _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"].linear;

    this.validate();
  }

  validate() {
    if (typeof this.name !== "string") {
      throw new Error(`The "name" property needs to be a string.`);
    }

    if (this.to == null) {
      throw new Error(`The "to" property cannot be null or undefined.`);
    }

    if (this.from == null) {
      throw new Error(`The "from" property cannot be null or undefined.`);
    }

    if (typeof this.target !== "object" || this.target == null) {
      throw new Error(
        `Invalid Arguments: The "target" property needs to be an object.`
      );
    }

    if (
      typeof this.startAt !== "number" ||
      this.startAt < 0 ||
      this.startAt > 1
    ) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }

    if (typeof this.endAt !== "number" || this.endAt < 0 || this.endAt > 1) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }

    if (typeof this.easing !== "function") {
      throw new Error(`The "easing" property must be a function.`);
    }
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const easings = {
    easeInQuad: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (t, b, c, d) {
        return c - easings.easeOutBounce(d - t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (t, b, c, d) {
        if (t < d / 2) return easings.easeInBounce(t * 2, 0, c, d) * .5 + b;
        return easings.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
    linear: function (t, b, c, d) {
        return c * t / d + b;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (easings);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scrubber; });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const repeatDirections = {
  DEFAULT: 0,
  ALTERNATE: 1
};

const states = {
  FORWARD: 1,
  REVERSE: -1,
  STOPPED: 0
};

class Scrubber extends _Observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      this.clock.cancelAnimationFrame(this._animationFrame);
    }
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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _TimeObserver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



class Observable {
    constructor(){
        this.observers = [];
    }

    observeTime(time, callback){
        const observer = new _TimeObserver_js__WEBPACK_IMPORTED_MODULE_1__["default"](time, callback, ()=>{
            const index = this.observers.indexOf(observer);
            if (index > -1){
                this.observers.splice(index, 1);
            }
        });

        this.observers.push(observer);
        return observer;
    }

    observe(type, callback){
        const observer = new _Observer_js__WEBPACK_IMPORTED_MODULE_0__["default"](type, callback, ()=>{
            const index = this.observers.indexOf(observer);
            if (index > -1){
                this.observers.splice(index, 1);
            }
        });

        this.observers.push(observer);
        return observer;
    }

    notify(event){
        this.observers.forEach((observer)=>{
            observer.notify(event);
        })
    }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observer; });

const states = {
    ACTIVE: 1,
    STOPPED: 0,
    DISPOSED: -1
};

class Observer {
    constructor(type, callback, unbind){
        this.type = type;
        this.callback = callback;
        this.unbind = unbind;
        this.state = states.ACTIVE;
    }

    notify(event){
        if (event.type === this.type){
            this.callback(event);
        } 
    }

    stop(){
        if (this.state === states.ACTIVE){
            this.state = states.STOPPED;
        }
    }

    start(){
        if (this.state !== states.DISPOSED){
            this.state = states.ACTIVE;
        }
    }

    dispose(){
        this.state = states.DISPOSED;
        this.unbind();
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeObserver; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class TimeObserver extends _Observer_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(time, callback, unbind){
        super(null, callback, unbind);
        this.time = time;
    }

    notify(event){
        if (typeof event.lastProgress === "number" && typeof event.progress === "number"){
            const high = Math.max(event.progress, event.lastProgress);
            const low = Math.min(event.progress, event.lastProgress);

            if (this.time >= low && this.time <= high){
                this.callback(event);
            }
        }
    }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimatorCreator; });
/* harmony import */ var _animators_ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _patterns_values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TimelineOption_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);





class AnimatorCreator {
  constructor(animationOptions) {
    this.animationOptions = animationOptions;

    this._assertAnimationOptions();
    this._convertAnimationsToTimelineOptions();
    this._sortTimelineOptions();
    this._createAnimators();
  }

  _assertAnimationOptions() {
    if (!Array.isArray(this.animationOptions)) {
      throw new Error("Expected animations to be an array.");
    }
  }

  _convertAnimationsToTimelineOptions() {
    this.timelineOptions = this.animationOptions.map(
      animationOption => new _TimelineOption_js__WEBPACK_IMPORTED_MODULE_3__["default"](animationOption)
    );
  }

  _sortTimelineOptions() {
    this.timelineOptions.sort((a, b) => {
      return a.startAt - b.startAt;
    });
  }

  _createAnimators() {
    this.animators = this.timelineOptions.map(options => {
      let points = [options.from, ...options.controls, options.to];
      let controls;

      controls = points.map(point => {
        const cursor = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2__["Cursor"](point);
        const node = _patterns_values_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(cursor);

        if (cursor.hasUnresolvedError()) {
          throw new Error(
            `Parse Error: could not parse css ${options.controls}`
          );
        }

        return node;
      });

      return new _animators_ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        ...options,
        controls
      });
    });
  }

  getAnimators() {
    return this.animators;
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValuesNodeAnimator; });
/* harmony import */ var _NumberNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _HexNodeAnimator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _UnitNodeAnimator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _MethodNodeAnimator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _NameNodeAnimator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);






class ValuesNodeAnimator {
  constructor(options) {
    this.options = options;

    this.nameToAnimatorMap = {
      number: _NumberNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"],
      unit: _UnitNodeAnimator_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      method: _MethodNodeAnimator_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      name: _NameNodeAnimator_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      hex: _HexNodeAnimator_js__WEBPACK_IMPORTED_MODULE_1__["default"]
    };

    this.normalizeNodes();
    this.createAnimators();
  }

  createAnimators() {
    this.animators = this.options.controls[0].children.map((node, index) => {
      const controls = this.options.controls.map(node => {
        return node.children[index];
      });

      const options = {
        ...this.options,
        controls
      };

      return new this.nameToAnimatorMap[node.name](options);
    });
  }

  normalizeNodes() {
    this.options.controls.forEach(node => {
      node.children = node.children.filter(node => node.name != "spaces");
    });
  }

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(" ");
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


class NumberNodeAnimator {
  constructor(options) {
    this.animator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...options,
      controls: options.controls.map(node => parseFloat(node.value))
    });
  }

  render(progress) {
    return this.animator.render(progress);
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberAnimator; });
/* harmony import */ var _BezierCurve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class NumberAnimator {
  constructor(options) {
    this.controls = Array.isArray(options.controls) ? options.controls : [];
    this.options = options;
    this.bezierCurve = new _BezierCurve__WEBPACK_IMPORTED_MODULE_0__["default"](this.controls);
  }

  render(progress) {
    if (progress <= this.options.startAt) {
      return this.controls[0];
    }

    if (progress >= this.options.endAt) {
      return this.controls[this.controls.length - 1];
    }

    const relativeProgress = progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;
    const progressWithEasing = this.options.easing(
      relativeProgress,
      0,
      1,
      duration
    );

    const value = this.bezierCurve.valueAt(progressWithEasing);
    return value;
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BezierCurve; });
class BezierCurve {
  constructor(points) {
    this.points = points;
    this.percentage = 0;
  }

  reduceToPoint(points) {
    const reducedPoints = points.reduce((reducedPoints, point, index) => {
      if (index !== points.length - 1) {
        const nextPoint = points[index + 1];
        reducedPoints.push((nextPoint - point) * this.percentage + point);
      }

      return reducedPoints;
    }, []);

    if (reducedPoints.length > 1) {
      return this.reduceToPoint(reducedPoints);
    }

    return reducedPoints[0];
  }

  valueAt(percentage) {
    this.percentage = percentage;

    this.validatePoints();
    return this.reduceToPoint(this.points);
  }

  validatePoints() {
    if (this.points.length < 2) {
      throw new Error("Invalid Points: The points need to be at least two.");
    }

    const controlPoints = this.points.slice(1, this.points.length - 2);

    controlPoints.forEach(point => this.assertValidPoint(point));
  }

  assertValidPoint(point) {
    if (typeof point !== "number") {
      throw new Error("Invalid point: Points need to be numbers.");
    }
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HexNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

class HexNodeAnimator {
  constructor(options) {
    this.options = options;
    this.progress = null;
    this.duration = null;

    this.parseValues();
    this.createAnimators();
  }

  parseValues() {
    const values = this.options.controls.map(node => {
      return this.hexToRgb(this.convertToFullHex(node.value));
    });

    const { reds, greens, blues } = values.reduce(
      (acc, rgb) => {
        acc.reds.push(rgb[0]);
        acc.greens.push(rgb[1]);
        acc.blues.push(rgb[2]);
        return acc;
      },
      {
        reds: [],
        greens: [],
        blues: []
      }
    );

    this.reds = reds;
    this.greens = greens;
    this.blues = blues;
  }

  convertToFullHex(value) {
    if (value.length === 4) {
      value = value + value.substring(1);
    }
    return value;
  }

  hexToRgb(hex) {
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : null;
  }

  numberToHex(number) {
    if (number > 255) {
      number = 255;
    }

    if (number < 0) {
      number = 0;
    }

    let hex = number.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  }

  createAnimators() {
    this.redAnimator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...this.options,
      controls: this.reds
    });

    this.greenAnimator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...this.options,
      controls: this.greens
    });

    this.blueAnimator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...this.options,
      controls: this.blues
    });
  }

  render(progress) {
    const red = this.numberToHex(Math.round(this.redAnimator.render(progress)));

    const green = this.numberToHex(
      Math.round(this.greenAnimator.render(progress))
    );

    const blue = this.numberToHex(
      Math.round(this.blueAnimator.render(progress))
    );

    return `#${red}${green}${blue}`;
  }
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnitNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


class UnitNodeAnimator {
  constructor(options) {
    this.options = options;

    this.animator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...options,
      controls: options.controls.map(node =>
        parseInt(node.children[0].value, 10)
      )
    });
  }

  render(progress) {
    const value = this.animator.render(progress);
    const unit = this.options.controls[0].children[1].value;
    return `${value}${unit}`;
  }
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MethodNodeAnimator; });
/* harmony import */ var _ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


class MethodNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createArgs();
    this.createAnimators();
  }

  createArgs() {
    this.args = this.options.controls.map(node => {
      return node.children
        .find(node => node.name === "arguments")
        .children.filter(node => node.name === "values");
    });
  }

  createAnimators() {
    this.animators = this.args[0].map((_, index) => {
      const controls = this.args.map(arg => {
        return arg[index];
      });

      return new _ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        ...this.options,
        controls: controls
      });
    });
  }

  render(progress) {
    const methodName = this.getMethodName();
    const args = this.getArgs(progress);

    return `${methodName}(${args})`;
  }

  getArgs(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }

  getMethodName() {
    return this.options.controls[0].children.find(node => node.name === "name")
      .value;
  }
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NameNodeAnimator; });
class NameNodeAnimator {
  constructor(options) {
    this.options = options;
  }

  render(progress) {
    if (progress > 0) {
      return this.options.controls[1].value;
    } else {
      return this.options.controls[0].value;
    }
  }
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
;


const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("spaces", space);
const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("values", _value_js__WEBPACK_IMPORTED_MODULE_1__["default"], spaces);

/* harmony default export */ __webpack_exports__["default"] = (values);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Mark", {
  enumerable: true,
  get: function get() {
    return _Mark.default;
  }
});
Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _Node.default;
  }
});
Object.defineProperty(exports, "CompositeNode", {
  enumerable: true,
  get: function get() {
    return _CompositeNode.default;
  }
});
Object.defineProperty(exports, "ValueNode", {
  enumerable: true,
  get: function get() {
    return _ValueNode.default;
  }
});
Object.defineProperty(exports, "Cursor", {
  enumerable: true,
  get: function get() {
    return _Cursor.default;
  }
});
Object.defineProperty(exports, "AndValue", {
  enumerable: true,
  get: function get() {
    return _AndValue.default;
  }
});
Object.defineProperty(exports, "AnyOfThese", {
  enumerable: true,
  get: function get() {
    return _AnyOfThese.default;
  }
});
Object.defineProperty(exports, "Literal", {
  enumerable: true,
  get: function get() {
    return _Literal.default;
  }
});
Object.defineProperty(exports, "NotValue", {
  enumerable: true,
  get: function get() {
    return _NotValue.default;
  }
});
Object.defineProperty(exports, "OptionalValue", {
  enumerable: true,
  get: function get() {
    return _OptionalValue.default;
  }
});
Object.defineProperty(exports, "OrValue", {
  enumerable: true,
  get: function get() {
    return _OrValue.default;
  }
});
Object.defineProperty(exports, "RepeatValue", {
  enumerable: true,
  get: function get() {
    return _RepeatValue.default;
  }
});
Object.defineProperty(exports, "ValuePattern", {
  enumerable: true,
  get: function get() {
    return _ValuePattern.default;
  }
});
Object.defineProperty(exports, "AndComposite", {
  enumerable: true,
  get: function get() {
    return _AndComposite.default;
  }
});
Object.defineProperty(exports, "CompositePattern", {
  enumerable: true,
  get: function get() {
    return _CompositePattern.default;
  }
});
Object.defineProperty(exports, "OptionalComposite", {
  enumerable: true,
  get: function get() {
    return _OptionalComposite.default;
  }
});
Object.defineProperty(exports, "OrComposite", {
  enumerable: true,
  get: function get() {
    return _OrComposite.default;
  }
});
Object.defineProperty(exports, "RepeatComposite", {
  enumerable: true,
  get: function get() {
    return _RepeatComposite.default;
  }
});
Object.defineProperty(exports, "ParseError", {
  enumerable: true,
  get: function get() {
    return _ParseError.default;
  }
});
Object.defineProperty(exports, "Pattern", {
  enumerable: true,
  get: function get() {
    return _Pattern.default;
  }
});
Object.defineProperty(exports, "StackInformation", {
  enumerable: true,
  get: function get() {
    return _StackInformation.default;
  }
});
Object.defineProperty(exports, "RecursivePattern", {
  enumerable: true,
  get: function get() {
    return _RecursivePattern.default;
  }
});

var _Mark = _interopRequireDefault(__webpack_require__(21));

var _Node = _interopRequireDefault(__webpack_require__(22));

var _CompositeNode = _interopRequireDefault(__webpack_require__(23));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _AndValue = _interopRequireDefault(__webpack_require__(26));

var _AnyOfThese = _interopRequireDefault(__webpack_require__(31));

var _Literal = _interopRequireDefault(__webpack_require__(32));

var _NotValue = _interopRequireDefault(__webpack_require__(33));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OrValue = _interopRequireDefault(__webpack_require__(34));

var _RepeatValue = _interopRequireDefault(__webpack_require__(35));

var _ValuePattern = _interopRequireDefault(__webpack_require__(27));

var _AndComposite = _interopRequireDefault(__webpack_require__(36));

var _CompositePattern = _interopRequireDefault(__webpack_require__(37));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _OrComposite = _interopRequireDefault(__webpack_require__(40));

var _RepeatComposite = _interopRequireDefault(__webpack_require__(41));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

var _StackInformation = _interopRequireDefault(__webpack_require__(38));

var _RecursivePattern = _interopRequireDefault(__webpack_require__(42));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mark = function Mark(cursor, index) {
  _classCallCheck(this, Mark);

  this.cursor = cursor;
  this.index = index;
};

exports.default = Mark;
//# sourceMappingURL=Mark.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node =
/*#__PURE__*/
function () {
  function Node(name, startIndex, endIndex) {
    _classCallCheck(this, Node);

    this.name = name;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (typeof this.startIndex !== "number" || typeof this.endIndex !== "number") {
      throw new Error("Invalid Arguments: startIndex and endIndex need to be number.");
    }
  }

  _createClass(Node, [{
    key: "clone",
    value: function clone() {
      throw new Error("Not Implemented Exception: expected subclass to override this method.");
    }
  }]);

  return Node;
}();

exports.default = Node;
//# sourceMappingURL=Node.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(22));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CompositeNode =
/*#__PURE__*/
function (_Node) {
  _inherits(CompositeNode, _Node);

  function CompositeNode(name) {
    var _this;

    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var endIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, CompositeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompositeNode).call(this, name, startIndex, endIndex));
    _this.children = [];
    return _this;
  }

  _createClass(CompositeNode, [{
    key: "clone",
    value: function clone() {
      var node = new CompositeNode(this.name, this.startIndex, this.endIndex);
      node.children = this.children.map(function (child) {
        return child.clone();
      });
      return node;
    }
  }]);

  return CompositeNode;
}(_Node2.default);

exports.default = CompositeNode;
//# sourceMappingURL=CompositeNode.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(22));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// We might want reference to the pattern on the node.
var ValueNode =
/*#__PURE__*/
function (_Node) {
  _inherits(ValueNode, _Node);

  function ValueNode(name, value) {
    var _this;

    var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, ValueNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ValueNode).call(this, name, startIndex, endIndex));
    _this.value = value;
    return _this;
  }

  _createClass(ValueNode, [{
    key: "clone",
    value: function clone() {
      return new ValueNode(this.name, this.value, this.startIndex, this.endIndex);
    }
  }]);

  return ValueNode;
}(_Node2.default);

exports.default = ValueNode;
//# sourceMappingURL=ValueNode.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mark = _interopRequireDefault(__webpack_require__(21));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cursor =
/*#__PURE__*/
function () {
  function Cursor(string) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        verbose = _ref.verbose;

    _classCallCheck(this, Cursor);

    this.string = string;
    this.index = 0;
    this.length = string.length;
    this.parseError = null;
    this.verbose = typeof verbose === "boolean" ? verbose : false;
    this.isInErrorState = false;
    this.assertValidity();
  }

  _createClass(Cursor, [{
    key: "throwError",
    value: function throwError(parseError) {
      this.isInErrorState = true;

      if (this.parseError == null || parseError.index >= this.parseError.index) {
        this.parseError = parseError;
      }
    }
  }, {
    key: "resolveError",
    value: function resolveError() {
      this.isInErrorState = false;
    }
  }, {
    key: "hasUnresolvedError",
    value: function hasUnresolvedError() {
      return this.isInErrorState;
    }
  }, {
    key: "assertValidity",
    value: function assertValidity() {
      if (this.isNullOrEmpty(this.string)) {
        throw new Error("Illegal Argument: Cursor needs to have a string that has a length greater than 0.");
      }
    }
  }, {
    key: "isNullOrEmpty",
    value: function isNullOrEmpty(value) {
      return value == null || typeof value === "string" && value.length === 0;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this.index + 1 < this.string.length;
    }
  }, {
    key: "hasPrevious",
    value: function hasPrevious() {
      return this.index - 1 >= 0;
    }
  }, {
    key: "next",
    value: function next() {
      if (this.hasNext()) {
        this.index++;
      } else {
        throw new Error("Cursor: Out of Bounds Exception.");
      }
    }
  }, {
    key: "previous",
    value: function previous() {
      if (this.hasPrevious()) {
        this.index--;
      } else {
        throw new Error("Cursor: Out of Bounds Exception.");
      }
    }
  }, {
    key: "mark",
    value: function mark() {
      return new _Mark.default(this, this.index);
    }
  }, {
    key: "moveToMark",
    value: function moveToMark(mark) {
      if (mark instanceof _Mark.default && mark.cursor === this) {
        this.index = mark.index;
        return true;
      } else {
        throw new Error("Illegal Argument: The mark needs to be an instance of Mark and created by this cursor.");
      }
    }
  }, {
    key: "moveToBeginning",
    value: function moveToBeginning() {
      this.index = 0;
    }
  }, {
    key: "moveToLast",
    value: function moveToLast() {
      this.index = this.string.length - 1;
    }
  }, {
    key: "getChar",
    value: function getChar() {
      return this.string.charAt(this.index);
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      if (typeof index === "number") {
        if (index < 0 || index > this.lastIndex()) {
          throw new Error("Cursor: Out of Bounds Exception.");
        }

        this.index = index;
      }
    }
  }, {
    key: "isAtBeginning",
    value: function isAtBeginning() {
      return this.index === 0;
    }
  }, {
    key: "isAtEnd",
    value: function isAtEnd() {
      return this.index === this.string.length - 1;
    }
  }, {
    key: "lastIndex",
    value: function lastIndex() {
      return this.length - 1;
    }
  }]);

  return Cursor;
}();

exports.default = Cursor;
//# sourceMappingURL=Cursor.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AndValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(AndValue, _ValuePattern);

  function AndValue(name, patterns) {
    var _this;

    _classCallCheck(this, AndValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AndValue).call(this, name, patterns));

    _this._assertArguments();

    return _this;
  }

  _createClass(AndValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._children.length < 2) {
        throw new Error("Invalid Argument: AndValue needs to have more than one value pattern.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.index = 0;
      this.nodes = [];
      this.node = null;
      this.cursor = cursor;
      this.mark = this.cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPatterns();

      return this.node;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_tryPatterns",
    value: function _tryPatterns() {
      while (true) {
        var pattern = this._children[this.index];
        var node = pattern.parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          break;
        } else {
          this.nodes.push(node);
        }

        if (!this._next()) {
          this._processValue();

          break;
        }
      }
    }
  }, {
    key: "_next",
    value: function _next() {
      if (this._hasMorePatterns()) {
        if (this.cursor.hasNext()) {
          // If the last result was a failed optional, then don't increment the cursor.
          if (this.nodes[this.nodes.length - 1] != null) {
            this.cursor.next();
          }

          this.index++;
          return true;
        } else if (this.nodes[this.nodes.length - 1] == null) {
          this.index++;
          return true;
        }

        this._assertRestOfPatternsAreOptional();

        return false;
      } else {
        return false;
      }
    }
  }, {
    key: "_hasMorePatterns",
    value: function _hasMorePatterns() {
      return this.index + 1 < this._children.length;
    }
  }, {
    key: "_assertRestOfPatternsAreOptional",
    value: function _assertRestOfPatternsAreOptional() {
      var _this2 = this;

      var areTheRestOptional = this.children.every(function (pattern, index) {
        return index <= _this2.index || pattern instanceof _OptionalValue.default;
      });

      if (!areTheRestOptional) {
        var parseError = new _ParseError.default("Could not match ".concat(this.name, " before string ran out."), this.index, this);
        this.cursor.throwError(parseError);
      }
    }
  }, {
    key: "_processValue",
    value: function _processValue() {
      if (this.cursor.hasUnresolvedError()) {
        this.node = null;
      } else {
        this.nodes = this.nodes.filter(function (node) {
          return node != null;
        });
        var lastNode = this.nodes[this.nodes.length - 1];
        var startIndex = this.mark.index;
        var endIndex = lastNode.endIndex;
        var value = this.nodes.map(function (node) {
          return node.value;
        }).join("");
        this.node = new _ValueNode.default(this.name, value, startIndex, endIndex);
        this.cursor.setIndex(this.node.endIndex);
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new AndValue(name, this._children);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return AndValue;
}(_ValuePattern2.default);

exports.default = AndValue;
//# sourceMappingURL=AndValue.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(28));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ValuePattern =
/*#__PURE__*/
function (_Pattern) {
  _inherits(ValuePattern, _Pattern);

  function ValuePattern(name) {
    var _this;

    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, ValuePattern);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ValuePattern).call(this, name));
    _this._children = children;

    _this._assertPatternArguments();

    _this._cloneChildren();

    _this._assignAsParent();

    return _this;
  }

  _createClass(ValuePattern, [{
    key: "_assertPatternArguments",
    value: function _assertPatternArguments() {
      if (!Array.isArray(this._children)) {
        throw new Error("Invalid Arguments: The patterns argument need to be an array of ValuePattern.");
      }

      var areAllPatterns = this._children.every(function (pattern) {
        return pattern instanceof ValuePattern;
      });

      if (!areAllPatterns) {
        throw new Error("Invalid Argument: All patterns need to be an instance of ValuePattern.");
      }

      if (typeof this.name !== "string") {
        throw new Error("Invalid Argument: ValuePatterns needs to have a name that's a string.");
      }
    }
  }, {
    key: "_cloneChildren",
    value: function _cloneChildren() {
      // We need to clone the patterns so nested patterns can be parsed.
      this._children = this._children.map(function (pattern) {
        return pattern.clone();
      }); // We need to freeze the childen so they aren't modified.

      Object.freeze(this._children);
    }
  }, {
    key: "_assignAsParent",
    value: function _assignAsParent() {
      var _this2 = this;

      this._children.forEach(function (child) {
        return child.parent = _this2;
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      throw new Error("Not Yet Implemented");
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      throw new Error("Not Yet Implemented");
    }
  }]);

  return ValuePattern;
}(_Pattern2.default);

exports.default = ValuePattern;
//# sourceMappingURL=ValuePattern.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pattern =
/*#__PURE__*/
function () {
  function Pattern() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Pattern);

    this._name = name;
    this._parent = null;
    this._children = [];

    this._assertName();
  }

  _createClass(Pattern, [{
    key: "_assertName",
    value: function _assertName() {
      if (typeof this.name !== "string") {
        throw new Error("Invalid Argument: Patterns needs to have a name that's a string.");
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      throw new Error("Method Not Implemented");
    }
  }, {
    key: "_assertChildren",
    value: function _assertChildren() {
      if (!Array.isArray(this._children)) {
        throw new Error("Invalid Arguments: The patterns argument need to be an array of Patterns.");
      }

      var areAllPatterns = this._children.every(function (pattern) {
        return pattern instanceof Pattern;
      });

      if (!areAllPatterns) {
        throw new Error("Invalid Argument: All patterns need to be an instance of Pattern.");
      }

      if (this._children.length < 2) {
        throw new Error("Invalid Argument: Composite Patterns needs to have more than one value pattern.");
      }
    }
  }, {
    key: "_assignAsParent",
    value: function _assignAsParent() {
      var _this = this;

      this._children.forEach(function (child) {
        return child.parent = _this;
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      throw new Error("Method Not Implemented");
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    },
    set: function set(value) {
      if (value instanceof Pattern) {
        this._parent = value;
      }
    }
  }, {
    key: "children",
    get: function get() {
      return this._children;
    },
    set: function set(value) {
      this._children = value;

      this._assertChildren();

      this._assignAsParent();

      this._children = value.map(function (pattern) {
        return pattern.clone();
      });
      Object.freeze(this._children);
    }
  }]);

  return Pattern;
}();

exports.default = Pattern;
//# sourceMappingURL=Pattern.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParseError = function ParseError(message, index, pattern) {
  _classCallCheck(this, ParseError);

  this.message = message;
  this.name = 'ParseError';
  this.index = index;
  this.pattern = pattern;
  this.stack = [];
};

exports.default = ParseError;
//# sourceMappingURL=ParseError.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OptionalValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(OptionalValue, _ValuePattern);

  function OptionalValue(pattern) {
    var _this;

    _classCallCheck(this, OptionalValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OptionalValue).call(this, "optional-value", [pattern]));

    _this._assertArguments();

    return _this;
  }

  _createClass(OptionalValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (!(this.children[0] instanceof _ValuePattern2.default)) {
        throw new Error("Invalid Arguments: Expected a ValuePattern.");
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      var mark = cursor.mark();
      var node = this.children[0].parse(cursor);

      if (cursor.hasUnresolvedError()) {
        cursor.resolveError();
        cursor.moveToMark(mark);
        return null;
      } else {
        return node;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new OptionalValue(this.children[0]);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return OptionalValue;
}(_ValuePattern2.default);

exports.default = OptionalValue;
//# sourceMappingURL=OptionalValue.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnyOfThese =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(AnyOfThese, _ValuePattern);

  function AnyOfThese(name, characters) {
    var _this;

    _classCallCheck(this, AnyOfThese);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnyOfThese).call(this, name));
    _this.characters = characters;

    _this._assertArguments();

    return _this;
  }

  _createClass(AnyOfThese, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (typeof this.characters !== "string") {
        throw new Error("Invalid Arguments: The characters argument needs to be a string of characters.");
      }

      if (this.characters.length < 1) {
        throw new Error("Invalid Arguments: The characters argument needs to be at least one character long.");
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.cursor = cursor;
      this.mark = this.cursor.mark();
      this.node = null;
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      if (this._isMatch()) {
        var value = this.cursor.getChar();
        var index = this.cursor.getIndex();
        this.node = new _ValueNode.default(this.name, value, index, index);
      } else {
        this._processError();
      }
    }
  }, {
    key: "_isMatch",
    value: function _isMatch() {
      return this.characters.indexOf(this.cursor.getChar()) > -1;
    }
  }, {
    key: "_processError",
    value: function _processError() {
      var message = "ParseError: Expected one of these characters, '".concat(this.characters, "' but found '").concat(this.cursor.getChar(), "' while parsing for '").concat(this.name, "'.");
      var parseError = new _ParseError.default(message, this.cursor.getIndex(), this);
      this.cursor.throwError(parseError);
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new AnyOfThese(name, this.characters);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return AnyOfThese;
}(_ValuePattern2.default);

exports.default = AnyOfThese;
//# sourceMappingURL=AnyOfThese.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Literal =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(Literal, _ValuePattern);

  function Literal(name, literal) {
    var _this;

    _classCallCheck(this, Literal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Literal).call(this, name));
    _this.literal = literal;

    _this._assertArguments();

    return _this;
  }

  _createClass(Literal, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (typeof this.literal !== "string") {
        throw new Error("Invalid Arguments: The literal argument needs to be a string of characters.");
      }

      if (this.literal.length < 1) {
        throw new Error("Invalid Arguments: The literalString argument needs to be at least one character long.");
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.cursor = cursor;
      this.mark = this.cursor.mark();
      this.substring = this.cursor.string.substring(this.mark.index, this.mark.index + this.literal.length);
      this.node = null;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      if (this.substring === this.literal) {
        this._processMatch();
      } else {
        this._processError();
      }
    }
  }, {
    key: "_processError",
    value: function _processError() {
      var message = "ParseError: Expected '".concat(this.literal, "' but found '").concat(this.substring, "'.");
      var parseError = new _ParseError.default(message, this.cursor.getIndex(), this);
      this.cursor.throwError(parseError);
    }
  }, {
    key: "_processMatch",
    value: function _processMatch() {
      this.node = new _ValueNode.default(this.name, this.substring, this.mark.index, this.mark.index + this.literal.length - 1);
      this.cursor.setIndex(this.node.endIndex);
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new Literal(name, this.literal);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return Literal;
}(_ValuePattern2.default);

exports.default = Literal;
//# sourceMappingURL=Literal.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NotValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(NotValue, _ValuePattern);

  function NotValue(name, pattern) {
    var _this;

    _classCallCheck(this, NotValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotValue).call(this, name, [pattern]));

    _this._assertArguments();

    return _this;
  }

  _createClass(NotValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (!(this.children[0] instanceof _ValuePattern2.default)) {
        throw new Error("Invalid Arguments: Expected the pattern to be a ValuePattern.");
      }

      if (typeof this.name !== "string") {
        throw new Error("Invalid Arguments: Expected name to be a string.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.match = "";
      this.node = null;
      this.cursor = cursor;
      this.mark = this.cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      while (true) {
        var mark = this.cursor.mark();
        this.children[0].parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          this.cursor.resolveError();
          this.cursor.moveToMark(mark);
          this.match += this.cursor.getChar();
          break;
        } else {
          this.cursor.moveToMark(mark);
          break;
        }
      }

      this._processMatch();
    }
  }, {
    key: "_processMatch",
    value: function _processMatch() {
      if (this.match.length === 0) {
        var parseError = new _ParseError.default("Didn't find any characters that didn't match the ".concat(this.children[0].name, " pattern."), this.mark.index, this);
        this.cursor.throwError(parseError);
      } else {
        this.node = new _ValueNode.default(this.name, this.match, this.mark.index, this.mark.index);
        this.cursor.setIndex(this.node.endIndex);
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new NotValue(name, this.children[0]);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return NotValue;
}(_ValuePattern2.default);

exports.default = NotValue;
//# sourceMappingURL=NotValue.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OrValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(OrValue, _ValuePattern);

  function OrValue(name, patterns) {
    var _this;

    _classCallCheck(this, OrValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrValue).call(this, name, patterns));

    _this._assertArguments();

    return _this;
  }

  _createClass(OrValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._children.length < 2) {
        throw new Error("Invalid Argument: OrValue needs to have more than one value pattern.");
      }

      var hasOptionalChildren = this._children.some(function (pattern) {
        return pattern instanceof _OptionalValue.default;
      });

      if (hasOptionalChildren) {
        throw new Error("OrValues cannot have optional values.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.index = 0;
      this.errors = [];
      this.node = null;
      this.cursor = cursor;
      this.mark = cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      while (true) {
        var pattern = this._children[this.index];
        var node = pattern.parse(this.cursor, this.parseError);

        if (this.cursor.hasUnresolvedError()) {
          if (this.index + 1 < this._children.length) {
            this.cursor.resolveError();
            this.index++;
            this.cursor.moveToMark(this.mark);
          } else {
            this.node = null;
            break;
          }
        } else {
          this.node = new _ValueNode.default(this.name, node.value, node.startIndex, node.endIndex);
          this.cursor.setIndex(this.node.endIndex);
          break;
        }
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new OrValue(name, this._children);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return OrValue;
}(_ValuePattern2.default);

exports.default = OrValue;
//# sourceMappingURL=OrValue.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(24));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RepeatValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(RepeatValue, _ValuePattern);

  function RepeatValue(name, pattern, divider) {
    var _this;

    _classCallCheck(this, RepeatValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RepeatValue).call(this, name, divider != null ? [pattern, divider] : [pattern]));
    _this._pattern = _this.children[0];
    _this._divider = _this.children[1];

    _this._assertArguments();

    return _this;
  }

  _createClass(RepeatValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._pattern instanceof _OptionalValue.default) {
        throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.nodes = [];
      this.cursor = cursor;
      this.mark = this.cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      while (true) {
        var node = this._pattern.parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          this._processMatch();

          break;
        } else {
          this.nodes.push(node);

          if (node.endIndex === this.cursor.lastIndex()) {
            this._processMatch();

            break;
          }

          this.cursor.next();

          if (this._divider != null) {
            var mark = this.cursor.mark();

            var _node = this._divider.parse(this.cursor);

            if (this.cursor.hasUnresolvedError()) {
              this.cursor.moveToMark(mark);

              this._processMatch();

              break;
            } else {
              this.nodes.push(_node);
              this.cursor.next();
            }
          }
        }
      }
    }
  }, {
    key: "_processMatch",
    value: function _processMatch() {
      this.cursor.resolveError();

      if (this.nodes.length === 0) {
        var parseError = new _ParseError.default("Did not find a repeating match of ".concat(this.name, "."), this.mark.index, this);
        this.cursor.throwError(parseError);
        this.node = null;
      } else {
        var value = this.nodes.map(function (node) {
          return node.value;
        }).join("");
        this.node = new _ValueNode.default(this.name, value, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
        this.cursor.setIndex(this.node.endIndex);
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new RepeatValue(name, this._pattern, this._divider);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return RepeatValue;
}(_ValuePattern2.default);

exports.default = RepeatValue;
//# sourceMappingURL=RepeatValue.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(37));

var _CompositeNode = _interopRequireDefault(__webpack_require__(23));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _StackInformation = _interopRequireDefault(__webpack_require__(38));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AndComposite =
/*#__PURE__*/
function (_CompositePattern) {
  _inherits(AndComposite, _CompositePattern);

  function AndComposite(name, patterns) {
    var _this;

    _classCallCheck(this, AndComposite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AndComposite).call(this, name, patterns));

    _this._assertArguments();

    return _this;
  }

  _createClass(AndComposite, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._children.length < 2) {
        throw new Error("Invalid Argument: AndValue needs to have more than one value pattern.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.index = 0;
      this.nodes = [];
      this.node = null;
      this.cursor = cursor;
      this.mark = this.cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPatterns();

      return this.node;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_tryPatterns",
    value: function _tryPatterns() {
      while (true) {
        var pattern = this._children[this.index];
        var node = pattern.parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          this.cursor.moveToMark(this.mark);
          break;
        } else {
          this.nodes.push(node);
        }

        if (!this._next()) {
          this._processValue();

          break;
        }
      }
    }
  }, {
    key: "_next",
    value: function _next() {
      if (this._hasMorePatterns()) {
        if (this.cursor.hasNext()) {
          // If the last result was a failed optional, then don't increment the cursor.
          if (this.nodes[this.nodes.length - 1] != null) {
            this.cursor.next();
          }

          this.index++;
          return true;
        } else if (this.nodes[this.nodes.length - 1] == null) {
          this.index++;
          return true;
        }

        this._assertRestOfPatternsAreOptional();

        return false;
      } else {
        return false;
      }
    }
  }, {
    key: "_hasMorePatterns",
    value: function _hasMorePatterns() {
      return this.index + 1 < this._children.length;
    }
  }, {
    key: "_assertRestOfPatternsAreOptional",
    value: function _assertRestOfPatternsAreOptional() {
      var _this2 = this;

      var areTheRestOptional = this.children.every(function (pattern, index) {
        return index <= _this2.index || pattern instanceof _OptionalValue.default || pattern instanceof _OptionalComposite.default;
      });

      if (!areTheRestOptional) {
        var parseError = new _ParseError.default("Could not match ".concat(this.name, " before string ran out."), this.index, this);
        this.cursor.throwError(parseError);
      }
    }
  }, {
    key: "_processValue",
    value: function _processValue() {
      if (!this.cursor.hasUnresolvedError()) {
        this.nodes = this.nodes.filter(function (node) {
          return node != null;
        });
        var lastNode = this.nodes[this.nodes.length - 1];
        var startIndex = this.mark.index;
        var endIndex = lastNode.endIndex;
        this.node = new _CompositeNode.default(this.name, startIndex, endIndex);
        this.node.children = this.nodes;
        this.cursor.setIndex(this.node.endIndex);
      } else {
        this.node = null;
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new AndComposite(name, this._children);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return AndComposite;
}(_CompositePattern2.default);

exports.default = AndComposite;
//# sourceMappingURL=AndComposite.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(28));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CompositePattern =
/*#__PURE__*/
function (_Pattern) {
  _inherits(CompositePattern, _Pattern);

  function CompositePattern(name) {
    var _this;

    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, CompositePattern);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompositePattern).call(this, name));
    _this._children = children;

    _this._assertArguments();

    _this._cloneChildren();

    _this._assignAsParent();

    return _this;
  }

  _createClass(CompositePattern, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (!Array.isArray(this._children)) {
        throw new Error("Invalid Arguments: The patterns argument need to be an array of Patterns.");
      }

      var areAllPatterns = this._children.every(function (pattern) {
        return pattern instanceof _Pattern2.default;
      });

      if (!areAllPatterns) {
        throw new Error("Invalid Argument: All patterns need to be an instance of Pattern.");
      }

      if (this._children.length < 2) {
        throw new Error("Invalid Argument: Composite Patterns needs to have more than one value pattern.");
      }

      if (typeof this.name !== "string") {
        throw new Error("Invalid Argument: Composite Patterns needs to have a name that's a string.");
      }
    }
  }, {
    key: "_cloneChildren",
    value: function _cloneChildren() {
      // We need to clone the patterns so nested patterns can be parsed.
      this._children = this._children.map(function (pattern) {
        return pattern.clone();
      }); // We need to freeze the childen so they aren't modified.

      Object.freeze(this._children);
    }
  }, {
    key: "_assignAsParent",
    value: function _assignAsParent() {
      var _this2 = this;

      this._children.forEach(function (child) {
        return child.parent = _this2;
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      throw new Error("Not Yet Implemented");
    }
  }]);

  return CompositePattern;
}(_Pattern2.default);

exports.default = CompositePattern;
//# sourceMappingURL=CompositePattern.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StackInformation = function StackInformation(mark, pattern) {
  _classCallCheck(this, StackInformation);

  this.mark = mark;
  this.pattern = pattern;
  this.expectations = [];
};

exports.default = StackInformation;
//# sourceMappingURL=StackInformation.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OptionalComposite =
/*#__PURE__*/
function (_CompositePattern) {
  _inherits(OptionalComposite, _CompositePattern);

  function OptionalComposite(pattern) {
    var _this;

    _classCallCheck(this, OptionalComposite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OptionalComposite).call(this, "optional-composite", [pattern]));

    _this._assertArguments();

    return _this;
  }

  _createClass(OptionalComposite, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (!(this.children[0] instanceof _CompositePattern2.default)) {
        throw new Error("Invalid Arguments: Expected a CompositePattern.");
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      var mark = cursor.mark();
      this.mark = mark;
      var node = this.children[0].parse(cursor);

      if (cursor.hasUnresolvedError()) {
        cursor.resolveError();
        cursor.moveToMark(mark);
        return null;
      } else {
        return node;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new OptionalComposite(this.children[0]);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return OptionalComposite;
}(_CompositePattern2.default);

exports.default = OptionalComposite;
//# sourceMappingURL=OptionalComposite.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(37));

var _Cursor = _interopRequireDefault(__webpack_require__(25));

var _StackInformation = _interopRequireDefault(__webpack_require__(38));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OrComposite =
/*#__PURE__*/
function (_CompositePattern) {
  _inherits(OrComposite, _CompositePattern);

  function OrComposite(name, patterns) {
    var _this;

    _classCallCheck(this, OrComposite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrComposite).call(this, name, patterns));

    _this._assertArguments();

    return _this;
  }

  _createClass(OrComposite, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._children.length < 2) {
        throw new Error("Invalid Argument: OrValue needs to have more than one value pattern.");
      }

      var hasOptionalChildren = this._children.some(function (pattern) {
        return pattern instanceof _OptionalValue.default || pattern instanceof _OptionalComposite.default;
      });

      if (hasOptionalChildren) {
        throw new Error("OrComposite cannot have optional values.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.cursor = null;
      this.mark = null;
      this.index = 0;
      this.node = null;

      if (cursor != null) {
        this.cursor = cursor;
        this.mark = cursor.mark();
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._assertCursor();

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_assertCursor",
    value: function _assertCursor() {
      if (!(this.cursor instanceof _Cursor.default)) {
        throw new Error("Invalid Arguments: Expected a cursor.");
      }
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      while (true) {
        var pattern = this._children[this.index];
        this.node = pattern.parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          if (this.index + 1 < this._children.length) {
            this.cursor.resolveError();
            this.index++;
            this.cursor.moveToMark(this.mark);
          } else {
            this.node = null;
            break;
          }
        } else {
          this.cursor.setIndex(this.node.endIndex);
          break;
        }
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new OrComposite(name, this._children);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return OrComposite;
}(_CompositePattern2.default);

exports.default = OrComposite;
//# sourceMappingURL=OrComposite.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(37));

var _CompositeNode = _interopRequireDefault(__webpack_require__(23));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RepeatComposite =
/*#__PURE__*/
function (_CompositePattern) {
  _inherits(RepeatComposite, _CompositePattern);

  function RepeatComposite(name, pattern, divider) {
    var _this;

    _classCallCheck(this, RepeatComposite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RepeatComposite).call(this, name, divider != null ? [pattern, divider] : [pattern]));
    _this._pattern = _this.children[0];
    _this._divider = _this.children[1];

    _this._assertArguments();

    return _this;
  }

  _createClass(RepeatComposite, [{
    key: "_assertArguments",
    value: function _assertArguments() {
      if (this._pattern instanceof _OptionalComposite.default) {
        throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
      }
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.nodes = [];
      this.cursor = cursor;
      this.mark = this.cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      while (true) {
        var node = this._pattern.parse(this.cursor);

        if (this.cursor.hasUnresolvedError()) {
          this._processMatch();

          break;
        } else {
          this.nodes.push(node);

          if (node.endIndex === this.cursor.lastIndex()) {
            this._processMatch();

            break;
          }

          this.cursor.next();

          if (this._divider != null) {
            var mark = this.cursor.mark();

            var _node = this._divider.parse(this.cursor);

            if (this.cursor.hasUnresolvedError()) {
              this.cursor.moveToMark(mark);

              this._processMatch();

              break;
            } else {
              this.nodes.push(_node);
              this.cursor.next();
            }
          }
        }
      }
    }
  }, {
    key: "_processMatch",
    value: function _processMatch() {
      this.cursor.resolveError();

      if (this.nodes.length === 0) {
        this.cursor.throwError(new _ParseError.default("Did not find a repeating match of ".concat(this.name, "."), this.mark.index, this));
        this.node = null;
      } else {
        this.node = new _CompositeNode.default(this.name, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
        this.node.children = this.nodes;
        this.cursor.setIndex(this.node.endIndex);
      }
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new RepeatComposite(name, this._pattern, this._divider);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.mark;
    }
  }]);

  return RepeatComposite;
}(_CompositePattern2.default);

exports.default = RepeatComposite;
//# sourceMappingURL=RepeatComposite.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(28));

var _ParseError = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RecursivePattern =
/*#__PURE__*/
function (_Pattern) {
  _inherits(RecursivePattern, _Pattern);

  function RecursivePattern(name) {
    _classCallCheck(this, RecursivePattern);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecursivePattern).call(this, name));
  }

  _createClass(RecursivePattern, [{
    key: "getPattern",
    value: function getPattern() {
      var _this = this;

      return this._climb(this.parent, function (pattern) {
        return pattern.name === _this.name;
      });
    }
  }, {
    key: "_climb",
    value: function _climb(pattern, isMatch) {
      if (isMatch(pattern)) {
        return pattern;
      } else {
        if (pattern.parent != null) {
          return this._climb(pattern.parent, isMatch);
        }

        return null;
      }
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      if (this.pattern == null) {
        var pattern = this.getPattern();

        if (pattern == null) {
          cursor.throwError(new _ParseError.default("Couldn't find parent pattern to recursively parse, with the name ".concat(this.name, ".")), cursor.index, this);
          return null;
        }

        this.pattern = pattern.clone();
        this.pattern.parent = this;
      }

      return this.pattern.parse(cursor);
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new RecursivePattern(name);
    }
  }, {
    key: "getCurrentMark",
    value: function getCurrentMark() {
      return this.pattern.getCurrentMark();
    }
  }]);

  return RecursivePattern;
}(_Pattern2.default);

exports.default = RecursivePattern;
//# sourceMappingURL=RecursivePattern.js.map

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);
/* harmony import */ var _method_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49);
;






const value = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrComposite"]("value", [_hex_js__WEBPACK_IMPORTED_MODULE_2__["default"], _method_js__WEBPACK_IMPORTED_MODULE_4__["default"], _unit_js__WEBPACK_IMPORTED_MODULE_1__["default"], _number_js__WEBPACK_IMPORTED_MODULE_3__["default"], _name_js__WEBPACK_IMPORTED_MODULE_5__["default"]]);

/* harmony default export */ __webpack_exports__["default"] = (value);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var _letter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
;




const percent = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("%", "%");
const character = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("character", [
  _letter_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  percent
]);

const unitType = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("unit-type", character);
const unit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("unit", [_number_js__WEBPACK_IMPORTED_MODULE_1__["default"], unitType]);

/* harmony default export */ __webpack_exports__["default"] = (unit);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
;

const zero = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("zero", "0");
const bigE = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("big-e", "E");
const littleE = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("little-e", "e");
const plus = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("plus", "+");
const minus = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("minus", "-");
const period = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("period", ".");
const digit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"]("digit", "0987654321");
const nonZeroDigit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"]("non-zero-digit", "987654321");
const digitSequence = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("digit-sequence", digit);

const plusOrMinus = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("plus-or-minus", [plus, minus]);

const optionalPlusOrMinus = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](plusOrMinus);

const validDigitSequence = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("non-zero-start", [
  optionalPlusOrMinus,
  nonZeroDigit,
  new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](digitSequence)
]);

const e = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("e", [bigE, littleE]);

const integer = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("integer", [zero, validDigitSequence]);

const fraction = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("fraction", [
  optionalPlusOrMinus,
  digitSequence,
  period,
  digitSequence
]);

const float = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("float", [
    fraction,
    integer
]);

const exponent = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("exponent", [
  float,
  e,
  optionalPlusOrMinus,
  digitSequence
]);

const number = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("number", [exponent, fraction, integer]);

/* harmony default export */ __webpack_exports__["default"] = (number);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
;

const letter = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"](
  "letter",
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

/* harmony default export */ __webpack_exports__["default"] = (letter);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const letter = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"]("letter", "ABCDEFabcdef");
const number = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"]("number", "0987654321");
const pound = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("pound", "#");
const character = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("character", [letter, number]);
const sixHex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("six-hex", [
  pound,
  character,
  character,
  character,
  character,
  character,
  character
]);

const threeHex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("six-hex", [
  pound,
  character,
  character,
  character
]);

const hex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("hex", [sixHex, threeHex]);

/* harmony default export */ __webpack_exports__["default"] = (hex);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);




const comma = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("comma", ",");
const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("spaces", space);
const optionalSpaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](spaces);
const divider = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("divider", [
  optionalSpaces,
  comma,
  optionalSpaces
]);
const openParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("open-paren", "(");
const closeParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("close-paren", ")");
const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RecursivePattern"]("values");
const args = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("arguments", values, divider);
const optionalArgs = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalComposite"](args);

const method = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("method", [
  _name_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  openParen,
  optionalSpaces,
  optionalArgs,
  optionalSpaces,
  closeParen
]);

/* harmony default export */ __webpack_exports__["default"] = (method);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
;

const letter = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"](
  "letter",
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
const digit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AnyOfThese"]("digit", "0987654321");
const underbar = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("underbar", "_");
const dash = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("dash", "-");
const character = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("character", [
  letter,
  digit,
  new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrValue"]("bar", [underbar, dash])
]);

const characterSequence = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("character-sequence", character);
const optionalCharacter = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](characterSequence);

const name = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndValue"]("name", [letter, optionalCharacter]);

/* harmony default export */ __webpack_exports__["default"] = (name);


/***/ })
/******/ ]);
});