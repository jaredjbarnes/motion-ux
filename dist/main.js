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

/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easings", function() { return _easings_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BezierCurve", function() { return _BezierCurve_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _BlendedEasing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(93);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlendedEasing", function() { return _BlendedEasing_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Easing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return _Easing_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });










/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var _DefaultClock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Scrubber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _AnimatorCreator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);




const defaultClock = new _DefaultClock_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

class Timeline {
  static get repeatDirections() {
    return _Scrubber_js__WEBPACK_IMPORTED_MODULE_1__["default"].repeatDirections;
  }

  constructor({ animations, duration, clock = defaultClock }) {
    this.clock = clock;
    this.render = this.render.bind(this);
    this.scrubber = new _Scrubber_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      clock,
      duration,
      render: this.render
    });
    this.duration = duration;
    this.animators = new _AnimatorCreator_js__WEBPACK_IMPORTED_MODULE_2__["default"](animations).getAnimators();
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
    return values;
  }

  getCurrentValues() {
    return this.getValuesAt(this.progress);
  }

  getValuesAt(progress) {
    const results = {};

    this.animators
      .filter(animator => {
        let animation = results[animator.options.name];

        if (animation == null) {
          animation = results[animator.options.name] = {};
        }

        if (animation[animator.options.property] == null) {
          animation[animator.options.property] = animator.options.from;
        }

        return animator.options.startAt <= progress;
      })
      .forEach(animator => {
        const animation = results[animator.options.name];
        animation[animator.options.property] = animator.render(
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
        const animation = results[animator.options.name];
        animation[animator.options.property] = animator.render(
          progress,
          this.duration
        );
      });

    return results;
  }

  dispose() {
    this.scrubber.dispose();
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
  constructor() {
    this.registeredCallbacks = new Map();
    this._tick = this._tick.bind(this);
    this.animationFrame = null;
  }

  _tick() {
    this.registeredCallbacks.forEach(callback => {
      callback();
    });

    if (this.registeredCallbacks.size > 0) {
      this.animationFrame = requestAnimationFrame(this._tick);
    } else {
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scrubber; });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


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
    this.tick = this.tick.bind(this);

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
      this.clock.register(this.tick);
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
      this.clock.unregister(this.tick);
    }
  }

  reverse() {
    if (this.state !== Scrubber.states.REVERSE) {
      this.notify({
        type: "REVERSED"
      });

      this._lastTimestamp = this.clock.now();
      this.state = Scrubber.states.REVERSE;
      this.clock.register(this.tick);
    }
  }

  seek(progress) {
    const lastProgress = this._progress;
    this._progress = progress;

    const animations = this.render();

    this.notify({
      type: "RENDER",
      progress: progress,
      lastProgress: lastProgress,
      animations
    });
  }

  dispose() {
    this.stop();
    super.dispose();
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _TimeObserver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



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

    dispose(){
        this.observers = [];
    }
}

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeObserver; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimatorCreator; });
/* harmony import */ var _animators_CssValueNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);
/* harmony import */ var _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89);
/* harmony import */ var _TreeUtility_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92);







const treeUtility = new _TreeUtility_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
const treeNormalizer = new _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

class AnimatorCreator {
  constructor(animationOptions) {
    this.animationOptions = animationOptions;

    this._assertAnimationOptions();
    this._convertAnimationsToAnimations();
    this._sortAnimations();
    this._createAnimators();
  }

  _assertAnimationOptions() {
    if (!Array.isArray(this.animationOptions)) {
      throw new Error("Expected animations to be an array.");
    }
  }

  _convertAnimationsToAnimations() {
    this.timelineOptions = this.animationOptions.map(
      animationOption => new _Animation_js__WEBPACK_IMPORTED_MODULE_3__["default"](animationOption)
    );
  }

  _sortAnimations() {
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
        const node = _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(cursor);
        treeNormalizer.normalize(node);

        if (cursor.hasUnresolvedError()) {
          throw new Error(
            `Parse Error: could not parse css ${options.controls}`
          );
        }

        return node;
      });

      const fromNode = controls[0];
      const allStructuresAreEqual = controls.every(node => {
        return treeUtility.areTreeStructuresEqual(fromNode, node);
      });

      if (!allStructuresAreEqual) {
        throw new Error(
          `Invalid Animation: The value types that are being animated do not match. From: ${JSON.stringify(
            options.from
          )}, To:${JSON.stringify(options.to)}, Controls: ${JSON.stringify(
            options.controls
          )}`
        );
      }

      return new _animators_CssValueNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CssValueNodeAnimator; });
/* harmony import */ var _ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class CssValueNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createAnimators();
    
    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
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

      return new _ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    });
  }

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }

  renderNode(progress){
    
  }
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValuesNodeAnimator; });
/* harmony import */ var _NumberNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _HexNodeAnimator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _UnitNodeAnimator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _MethodNodeAnimator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _NameNodeAnimator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);






class ValuesNodeAnimator {
  constructor(options) {
    this.options = options;

    this.nameToAnimatorMap = {
      number: _NumberNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"],
      unit: _UnitNodeAnimator_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      method: _MethodNodeAnimator_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      name: _NameNodeAnimator_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      hex: _HexNodeAnimator_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      values: ValuesNodeAnimator
    };

    this.createAnimators();
    
    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
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

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(" ");
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


class NumberNodeAnimator {
  constructor(options) {
    this.options = options;
    
    this.animator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...options,
      controls: options.controls.map(node => parseFloat(node.value))
    });

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    return this.animator.render(progress);
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberAnimator; });
/* harmony import */ var _BezierCurve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


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
    const progressWithEasing =
      this.options.easing.valueAt(relativeProgress) * duration;

    const value = this.bezierCurve.valueAt(progressWithEasing);
    return value;
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BezierCurve; });
class BezierCurve {
  constructor(points) {
    this.points = points;
    this.reducedPoints = new Array(points.length);

    Object.freeze(this.points);
  }

  clone() {
    return new BezierCurve(this.points.slice());
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

  validatePoints() {
    if (this.points.length < 2) {
      throw new Error("Invalid Points: The points need to be at least two.");
    }

    const controlPoints = this.points.slice(1, this.points.length - 2);

    controlPoints.forEach((point) => this.assertValidPoint(point));
  }

  assertValidPoint(point) {
    if (typeof point !== "number") {
      throw new Error("Invalid point: Points need to be numbers.");
    }
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HexNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


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

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;

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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnitNodeAnimator; });
/* harmony import */ var _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


class UnitNodeAnimator {
  constructor(options) {
    this.options = options;

    this.animator = new _NumberAnimator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      ...options,
      controls: options.controls.map(node =>
        parseInt(node.children[0].value, 10)
      )
    });

    this.unit = this.options.controls[0].children[1].value;

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    const value = this.animator.render(progress);
    const unit = this.unit;
    return `${value.toFixed(3)}${unit}`;
  }
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MethodNodeAnimator; });
/* harmony import */ var _ValuesNodeAnimator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


const findArguments = node => node.name === "arguments";
const filterValues = node => node.name === "values";
const findMethodName = node => node.name === "name";
const findArgs = node => {
  return node.children.find(findArguments).children.filter(filterValues);
};

class MethodNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createArgs();
    this.createAnimators();
    this.methodName = this.getMethodName();

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  createArgs() {
    this.args = this.options.controls.map(findArgs);
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

  getMethodName() {
    return this.options.controls[0].children.find(findMethodName).value;
  }

  render(progress) {
    const methodName = this.methodName;
    const args = this.getArgs(progress);

    return `${methodName}(${args})`;
  }

  getArgs(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NameNodeAnimator; });
class NameNodeAnimator {
  constructor(options) {
    this.options = options;
    this.values = this.options.controls.map(node => {
      return node.value;
    });

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    if (progress > 0) {
      return this.values[this.values.length - 1];
    } else {
      return this.values[0];
    }
  }
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);




const cssValue = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("css-value", _values_js__WEBPACK_IMPORTED_MODULE_2__["default"], _divider_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (cssValue);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
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
Object.defineProperty(exports, "RegexValue", {
  enumerable: true,
  get: function get() {
    return _RegexValue.default;
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
Object.defineProperty(exports, "RecursivePattern", {
  enumerable: true,
  get: function get() {
    return _RecursivePattern.default;
  }
});
Object.defineProperty(exports, "ParseInspector", {
  enumerable: true,
  get: function get() {
    return _ParseInspector.default;
  }
});
Object.defineProperty(exports, "TextInspector", {
  enumerable: true,
  get: function get() {
    return _TextInspector.default;
  }
});

var _Node = _interopRequireDefault(__webpack_require__(20));

var _CompositeNode = _interopRequireDefault(__webpack_require__(21));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _Cursor = _interopRequireDefault(__webpack_require__(23));

var _RegexValue = _interopRequireDefault(__webpack_require__(25));

var _AndValue = _interopRequireDefault(__webpack_require__(29));

var _AnyOfThese = _interopRequireDefault(__webpack_require__(32));

var _Literal = _interopRequireDefault(__webpack_require__(33));

var _NotValue = _interopRequireDefault(__webpack_require__(34));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OrValue = _interopRequireDefault(__webpack_require__(35));

var _RepeatValue = _interopRequireDefault(__webpack_require__(36));

var _ValuePattern = _interopRequireDefault(__webpack_require__(27));

var _AndComposite = _interopRequireDefault(__webpack_require__(37));

var _CompositePattern = _interopRequireDefault(__webpack_require__(38));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _OrComposite = _interopRequireDefault(__webpack_require__(40));

var _RepeatComposite = _interopRequireDefault(__webpack_require__(41));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

var _RecursivePattern = _interopRequireDefault(__webpack_require__(42));

var _ParseInspector = _interopRequireDefault(__webpack_require__(43));

var _TextInspector = _interopRequireDefault(__webpack_require__(44));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),
/* 20 */
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
  function Node(type, name, startIndex, endIndex) {
    _classCallCheck(this, Node);

    this.type = type;
    this.name = name;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (typeof this.startIndex !== "number" || typeof this.endIndex !== "number") {
      throw new Error("Invalid Arguments: startIndex and endIndex need to be number.");
    }
  }

  _createClass(Node, [{
    key: "filter",
    value: function filter() {
      throw new Error("Not Implemented Exception: expected subclass to override this method.");
    }
  }, {
    key: "clone",
    value: function clone() {
      throw new Error("Not Implemented Exception: expected subclass to override this method.");
    }
  }, {
    key: "toString",
    value: function toString() {
      throw new Error("Not Implemented Exception: expected subclass to override this method.");
    }
  }]);

  return Node;
}();

exports.default = Node;
//# sourceMappingURL=Node.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(20));

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

  function CompositeNode(type, name) {
    var _this;

    var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, CompositeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompositeNode).call(this, type, name, startIndex, endIndex));
    _this.children = [];
    return _this;
  }

  _createClass(CompositeNode, [{
    key: "clone",
    value: function clone() {
      var node = new CompositeNode(this.type, this.name, this.startIndex, this.endIndex);
      node.children = this.children.map(function (child) {
        return child.clone();
      });
      return node;
    }
  }, {
    key: "filter",
    value: function filter(shouldKeep) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var childrenContext = context.slice();
      childrenContext.push(this);
      Object.freeze(childrenContext);
      var matches = this.children.reduce(function (acc, child) {
        return acc.concat(child.filter(shouldKeep, childrenContext));
      }, []);
      var match = shouldKeep(this, context);

      if (match) {
        matches.push(this);
      }

      return matches;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.children.map(function (child) {
        return child.toString();
      }).join("");
    }
  }]);

  return CompositeNode;
}(_Node2.default);

exports.default = CompositeNode;
//# sourceMappingURL=CompositeNode.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(20));

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

var ValueNode =
/*#__PURE__*/
function (_Node) {
  _inherits(ValueNode, _Node);

  function ValueNode(type, name, value) {
    var _this;

    var startIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var endIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, ValueNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ValueNode).call(this, type, name, startIndex, endIndex));
    _this.value = value;
    return _this;
  }

  _createClass(ValueNode, [{
    key: "clone",
    value: function clone() {
      return new ValueNode(this.type, this.name, this.value, this.startIndex, this.endIndex);
    }
  }, {
    key: "filter",
    value: function filter(shouldKeep, context) {
      var match = shouldKeep(this, context);

      if (match) {
        return [this];
      }

      return [];
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }]);

  return ValueNode;
}(_Node2.default);

exports.default = ValueNode;
//# sourceMappingURL=ValueNode.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CursorHistory = _interopRequireDefault(__webpack_require__(24));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cursor =
/*#__PURE__*/
function () {
  function Cursor(string) {
    _classCallCheck(this, Cursor);

    this.string = string;
    this.assertValidity();
    this.index = 0;
    this.length = string.length;
    this.history = new _CursorHistory.default();
    this.isInErrorState = false;
  }

  _createClass(Cursor, [{
    key: "assertValidity",
    value: function assertValidity() {
      if (this.isNullOrEmpty(this.string)) {
        throw new Error("Illegal Argument: Cursor needs to have a string that has a length greater than 0.");
      }
    }
  }, {
    key: "startRecording",
    value: function startRecording() {
      this.history.startRecording();
    }
  }, {
    key: "stopRecording",
    value: function stopRecording() {
      this.history.stopRecording();
    }
  }, {
    key: "throwError",
    value: function throwError(parseError) {
      this.isInErrorState = true;
      this.history.addError(parseError);
    }
  }, {
    key: "addMatch",
    value: function addMatch(pattern, astNode) {
      this.history.addMatch(pattern, astNode);
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
      return this.index;
    }
  }, {
    key: "moveToMark",
    value: function moveToMark(mark) {
      this.index = mark;
    }
  }, {
    key: "moveToBeginning",
    value: function moveToBeginning() {
      this.index = 0;
    }
  }, {
    key: "moveToEnd",
    value: function moveToEnd() {
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
  }, {
    key: "didSuccessfullyParse",
    value: function didSuccessfullyParse() {
      return !this.hasUnresolvedError() && this.isAtEnd();
    }
  }, {
    key: "parseError",
    get: function get() {
      return this.history.getFurthestError();
    }
  }, {
    key: "lastMatch",
    get: function get() {
      return this.history.getFurthestMatch();
    }
  }]);

  return Cursor;
}();

exports.default = Cursor;
//# sourceMappingURL=Cursor.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CursorHistory =
/*#__PURE__*/
function () {
  function CursorHistory() {
    _classCallCheck(this, CursorHistory);

    this.isRecording = false;
    this.furthestMatch = {
      pattern: null,
      astNode: null
    };
    this.furthestError = null;
    this.patterns = [];
    this.astNodes = [];
    this.errors = [];
  }

  _createClass(CursorHistory, [{
    key: "addMatch",
    value: function addMatch(pattern, astNode) {
      if (this.isRecording) {
        this.patterns.push(pattern);
        this.astNodes.push(astNode);
      }

      if (this.furthestMatch.astNode == null || astNode.endIndex >= this.furthestMatch.astNode.endIndex) {
        this.furthestMatch.pattern = pattern;
        this.furthestMatch.astNode = astNode;
      }
    }
  }, {
    key: "addError",
    value: function addError(error) {
      if (this.isRecording) {
        this.errors.push(error);
      }

      if (this.furthestError == null || error.index >= this.furthestError.index) {
        this.furthestError = error;
      }
    }
  }, {
    key: "startRecording",
    value: function startRecording() {
      this.isRecording = true;
    }
  }, {
    key: "stopRecording",
    value: function stopRecording() {
      this.isRecording = false;
      this.clear();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.patterns.length = 0;
      this.astNodes.length = 0;
      this.errors.length = 0;
    }
  }, {
    key: "getFurthestError",
    value: function getFurthestError() {
      return this.furthestError;
    }
  }, {
    key: "getFurthestMatch",
    value: function getFurthestMatch() {
      return this.furthestMatch;
    }
  }, {
    key: "getLastMatch",
    value: function getLastMatch() {
      if (this.isRecording) {
        return {
          pattern: this.patterns[this.patterns.length - 1] || null,
          astNode: this.astNodes[this.astNodes.length - 1] || null
        };
      } else {
        return this.furthestMatch;
      }
    }
  }, {
    key: "getLastError",
    value: function getLastError() {
      return this.errors[this.errors.length - 1] || null;
    }
  }, {
    key: "getAllParseStacks",
    value: function getAllParseStacks() {
      var stacks = this.astNodes.reduce(function (acc, node) {
        var container = acc[acc.length - 1];

        if (node.startIndex === 0) {
          container = [];
          acc.push(container);
        }

        container.push(node);
        return acc;
      }, []); // There are times when the matching will fail and hit again on the same node.
      // This filters them out. 
      // We simply check to see if there is any overlap with the previous one,
      // and if there is we don't add it. This is why we move backwards.

      var cleanedStack = stacks.map(function (stack) {
        var cleanedStack = [];

        for (var x = stack.length - 1; x >= 0; x--) {
          var currentNode = stack[x];
          var previousNode = stack[x + 1];

          if (previousNode == null) {
            cleanedStack.unshift(currentNode);
          } else {
            var left = Math.max(currentNode.startIndex, previousNode.startIndex);
            var right = Math.min(currentNode.endIndex, previousNode.endIndex);
            var isOverlapping = left <= right;

            if (!isOverlapping) {
              cleanedStack.unshift(currentNode);
            }
          }
        }

        return cleanedStack;
      });
      return cleanedStack;
    }
  }, {
    key: "getLastParseStack",
    value: function getLastParseStack() {
      var stacks = this.getAllParseStacks();
      return stacks[stacks.length - 1] || [];
    }
  }]);

  return CursorHistory;
}();

exports.default = CursorHistory;
//# sourceMappingURL=CursorHistory.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _Cursor = _interopRequireDefault(__webpack_require__(23));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

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

var RegexValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(RegexValue, _ValuePattern);

  function RegexValue(name, regex) {
    var _this;

    _classCallCheck(this, RegexValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegexValue).call(this, "regex-value", name));
    _this.regexString = regex;
    _this.regex = new RegExp("^".concat(regex), "g");

    _this._assertArguments();

    return _this;
  }

  _createClass(RegexValue, [{
    key: "_assertArguments",
    value: function _assertArguments() {
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
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.cursor = cursor;
      this.regex.lastIndex = 0;
      this.substring = this.cursor.string.substr(this.cursor.getIndex());
      this.node = null;
    }
  }, {
    key: "_tryPattern",
    value: function _tryPattern() {
      var result = this.regex.exec(this.substring);

      if (result != null && result.index === 0) {
        var currentIndex = this.cursor.getIndex();
        var newIndex = currentIndex + result[0].length - 1;
        this.node = new _ValueNode.default("regex-value", this.name, result[0], currentIndex, newIndex);
        this.cursor.index = newIndex;
        this.cursor.addMatch(this, this.node);
      } else {
        this._processError();
      }
    }
  }, {
    key: "_processError",
    value: function _processError() {
      var message = "ParseError: Expected regex pattern of '".concat(this.regexString, "' but found '").concat(this.substring, "'.");
      var parseError = new _ParseError.default(message, this.cursor.getIndex(), this);
      this.cursor.throwError(parseError);
    }
  }, {
    key: "clone",
    value: function clone(name) {
      if (typeof name !== "string") {
        name = this.name;
      }

      return new RegexValue(name, this.regexString);
    }
  }, {
    key: "getPossibilities",
    value: function getPossibilities() {
      return [this.getTokenValue()];
    }
  }, {
    key: "getTokenValue",
    value: function getTokenValue() {
      return this.name;
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return [this.name];
    }
  }]);

  return RegexValue;
}(_ValuePattern2.default);

exports.default = RegexValue;
//# sourceMappingURL=RegexValue.js.map

/***/ }),
/* 26 */
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
};

exports.default = ParseError;
//# sourceMappingURL=ParseError.js.map

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

  function ValuePattern(type, name) {
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, ValuePattern);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValuePattern).call(this, type, name, children));
  }

  _createClass(ValuePattern, [{
    key: "_assertChildren",
    value: function _assertChildren() {
      if (!Array.isArray(this._children)) {
        throw new Error("Invalid Arguments: The patterns argument need to be an array of ValuePattern.");
      }

      var areAllPatterns = this._children.every(function (pattern) {
        return pattern instanceof ValuePattern || pattern instanceof _Pattern2.default;
      });

      if (!areAllPatterns) {
        throw new Error("Invalid Argument: All patterns need to be an instance of ValuePattern.");
      }

      if (typeof this.name !== "string") {
        throw new Error("Invalid Argument: ValuePatterns needs to have a name that's a string.");
      }

      if (typeof this.type !== "string") {
        throw new Error("Invalid Argument: ValuePatterns needs to have a type that's a string.");
      }
    }
  }, {
    key: "clone",
    value: function clone() {
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

var _Cursor = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pattern =
/*#__PURE__*/
function () {
  function Pattern() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var name = arguments.length > 1 ? arguments[1] : undefined;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Pattern);

    this._type = type;
    this._name = name;
    this._children = [];
    this._parent = null;
    this.isSequence = false;

    this._assertName();

    this.children = children;
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
    key: "exec",
    value: function exec(string) {
      var cursor = new _Cursor.default(string);
      var node = this.parse(cursor);

      if (cursor.didSuccessfullyParse()) {
        return node;
      } else {
        return null;
      }
    }
  }, {
    key: "test",
    value: function test(string) {
      return this.exec(string) != null;
    }
  }, {
    key: "_assertChildren",
    value: function _assertChildren() {// Empty, meant to be overridden by subclasses.
    }
  }, {
    key: "_cloneChildren",
    value: function _cloneChildren() {
      var _this = this;

      // We need to clone the patterns so nested patterns can be parsed.
      this._children = this._children.map(function (pattern) {
        if (!(pattern instanceof Pattern)) {
          throw new Error("The ".concat(_this.name, " pattern has an invalid child pattern."));
        }

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
      throw new Error("Method Not Implemented");
    }
  }, {
    key: "getPossibilities",
    value: function getPossibilities() {
      throw new Error("Method Not Implemented");
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      throw new Error("Method Not Implemented");
    }
  }, {
    key: "getNextTokens",
    value: function getNextTokens() {
      var _this3 = this;

      if (this._parent != null) {
        var siblings = this._parent.children;
        var index = siblings.findIndex(function (c) {
          return c === _this3;
        });
        var nextSibling = siblings[index + 1]; // I don't like this, so I think we need to rethink this.

        if (this._parent.type.indexOf("repeat") === 0) {
          var tokens = this._parent.getNextTokens();

          if (index === 0 && siblings.length > 1) {
            return nextSibling.getTokens().concat(tokens);
          } else if (index === 1) {
            return siblings[0].getTokens().concat(tokens);
          } else {
            return this.getTokens().concat(tokens);
          }
        } // Another thing I don't like.


        if (this._parent.type.indexOf("and") === 0 && nextSibling != null && nextSibling.type.indexOf("optional") === 0) {
          var _tokens = [];

          for (var x = index + 1; x < siblings.length; x++) {
            var child = siblings[x];

            if (child.type.indexOf("optional") === 0) {
              _tokens = _tokens.concat(child.getTokens());
            } else {
              _tokens = _tokens.concat(child.getTokens());
              break;
            }

            if (x === siblings.length - 1) {
              _tokens = _tokens.concat(this._parent.getNextTokens());
            }
          }

          return _tokens;
        } // If you are an or you have already qualified.


        if (this._parent.type.indexOf("or") === 0) {
          return this._parent.getNextTokens();
        }

        if (nextSibling != null) {
          return nextSibling.getTokens();
        } else {
          return this._parent.getNextTokens();
        }
      }

      return [];
    }
  }, {
    key: "getTokenValue",
    value: function getTokenValue() {
      return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
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

      this._cloneChildren();

      this._assertChildren();

      this._assignAsParent();
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

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _Permutor = _interopRequireDefault(__webpack_require__(31));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

var permutor = new _Permutor.default();

var AndValue =
/*#__PURE__*/
function (_ValuePattern) {
  _inherits(AndValue, _ValuePattern);

  function AndValue(name, patterns) {
    var _this;

    _classCallCheck(this, AndValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AndValue).call(this, "and-value", name, patterns));

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

      this._tryPatterns();

      return this.node;
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
        var startIndex = this.mark;
        var endIndex = lastNode.endIndex;
        var value = this.nodes.map(function (node) {
          return node.value;
        }).join("");
        this.node = new _ValueNode.default("and-value", this.name, value, startIndex, endIndex);
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      var possibilities = this.children.map(function (child) {
        return child.getPossibilities(rootPattern);
      });
      return permutor.permute(possibilities);
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var tokens = [];

      for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (child instanceof _OptionalValue.default) {
          tokens = tokens.concat(child.getTokens());
        } else {
          tokens = tokens.concat(child.getTokens());
          break;
        }
      }

      return tokens;
    }
  }]);

  return AndValue;
}(_ValuePattern2.default);

exports.default = AndValue;
//# sourceMappingURL=AndValue.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OptionalValue).call(this, "optional-value", "optional-value", [pattern]));

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
        cursor.addMatch(this, node);
        return node;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new OptionalValue(this.children[0]);
    }
  }, {
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      } // This is to prevent possibilities explosion.


      if (this.parent === rootPattern) {
        var possibilities = this.children[0].getPossibilities(rootPattern);
        possibilities.unshift("");
        return possibilities;
      } else {
        return this.children[0].getPossibilities(rootPattern);
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this._children[0].getTokens();
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Permutor =
/*#__PURE__*/
function () {
  function Permutor() {
    _classCallCheck(this, Permutor);

    this.array = [];
    this.positionToOptions = null;
  }

  _createClass(Permutor, [{
    key: "permute",
    value: function permute(array) {
      this.array = array;
      this.createPositionMap();
      return this.getPermutations();
    }
  }, {
    key: "getPermutations",
    value: function getPermutations() {
      var _this = this;

      return this.array[0].reduce(function (acc, value, index) {
        return acc.concat(_this.getOptions(0, index));
      }, []);
    }
  }, {
    key: "getKey",
    value: function getKey(x, y) {
      return "".concat(x, "|").concat(y);
    }
  }, {
    key: "createPositionMap",
    value: function createPositionMap() {
      var _this2 = this;

      this.positionToOptions = {};

      for (var x = this.array.length - 1; x >= 0; x--) {
        var _loop = function _loop(y) {
          var yValue = _this2.array[x][y];
          var nextX = x + 1;

          if (_this2.array[nextX] != null) {
            var options = _this2.array[nextX];
            var value = options.map(function (option, index) {
              var permutations = _this2.getOptions(nextX, index);

              return permutations.map(function (option) {
                return "".concat(yValue).concat(option);
              });
            }).reduce(function (acc, value) {
              return acc.concat(value);
            }, []);

            _this2.setOptions(x, y, value);
          } else {
            _this2.setOptions(x, y, [yValue]);
          }
        };

        for (var y = 0; y < this.array[x].length; y++) {
          _loop(y);
        }
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions(x, y) {
      return this.positionToOptions[this.getKey(x, y)];
    }
  }, {
    key: "setOptions",
    value: function setOptions(x, y, value) {
      this.positionToOptions[this.getKey(x, y)] = value;
    }
  }]);

  return Permutor;
}();

exports.default = Permutor;
//# sourceMappingURL=Permutor.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnyOfThese).call(this, "any-of-these", name));
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

      this._tryPattern();

      return this.node;
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
        this.node = new _ValueNode.default("any-of-these", this.name, value, index, index);
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      return this.getTokens();
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this.characters.split("");
    }
  }]);

  return AnyOfThese;
}(_ValuePattern2.default);

exports.default = AnyOfThese;
//# sourceMappingURL=AnyOfThese.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Literal).call(this, "literal", name));
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

      this._tryPattern();

      return this.node;
    }
  }, {
    key: "_reset",
    value: function _reset(cursor) {
      this.cursor = cursor;
      this.mark = this.cursor.mark();
      this.substring = this.cursor.string.substring(this.mark, this.mark + this.literal.length);
      this.node = null;
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
      this.node = new _ValueNode.default("literal", this.name, this.substring, this.mark, this.mark + this.literal.length - 1);
      this.cursor.index = this.node.endIndex;
      this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities() {
      return [this.getTokenValue()];
    }
  }, {
    key: "getTokenValue",
    value: function getTokenValue() {
      return this.literal;
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return [this.getTokenValue()];
    }
  }]);

  return Literal;
}(_ValuePattern2.default);

exports.default = Literal;
//# sourceMappingURL=Literal.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

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

var NotValue =
/*#__PURE__*/
function (_Pattern) {
  _inherits(NotValue, _Pattern);

  function NotValue(name, pattern) {
    _classCallCheck(this, NotValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotValue).call(this, "not-value", name, [pattern]));
  }

  _createClass(NotValue, [{
    key: "_assertChildren",
    value: function _assertChildren() {
      if (!(this.children[0] instanceof _Pattern2.default)) {
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
        var parseError = new _ParseError.default("Didn't find any characters that didn't match the ".concat(this.children[0].name, " pattern."), this.mark, this);
        this.cursor.throwError(parseError);
      } else {
        this.node = new _ValueNode.default("not-value", this.name, this.match, this.mark, this.mark);
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities() {
      return [];
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return [];
    }
  }]);

  return NotValue;
}(_Pattern2.default);

exports.default = NotValue;
//# sourceMappingURL=NotValue.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrValue).call(this, "or-value", name, patterns));

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

      this._tryPattern();

      return this.node;
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
          this.node = new _ValueNode.default("or-value", this.name, node.value, node.startIndex, node.endIndex);
          this.cursor.index = this.node.endIndex;
          this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      return this.children.map(function (child) {
        return child.getPossibilities(rootPattern);
      }).reduce(function (acc, value) {
        return acc.concat(value);
      }, []);
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var tokens = this._children.map(function (c) {
        return c.getTokens();
      });

      var hasPrimitiveTokens = tokens.every(function (t) {
        return t.every(function (value) {
          return typeof value === "string";
        });
      });

      if (hasPrimitiveTokens && tokens.length > 0) {
        return tokens.reduce(function (acc, t) {
          return acc.concat(t);
        }, []);
      }

      return this._children[0].getTokens();
    }
  }]);

  return OrValue;
}(_ValuePattern2.default);

exports.default = OrValue;
//# sourceMappingURL=OrValue.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(27));

var _ValueNode = _interopRequireDefault(__webpack_require__(22));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RepeatValue).call(this, "repeat-value", name, divider != null ? [pattern, divider] : [pattern]));
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
        var parseError = new _ParseError.default("Did not find a repeating match of ".concat(this.name, "."), this.mark, this);
        this.cursor.throwError(parseError);
        this.node = null;
      } else {
        var value = this.nodes.map(function (node) {
          return node.value;
        }).join("");
        this.node = new _ValueNode.default("repeat-value", this.name, value, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      if (this._divider != null) {
        var dividerPossibilities = this._divider.getPossibilities(rootPattern);

        return this._pattern.getPossibilities(rootPattern).map(function (possibility) {
          return dividerPossibilities.map(function (divider) {
            return "".concat(possibility).concat(divider);
          });
        }).reduce(function (acc, value) {
          return acc.concat(value);
        }, []);
      } else {
        return this._pattern.getPossibilities(rootPattern);
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this._pattern.getTokens();
    }
  }]);

  return RepeatValue;
}(_ValuePattern2.default);

exports.default = RepeatValue;
//# sourceMappingURL=RepeatValue.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(38));

var _CompositeNode = _interopRequireDefault(__webpack_require__(21));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _Permutor = _interopRequireDefault(__webpack_require__(31));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

var permutor = new _Permutor.default();

var AndComposite =
/*#__PURE__*/
function (_CompositePattern) {
  _inherits(AndComposite, _CompositePattern);

  function AndComposite(name) {
    var _this;

    var patterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, AndComposite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AndComposite).call(this, "and-composite", name, patterns));

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

      this._tryPatterns();

      return this.node;
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
        var startIndex = this.mark;
        var endIndex = lastNode.endIndex;
        this.node = new _CompositeNode.default("and-composite", this.name, startIndex, endIndex);
        this.node.children = this.nodes;
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      var possibilities = this.children.map(function (child) {
        return child.getPossibilities(rootPattern);
      });
      return permutor.permute(possibilities);
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var tokens = [];

      for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (child instanceof _OptionalValue.default || child instanceof _OptionalComposite.default) {
          tokens = tokens.concat(child.getTokens());
        } else {
          tokens = tokens.concat(child.getTokens());
          break;
        }
      }

      return tokens;
    }
  }]);

  return AndComposite;
}(_CompositePattern2.default);

exports.default = AndComposite;
//# sourceMappingURL=AndComposite.js.map

/***/ }),
/* 38 */
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

  function CompositePattern(type, name) {
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, CompositePattern);

    return _possibleConstructorReturn(this, _getPrototypeOf(CompositePattern).call(this, type, name, children));
  }

  _createClass(CompositePattern, [{
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(38));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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
    _classCallCheck(this, OptionalComposite);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionalComposite).call(this, "optional-composite", "optional-composite", [pattern]));
  }

  _createClass(OptionalComposite, [{
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
        cursor.addMatch(this, node);
        return node;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new OptionalComposite(this.children[0]);
    }
  }, {
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      } // This is to prevent possibilities explosion.


      if (this.parent === rootPattern) {
        var possibilities = this.children[0].getPossibilities(rootPattern);
        possibilities.unshift("");
        return possibilities;
      } else {
        return this.children[0].getPossibilities(rootPattern);
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this._children[0].getTokens();
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

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(38));

var _OptionalValue = _interopRequireDefault(__webpack_require__(30));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrComposite).call(this, "or-composite", name, patterns));

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
      this.cursor = cursor;
      this.mark = null;
      this.index = 0;
      this.node = null;
      this.mark = cursor.mark();
    }
  }, {
    key: "parse",
    value: function parse(cursor) {
      this._reset(cursor);

      this._tryPattern();

      if (this.node != null) {
        this.cursor.addMatch(this, this.node);
      }

      return this.node;
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
          this.cursor.index = this.node.endIndex;
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      return this.children.map(function (child) {
        return child.getPossibilities(rootPattern);
      }).reduce(function (acc, value) {
        return acc.concat(value);
      }, []);
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var tokens = this._children.map(function (c) {
        return c.getTokens();
      });

      var hasPrimitiveTokens = tokens.every(function (t) {
        return t.every(function (value) {
          return typeof value === "string";
        });
      });

      if (hasPrimitiveTokens && tokens.length > 0) {
        return tokens.reduce(function (acc, t) {
          return acc.concat(t);
        }, []);
      }

      return this._children[0].getTokens();
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

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(38));

var _CompositeNode = _interopRequireDefault(__webpack_require__(21));

var _ParseError = _interopRequireDefault(__webpack_require__(26));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(39));

var _Pattern = _interopRequireDefault(__webpack_require__(28));

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RepeatComposite).call(this, "repeat-composite", name, divider != null ? [pattern, divider] : [pattern]));
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
        this.cursor.throwError(new _ParseError.default("Did not find a repeating match of ".concat(this.name, "."), this.mark, this));
        this.node = null;
      } else {
        this.node = new _CompositeNode.default("repeat-composite", this.name, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
        this.node.children = this.nodes;
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
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
    key: "getPossibilities",
    value: function getPossibilities(rootPattern) {
      if (rootPattern == null || !(rootPattern instanceof _Pattern.default)) {
        rootPattern = this;
      }

      if (this._divider != null) {
        var dividerPossibilities = this._divider.getPossibilities(rootPattern);

        return this._pattern.getPossibilities(rootPattern).map(function (possibility) {
          return dividerPossibilities.map(function (divider) {
            return "".concat(possibility).concat(divider);
          });
        }).reduce(function (acc, value) {
          return acc.concat(value);
        }, []);
      } else {
        return this._pattern.getPossibilities(rootPattern);
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this._pattern.getTokens();
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

var _ParseError = _interopRequireDefault(__webpack_require__(26));

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
    var _this;

    _classCallCheck(this, RecursivePattern);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecursivePattern).call(this, "recursive", name));
    _this.isRecursing = false;
    return _this;
  }

  _createClass(RecursivePattern, [{
    key: "getPattern",
    value: function getPattern() {
      var _this2 = this;

      return this._climb(this.parent, function (pattern) {
        if (pattern == null) {
          return false;
        }

        return pattern.name === _this2.name;
      });
    }
  }, {
    key: "_climb",
    value: function _climb(pattern, isMatch) {
      if (isMatch(pattern)) {
        return pattern;
      } else {
        if (pattern && pattern.parent != null) {
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

      var node = this.pattern.parse(cursor);

      if (!cursor.hasUnresolvedError()) {
        cursor.addMatch(this, node);
      }

      return node;
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
    key: "getPossibilities",
    value: function getPossibilities() {
      if (!this.isRecursing) {
        this.isRecursing = true;
        var possibilities = this.getPattern().getPossibilities();
        this.isRecursing = false;
        return possibilities;
      } else {
        return ["[".concat(this.name, "]")];
      }
    }
  }, {
    key: "getTokenValue",
    value: function getTokenValue() {
      return this.getPattern().getTokenValue();
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      if (!this.isRecursing) {
        this.isRecursing = true;
        var tokens = this.getPattern().getTokens();
        this.isRecursing = false;
        return tokens;
      }
    }
  }]);

  return RecursivePattern;
}(_Pattern2.default);

exports.default = RecursivePattern;
//# sourceMappingURL=RecursivePattern.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = __webpack_require__(19);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParseInspector =
/*#__PURE__*/
function () {
  function ParseInspector() {
    _classCallCheck(this, ParseInspector);

    this.cursor = null;
    this.result = null;
    this.text = null;
    this.match = null;
    this.error = null;
    this.patternMatch = null;
    this.matchedText = "";
    this.rootPattern = null;
    this.possibilities = null;
  }

  _createClass(ParseInspector, [{
    key: "inspectParse",
    value: function inspectParse(text, pattern) {
      this.reset();
      this.text = text;
      this.rootPattern = pattern; // If no text all options are available.

      if (text.length === 0) {
        return {
          pattern: null,
          astNode: null,
          match: null,
          error: null,
          possibilities: {
            startIndex: 0,
            options: pattern.getPossibilities()
          },
          isComplete: false
        };
      }

      this.parse();
      this.saveMatchedText();
      this.saveMatch();
      this.saveError();
      this.savePossibilities();
      return {
        pattern: this.patternMatch.pattern,
        astNode: this.patternMatch.astNode,
        match: this.match,
        error: this.error,
        possibilities: this.possibilities,
        isComplete: this.cursor.didSuccessfullyParse()
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cursor = null;
      this.result = null;
      this.text = null;
      this.match = null;
      this.error = null;
      this.patternMatch = null;
      this.matchedText = "";
      this.rootPattern = null;
      this.possibilities = null;
    }
  }, {
    key: "parse",
    value: function parse() {
      this.rootPattern = this.rootPattern;
      this.cursor = new _index.Cursor(this.text);
      this.result = this.rootPattern.parse(this.cursor);
      this.patternMatch = this.cursor.lastMatch;
    }
  }, {
    key: "saveMatchedText",
    value: function saveMatchedText() {
      if (this.patternMatch.astNode != null) {
        this.matchedText = this.text.substring(0, this.patternMatch.astNode.endIndex + 1);
      }
    }
  }, {
    key: "saveMatch",
    value: function saveMatch() {
      var node = this.patternMatch.astNode;

      if (node == null) {
        this.match = null;
        return;
      }

      var endIndex = this.matchedText.length - 1;
      this.match = {
        text: this.matchedText,
        startIndex: 0,
        endIndex: endIndex
      };
    }
  }, {
    key: "saveError",
    value: function saveError() {
      if (this.patternMatch.astNode == null) {
        this.error = {
          startIndex: 0,
          endIndex: this.text.length - 1,
          text: this.text
        };
        return this;
      }

      if (this.text.length > this.matchedText.length) {
        var difference = this.text.length - this.matchedText.length;
        var startIndex = this.patternMatch.astNode.endIndex + 1;
        var endIndex = startIndex + difference - 1;
        this.error = {
          startIndex: startIndex,
          endIndex: endIndex,
          text: this.text.substring(startIndex, endIndex + 1)
        };
        return;
      } else {
        this.error = null;
        return;
      }
    }
  }, {
    key: "savePossibilities",
    value: function savePossibilities() {
      if (this.patternMatch.pattern === this.rootPattern && this.cursor.didSuccessfullyParse()) {
        this.possibilities = null;
        return;
      }

      if (this.patternMatch.astNode == null) {
        var _options = this.rootPattern.getPossibilities();

        var parts = this.text.split(" ").filter(function (part) {
          return part.length > 0;
        });
        _options = _options.filter(function (option) {
          return parts.some(function (part) {
            return option.indexOf(part) > -1;
          });
        });

        if (_options.length === 0) {
          this.possibilities = null;
          return;
        }

        this.possibilities = {
          startIndex: 0,
          options: _options
        };
        return;
      }

      var pattern = this.patternMatch.pattern;
      var parentPattern = pattern.parent;
      var index = parentPattern.children.indexOf(pattern);
      var parentClone = parentPattern.clone();
      parentClone.children = parentClone.children.slice(index + 1);
      var options = parentClone.getPossibilities();
      var startIndex = this.matchedText.length;

      if (this.matchedText.length < this.text.length) {
        var leftOver = this.text.substring(this.matchedText.length);
        var partialMatchOptions = options.filter(function (option) {
          return option.indexOf(leftOver) === 0;
        }).map(function (option) {
          return option.substring(leftOver.length);
        });

        if (partialMatchOptions.length === 0) {
          this.possibilities = null;
          return;
        } else {
          this.match = _objectSpread({}, this.match, {
            text: this.match.text + leftOver,
            endIndex: this.match.endIndex + leftOver.length
          });
          this.error = null;
          this.possibilities = {
            startIndex: this.match.endIndex + 1,
            options: partialMatchOptions
          };
          return;
        }
      }

      this.possibilities = {
        startIndex: startIndex,
        options: options
      };
    }
  }], [{
    key: "inspectParse",
    value: function inspectParse(text, pattern) {
      return new ParseInspector().inspectParse(text, pattern);
    }
  }]);

  return ParseInspector;
}();

exports.default = ParseInspector;
//# sourceMappingURL=ParseInspector.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = __webpack_require__(19);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextInspector =
/*#__PURE__*/
function () {
  function TextInspector() {
    _classCallCheck(this, TextInspector);

    this.cursor = null;
    this.result = null;
    this.text = null;
    this.match = null;
    this.error = null;
    this.patternMatch = null;
    this.matchedText = "";
    this.rootPattern = null;
    this.tokens = null;
    this.options = [];
    this.parseStack = [];
  }

  _createClass(TextInspector, [{
    key: "inspect",
    value: function inspect(text, pattern) {
      this.reset();
      this.text = text;
      this.rootPattern = pattern; // If no text all options are available.

      if (text.length === 0) {
        return {
          pattern: null,
          astNode: null,
          match: null,
          error: null,
          tokens: {
            startIndex: 0,
            options: pattern.getTokens()
          },
          isComplete: false,
          parseStack: []
        };
      }

      this.parse();
      this.saveParseStack();
      this.saveMatchedText();
      this.saveMatch();
      this.saveError();
      this.saveOptions();
      this.saveNextToken();
      return {
        pattern: this.patternMatch.pattern,
        astNode: this.patternMatch.astNode,
        match: this.match,
        error: this.error,
        tokens: this.tokens,
        isComplete: this.cursor.didSuccessfullyParse(),
        parseStack: this.parseStack
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cursor = null;
      this.result = null;
      this.text = null;
      this.match = null;
      this.error = null;
      this.patternMatch = null;
      this.matchedText = "";
      this.rootPattern = null;
      this.tokens = null;
      this.options = [];
      this.parseStack = [];
    }
  }, {
    key: "parse",
    value: function parse() {
      this.rootPattern = this.rootPattern;
      this.cursor = new _index.Cursor(this.text);
      this.cursor.startRecording();
      this.result = this.rootPattern.parse(this.cursor);
      this.patternMatch = this.cursor.lastMatch;
    }
  }, {
    key: "saveParseStack",
    value: function saveParseStack() {
      this.parseStack = this.cursor.history.getLastParseStack();
    }
  }, {
    key: "saveMatchedText",
    value: function saveMatchedText() {
      if (this.patternMatch.astNode != null) {
        this.matchedText = this.text.substring(0, this.patternMatch.astNode.endIndex + 1);
      }
    }
  }, {
    key: "saveMatch",
    value: function saveMatch() {
      var node = this.patternMatch.astNode;

      if (node == null) {
        this.match = null;
        return;
      }

      var endIndex = this.matchedText.length - 1;
      this.match = {
        text: this.matchedText,
        startIndex: 0,
        endIndex: endIndex
      };
    }
  }, {
    key: "saveError",
    value: function saveError() {
      if (this.patternMatch.astNode == null) {
        this.error = {
          startIndex: 0,
          endIndex: this.text.length - 1,
          text: this.text
        };
        return this;
      }

      if (this.text.length > this.matchedText.length) {
        var difference = this.text.length - this.matchedText.length;
        var startIndex = this.patternMatch.astNode.endIndex + 1;
        var endIndex = startIndex + difference - 1;
        this.error = {
          startIndex: startIndex,
          endIndex: endIndex,
          text: this.text.substring(startIndex, endIndex + 1)
        };
        return;
      } else {
        this.error = null;
        return;
      }
    }
  }, {
    key: "saveNextToken",
    value: function saveNextToken() {
      if (this.patternMatch.pattern === this.rootPattern && this.cursor.didSuccessfullyParse()) {
        this.tokens = null;
        return;
      }

      if (this.patternMatch.astNode == null) {
        var _options = this.rootPattern.getTokens();

        var parts = this.text.split(" ").filter(function (part) {
          return part.length > 0;
        });
        _options = _options.filter(function (option) {
          return parts.some(function (part) {
            return option.indexOf(part) > -1;
          });
        });

        if (_options.length === 0) {
          this.tokens = null;
          return;
        }

        this.tokens = {
          startIndex: 0,
          options: _options
        };
        return;
      }

      var options = this.options;
      var startIndex = this.matchedText.length;

      if (this.matchedText.length < this.text.length) {
        var leftOver = this.text.substring(this.matchedText.length);
        var partialMatchOptions = options.filter(function (option) {
          return option.indexOf(leftOver) === 0;
        }).map(function (option) {
          return option.substring(leftOver.length);
        });

        if (partialMatchOptions.length === 0) {
          this.tokens = null;
          return;
        } else {
          this.match = _objectSpread({}, this.match, {
            text: this.match.text + leftOver,
            endIndex: this.match.endIndex + leftOver.length
          });
          this.error = null;
          this.tokens = {
            startIndex: this.match.endIndex + 1,
            options: partialMatchOptions
          };
          return;
        }
      }

      this.tokens = {
        startIndex: startIndex,
        options: options
      };
    }
  }, {
    key: "saveOptions",
    value: function saveOptions() {
      var _this = this;

      var furthestMatches = this.cursor.history.astNodes.reduce(function (acc, node, index) {
        if (node.endIndex === acc.furthestTextIndex) {
          acc.nodeIndexes.push(index);
        } else if (node.endIndex > acc.furthestTextIndex) {
          acc.furthestTextIndex = node.endIndex;
          acc.nodeIndexes = [index];
        }

        return acc;
      }, {
        furthestTextIndex: -1,
        nodeIndexes: []
      });
      var matches = furthestMatches.nodeIndexes.reduce(function (acc, index) {
        var pattern = _this.cursor.history.patterns[index];
        var tokens = pattern.getNextTokens();
        tokens.forEach(function (token) {
          acc[token] = true;
        });
        return acc;
      }, {});
      this.options = Object.keys(matches);
    }
  }], [{
    key: "inspect",
    value: function inspect(text, pattern) {
      return new TextInspector().inspect(text, pattern);
    }
  }]);

  return TextInspector;
}();

exports.default = TextInspector;
//# sourceMappingURL=TextInspector.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const divider = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("divider", "\\s*[,]\\s*");

/* harmony default export */ __webpack_exports__["default"] = (divider);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _spaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);




const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("values", _value_js__WEBPACK_IMPORTED_MODULE_1__["default"], _spaces_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (values);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var _method_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52);
;






const value = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrComposite"]("value", [_hex_js__WEBPACK_IMPORTED_MODULE_2__["default"], _method_js__WEBPACK_IMPORTED_MODULE_4__["default"], _unit_js__WEBPACK_IMPORTED_MODULE_1__["default"], _number_js__WEBPACK_IMPORTED_MODULE_3__["default"], _name_js__WEBPACK_IMPORTED_MODULE_5__["default"]]);

/* harmony default export */ __webpack_exports__["default"] = (value);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);




const unitType = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("unit-type", "[a-zA-Z%]+");
const unit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("unit", [_number_js__WEBPACK_IMPORTED_MODULE_1__["default"], unitType]);

/* harmony default export */ __webpack_exports__["default"] = (unit);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const number = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"](
  "number",
  "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?"
);

/* harmony default export */ __webpack_exports__["default"] = (number);


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const hex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");

/* harmony default export */ __webpack_exports__["default"] = (hex);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _optionalSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53);
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);






const openParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("open-paren", "(");
const closeParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("close-paren", ")");
const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RecursivePattern"]("values");
const args = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("arguments", values, _divider_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
const optionalArgs = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalComposite"](args);

const method = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("method", [
  _name_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  openParen,
  _optionalSpaces_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  optionalArgs,
  _optionalSpaces_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  closeParen
]);

/* harmony default export */ __webpack_exports__["default"] = (method);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const name = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

/* harmony default export */ __webpack_exports__["default"] = (name);


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);



const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("optional-space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("optional-spaces", space);
const optionalSpaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](spaces);

/* harmony default export */ __webpack_exports__["default"] = (optionalSpaces);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("spaces", space);

/* harmony default export */ __webpack_exports__["default"] = (spaces);


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89);
/* harmony import */ var _TreeUtility_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4__);






const treeUtility = new _TreeUtility_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const treeNormalizer = new _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

class Animation {
  constructor(config) {
    this.config = config;
    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = Array.isArray(config.controls)
      ? config.controls
      : [];
    this.value = this.from;

    this.normalizeEasing();
    this.createNodeTrees();
    this.validate();
  }

  normalizeEasing() {
    const config = this.config;

    this.easing =
      typeof config.easing === "string"
        ? _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"][config.easing]
        : config.easing;
    this.easing = config.easing || _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"].linear;
  }

  createNodeTrees() {
    this.controlNodes = this.controls.map((c) =>
      treeNormalizer.normalize(_patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4__["Cursor"](c)))
    );

    this.toNode = treeNormalizer.normalize(
      _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4__["Cursor"](this.to))
    );

    this.fromNode = treeNormalizer.normalize(
      _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_1__["default"].parse(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_4__["Cursor"](this.from))
    );

    this.resultNode = this.fromNode.clone();
  }

  validate() {
    if (typeof this.property !== "string") {
      throw new Error(`The "property" property needs to be a string.`);
    }

    if (typeof this.to !== "string") {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.to}.`
      );
    }

    if (typeof this.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.from}.`
      );
    }

    if (typeof this.name !== "string") {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
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

    if (this.easing == null || typeof this.easing.valueAt !== "function") {
      throw new Error(`The "easing" property must be an instance of Easing.`);
    }

    this.validateNodes();
  }

  validateNodes() {
    const allTrees = [this.fromNode, ...this.controlNodes, this.toNode];
    const fromNode = this.fromNode;

    const allStructuresAreEqual = allTrees.every((node) => {
      return treeUtility.areTreeStructuresEqual(fromNode, node);
    });

    if (!allStructuresAreEqual) {
      throw new Error(
        `Invalid Animation: The value types that are being animated do not match. From: ${JSON.stringify(
          this.from
        )}, To:${JSON.stringify(this.to)}, Controls: ${JSON.stringify(
          this.controls
        )}`
      );
    }
  }
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easingFunctions_EaseInQuad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57);
/* harmony import */ var _easingFunctions_EaseOutQuad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var _easingFunctions_EaseInOutQuad_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);
/* harmony import */ var _easingFunctions_EaseInElastic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61);
/* harmony import */ var _easingFunctions_EaseInOutElastic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62);
/* harmony import */ var _easingFunctions_EaseOutElastic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63);
/* harmony import */ var _easingFunctions_EaseInOutBack_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64);
/* harmony import */ var _easingFunctions_EaseInOutBounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(65);
/* harmony import */ var _easingFunctions_EaseInBounce_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(66);
/* harmony import */ var _easingFunctions_EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(67);
/* harmony import */ var _easingFunctions_EaseInCubic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(68);
/* harmony import */ var _easingFunctions_EaseOutCubic_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(69);
/* harmony import */ var _easingFunctions_EaseInOutCubic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(70);
/* harmony import */ var _easingFunctions_EaseInQuart_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(71);
/* harmony import */ var _easingFunctions_EaseOutQuart_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(72);
/* harmony import */ var _easingFunctions_EaseInOutQuart_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(73);
/* harmony import */ var _easingFunctions_EaseInQuint_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(74);
/* harmony import */ var _easingFunctions_EaseOutQuint_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(75);
/* harmony import */ var _easingFunctions_EaseInOutQuint_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(76);
/* harmony import */ var _easingFunctions_EaseInSine_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(77);
/* harmony import */ var _easingFunctions_EaseOutSine_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(78);
/* harmony import */ var _easingFunctions_EaseInOutSine_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(79);
/* harmony import */ var _easingFunctions_EaseInExpo_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(80);
/* harmony import */ var _easingFunctions_EaseOutExpo_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(81);
/* harmony import */ var _easingFunctions_EaseInOutExpo_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(82);
/* harmony import */ var _easingFunctions_EaseInCirc_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(83);
/* harmony import */ var _easingFunctions_EaseOutCirc_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(84);
/* harmony import */ var _easingFunctions_EaseInOutCirc_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(85);
/* harmony import */ var _easingFunctions_EaseInBack_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(86);
/* harmony import */ var _easingFunctions_EaseOutBack_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(87);
/* harmony import */ var _easingFunctions_EaseLinear_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(88);
































const easings = {
  easeInQuad: new _easingFunctions_EaseInQuad_js__WEBPACK_IMPORTED_MODULE_0__["default"](),
  easeOutQuad: new _easingFunctions_EaseOutQuad_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  easeInOutQuad: new _easingFunctions_EaseInOutQuad_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
  easeInCubic: new _easingFunctions_EaseInCubic_js__WEBPACK_IMPORTED_MODULE_10__["default"](),
  easeOutCubic: new _easingFunctions_EaseOutCubic_js__WEBPACK_IMPORTED_MODULE_11__["default"](),
  easeInOutCubic: new _easingFunctions_EaseInOutCubic_js__WEBPACK_IMPORTED_MODULE_12__["default"](),
  easeInQuart: new _easingFunctions_EaseInQuart_js__WEBPACK_IMPORTED_MODULE_13__["default"](),
  easeOutQuart: new _easingFunctions_EaseOutQuart_js__WEBPACK_IMPORTED_MODULE_14__["default"](),
  easeInOutQuart: new _easingFunctions_EaseInOutQuart_js__WEBPACK_IMPORTED_MODULE_15__["default"](),
  easeInQuint: new _easingFunctions_EaseInQuint_js__WEBPACK_IMPORTED_MODULE_16__["default"](),
  easeOutQuint: new _easingFunctions_EaseOutQuint_js__WEBPACK_IMPORTED_MODULE_17__["default"](),
  easeInOutQuint: new _easingFunctions_EaseInOutQuint_js__WEBPACK_IMPORTED_MODULE_18__["default"](),
  easeInSine: new _easingFunctions_EaseInSine_js__WEBPACK_IMPORTED_MODULE_19__["default"](),
  easeOutSine: new _easingFunctions_EaseOutSine_js__WEBPACK_IMPORTED_MODULE_20__["default"](),
  easeInOutSine: new _easingFunctions_EaseInOutSine_js__WEBPACK_IMPORTED_MODULE_21__["default"](),
  easeInExpo: new _easingFunctions_EaseInExpo_js__WEBPACK_IMPORTED_MODULE_22__["default"](),
  easeOutExpo: new _easingFunctions_EaseOutExpo_js__WEBPACK_IMPORTED_MODULE_23__["default"](),
  easeInOutExpo: new _easingFunctions_EaseInOutExpo_js__WEBPACK_IMPORTED_MODULE_24__["default"](),
  easeInCirc: new _easingFunctions_EaseInCirc_js__WEBPACK_IMPORTED_MODULE_25__["default"](),
  easeOutCirc: new _easingFunctions_EaseOutCirc_js__WEBPACK_IMPORTED_MODULE_26__["default"](),
  easeInOutCirc: new _easingFunctions_EaseInOutCirc_js__WEBPACK_IMPORTED_MODULE_27__["default"](),
  easeInElastic: new _easingFunctions_EaseInElastic_js__WEBPACK_IMPORTED_MODULE_3__["default"](),
  easeOutElastic: new _easingFunctions_EaseOutElastic_js__WEBPACK_IMPORTED_MODULE_5__["default"](),
  easeInOutElastic: new _easingFunctions_EaseInOutElastic_js__WEBPACK_IMPORTED_MODULE_4__["default"](),
  easeInBack: new _easingFunctions_EaseInBack_js__WEBPACK_IMPORTED_MODULE_28__["default"](),
  easeOutBack: new _easingFunctions_EaseOutBack_js__WEBPACK_IMPORTED_MODULE_29__["default"](),
  easeInOutBack: new _easingFunctions_EaseInOutBack_js__WEBPACK_IMPORTED_MODULE_6__["default"](),
  easeInBounce: new _easingFunctions_EaseInBounce_js__WEBPACK_IMPORTED_MODULE_8__["default"](),
  easeOutBounce: new _easingFunctions_EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_9__["default"](),
  easeInOutBounce: new _easingFunctions_EaseInOutBounce_js__WEBPACK_IMPORTED_MODULE_7__["default"](),
  linear: new _easingFunctions_EaseLinear_js__WEBPACK_IMPORTED_MODULE_30__["default"](),
};

/* harmony default export */ __webpack_exports__["default"] = (easings);


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInQuad; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInQuad extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return percentage * percentage;
    };
    super(func);
  }
}


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FunctionEasing; });
class FunctionEasing {
  constructor(func) {
    this.func = func;
    this.validateFunction();
  }

  valueAt(percentage) {
    return this.func(percentage);
  }

  validateFunction() {
    if (typeof this.func !== "function") {
      throw new Error("Function easing needs a function to work properly.");
    }
  }
}


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutQuad; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutQuad extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return -percentage * (percentage - 2);
    };
    super(func);
  }
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutQuad; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutQuad extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1) return (1 / 2) * percentage * percentage;
      return (-1 / 2) * (--percentage * (percentage - 2) - 1);
    };
    super(func);
  }
}


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInElastic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInElastic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tension) {
    const func = (percentage) => {
      const p = 0.3 / this.tension;
      const s = p / 4;
      const a = 1;

      if (percentage <= 0) return 0;
      if (percentage >= 1) return 1;

      return -(
        a *
        Math.pow(2, 10 * (percentage -= 1)) *
        Math.sin(((percentage - s) * (2 * Math.PI)) / p)
      );
    };

    super(func);
    this.tension = tension === "number" ? tension : 1;
  }
}


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutElastic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutElastic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tension) {
    const func = (t) => {
      var b = 0;
      var c = 1;
      var d = 1;
      var s = 1.70158;
      var p = 0;
      var a = c;

      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (0.3 / this.tension);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      if (t < 1)
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
          b
        );
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
        c +
        b
      );
    };

    super(func);
    this.tension = tension === "number" ? tension : 1;
  }
}


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutElastic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutElastic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tension) {
    const func = (percentage) => {
      const p = 0.3 / this.tension;
      const s = p / 4;
      const a = 1;

      if (percentage <= 0) return 0;
      if (percentage >= 1) return 1;

      return (
        a *
          Math.pow(2, -10 * percentage) *
          Math.sin(((percentage - s) * (2 * Math.PI)) / p) +
        1
      );
    };

    super(func);
    this.tension = tension === "number" ? tension : 1;
  }
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutBack; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutBack extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      const s = 1.70158 * 1.525;

      if ((percentage /= 1 / 2) < 1) {
        return (1 / 2) * (percentage * percentage * ((s + 1) * percentage - s));
      }

      return (
        (1 / 2) *
        ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2)
      );
    };
    super(func);
  }
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutBounce; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _EaseInBounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
/* harmony import */ var _EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);




const easeInBounce = new _EaseInBounce_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const easeOutBounce = new _EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

class EaseInOutBounce extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if (percentage < 0.5) {
        return easeInBounce.valueAt(percentage * 2) * 0.5;
      } else {
        return easeOutBounce.valueAt(percentage * 2 - 1) * 0.5 + 0.5;
      }
    };

    super(func);
  }
}


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInBounce; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);



const easeOutBounce = new _EaseOutBounce_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class EaseInBounce extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return 1 - easeOutBounce.valueAt(1 - percentage);
    };

    super(func);
  }
}


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutBounce; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutBounce extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      let t = percentage;

      if ((t /= 1) < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    };

    super(func);
  }
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInCubic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInCubic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return 1 * (percentage /= 1) * percentage * percentage;
    };
    super(func);
  }
}


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutCubic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutCubic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return (
        1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1)
      );
    };
    super(func);
  }
}


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutCubic; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutCubic extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage * percentage;
      return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
    };
    super(func);
  }
}


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInQuart; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInQuart extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return 1 * (percentage /= 1) * percentage * percentage * percentage;
    };
    super(func);
  }
}


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutQuart; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutQuart extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return (
        -1 *
        ((percentage = percentage / 1 - 1) *
          percentage *
          percentage *
          percentage -
          1)
      );
    };
    super(func);
  }
}


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutQuart; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutQuart extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage * percentage * percentage;
      return (
        (-1 / 2) *
        ((percentage -= 2) * percentage * percentage * percentage - 2)
      );
    };
    super(func);
  }
}


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInQuint; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInQuint extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return (
        1 *
        (percentage /= 1) *
        percentage *
        percentage *
        percentage *
        percentage
      );
    };
    super(func);
  }
}


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutQuint; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutQuint extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return (
        1 *
        ((percentage = percentage / 1 - 1) *
          percentage *
          percentage *
          percentage *
          percentage +
          1)
      );
    };
    super(func);
  }
}


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutQuint; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutQuint extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (
          (1 / 2) *
          percentage *
          percentage *
          percentage *
          percentage *
          percentage
        );
      return (
        (1 / 2) *
        ((percentage -= 2) * percentage * percentage * percentage * percentage +
          2)
      );
    };
    super(func);
  }
}


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInSine; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInSine extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return -Math.cos(percentage * (Math.PI / 2)) + 1;
    };
    super(func);
  }
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutSine; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutSine extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
    };
    super(func);
  }
}


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutSine; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutSine extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
    };
    super(func);
  }
}


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInExpo; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInExpo extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
    };
    super(func);
  }
}


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutExpo; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutExpo extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return percentage == 1
        ? 1
        : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
    };
    super(func);
  }
}


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutExpo; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutExpo extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if (percentage == 0) return 0;
      if (percentage == 1) return 1;
      if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * Math.pow(2, 10 * (percentage - 1));
      return (1 / 2) * (-Math.pow(2, -10 * --percentage) + 2);
    };
    super(func);
  }
}


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInCirc; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInCirc extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
    };
    super(func);
  }
}


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutCirc; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutCirc extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
    };
    super(func);
  }
}


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInOutCirc; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInOutCirc extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
      return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
    };
    super(func);
  }
}


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseInBack; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseInBack extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      const s = 1.70158;
      return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
    };
    super(func);
  }
}


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseOutBack; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseOutBack extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      const s = 1.70158;
      return (
        1 *
        ((percentage = percentage / 1 - 1) *
          percentage *
          ((s + 1) * percentage + s) +
          1)
      );
    };
    super(func);
  }
}


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaseLinear; });
/* harmony import */ var _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);


class EaseLinear extends _FunctionEasing_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    const func = (percentage) => {
      return percentage;
    };
    super(func);
  }
}


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TreeNormalizer; });
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);
/* harmony import */ var _HexColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91);



const filterOutSpaces = (child) => child.name !== "optional-spaces";

class TreeNormalizer {
  constructor() {
    this.visitNode = this.visitNode.bind(this);
    this.visitor = new _Visitor_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.visitNode);
  }

  visitNode(node) {
    if (Array.isArray(node.children)) {
      this.removeOptionalSpaces(node);
      this.replaceHex(node);
      this.removeUnnecessaryDividers(node);
      this.removeUnnecessarySpaces(node);
    }

    this.removeSpacesAroundDividers(node);
  }

  removeSpacesAroundDividers(node) {
    if (node.name === "divider"){
      node.value = node.value.trim() + " ";
    }
  }

  removeUnnecessaryDividers(node) {
    const children = node.children;

    while (
      children.length > 0 &&
      children[children.length - 1].name === "divider"
    ) {
      children.pop();
    }
  }

  removeUnnecessarySpaces(node) {
    const children = node.children;

    while (
      node.name === "values" &&
      children.length > 0 &&
      children[children.length - 1].name === "spaces"
    ) {
      children.pop();
    }
  }

  removeOptionalSpaces(node) {
    node.children = node.children.filter(filterOutSpaces);
  }

  replaceHex(node) {
    node.children = node.children.map((child) => {
      if (child.name === "hex") {
        const hexColor = new _HexColor_js__WEBPACK_IMPORTED_MODULE_1__["default"](child.value);
        return hexColor.toComplexNode();
      }
      return child;
    });
  }

  normalize(node) {
    this.visitor.visitDown(node);
    return node;
  }
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Visitor; });
const emptyFn = () => {};

class Visitor {
  constructor(callback) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  walkUp(node) {
    if (Array.isArray(node.children)) {
      node.children.forEach(this.visitUp);
    }

    this.callback(node);
  }

  visitUp(node) {
    this.walkUp(node);
  }

  walkDown(node) {
    this.callback(node);

    if (Array.isArray(node.children)) {
      node.children.forEach(this.visitDown);
    }
  }

  visitDown(node) {
    this.walkDown(node);
  }

  setCallback(callback){
    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
  };
}


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HexColor; });
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _patterns_hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);




const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

class HexColor {
  constructor(hexString) {
    this.setHex(hexString);
  }

  setHex(hexString) {
    this.hexString = hexString;
    this.normalizeHex();
    this.saveRgba();
  }

  saveRgba() {
    const hex = this.hexString;
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    this.rgba = result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
          1
        ]
      : [0, 0, 0, 1];
  }

  toComplexNode() {
    const children = this.rgba
      .map((number) => {
        const valuesNode = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["CompositeNode"]("repeat-composite", "values");
        valuesNode.children.push(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("regex-value", "number", number.toString()));

        return valuesNode;
      })
      .reduce((acc, valueNode) => {
        acc.push(valueNode);
        acc.push(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("regex-value", "divider", ", "));
        return acc;
      }, []);

    const node = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["CompositeNode"]("and-composite", "method");
    const name = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("regex-value", "name", "rgba");
    const openParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("literal", "open-paren", "(");
    const args = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["CompositeNode"]("repeat-composite", "arguments");
    const closeParen = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("literal", "close-paren", ")");

    args.children = children;

    node.children.push(name, openParen, args, closeParen);

    return node;
  }

  toValueNode() {
    return new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("hex", this.hexString);
  }

  toRgbString() {
    return `rgb(${this.rgba[0]},${this.rgba[1]},${this.rgba[2]})`;
  }

  normalizeHex() {
    if (this.hexString.length === 4) {
      this.hexString = this.hexString + this.hexString.substring(1);
    }
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

  toHexString() {
    const rgbArray = this.rgba;
    const red = this.numberToHex(rgbArray[0]);
    const green = this.numberToHex(rgbArray[1]);
    const blue = this.numberToHex(rgbArray[2]);

    return `#${red}${green}${blue}`;
  }
}


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TreeUtility; });
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);


const visitor = new _Visitor_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

class TreeUtility {
  areTreeStructuresEqual(nodeA, nodeB) {
    const nodeASequence = [];
    const nodeBSequence = [];

    visitor.setCallback(node => {
      nodeASequence.push(node.name);
    });
    visitor.visitDown(nodeA);

    visitor.setCallback(node => {
      nodeBSequence.push(node.name);
    });
    visitor.visitDown(nodeB);

    return nodeASequence.join("|") === nodeBSequence.join("|");
  }
}


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlendedEasing; });
/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _Easing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94);



class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.fromEasing = options.from;
    this.offset = options.offset;
    this.toEasing = options.to;
    this.transitionDuration =
      typeof options.transitionDuration === "number"
        ? options.transitionDuration
        : 0.25;

    this.validateOptions();

    this.slope = this.getSlope();
    this.continuedSlopeEasing = new _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__["default"]([0, this.slope]);
    this.easing = new _Easing_js__WEBPACK_IMPORTED_MODULE_1__["default"]([0, 0, 0, 1, 1, 1, 1, 1]);
  }

  // Use differential calculas to get slope.
  getSlope() {
    const deltaX = 0.01;

    let rise;

    if (this.offset < 1) {
      rise =
        this.fromEasing.valueAt(deltaX + this.offset) -
        this.fromEasing.valueAt(this.offset);
    } else {
      rise = this.fromEasing.valueAt(1) - this.fromEasing.valueAt(1 - deltaX);
    }

    const run = deltaX;

    return rise / run;
  }

  getFromValue(percentage) {
    const fromPercentage = this.offset + percentage;
    let fromValue;

    // Get the value from the easing until it finishes then use the slope easing.
    if (fromPercentage <= 1) {
      fromValue =
        this.fromEasing.valueAt(fromPercentage) -
        this.fromEasing.valueAt(this.offset);
    } else {
      fromValue =
        this.continuedSlopeEasing.valueAt(fromPercentage - 1) +
        this.fromEasing.valueAt(1) -
        this.fromEasing.valueAt(this.offset);
    }

    return fromValue;
  }

  valueAt(percentage) {
    const adjustedPercentage = this.easing.valueAt(percentage / this.transitionDuration);
    const toValue = this.toEasing.valueAt(percentage);
    const fromValue = this.getFromValue(percentage);

    if (percentage < this.transitionDuration) {
      return fromValue + (toValue - fromValue) * adjustedPercentage;
    } else {
      return toValue;
    }
  }

  validateOptions() {
    if (
      typeof this.fromEasing.valueAt !== "function" ||
      typeof this.toEasing.valueAt !== "function"
    ) {
      throw new Error(
        "Both fromEasing and toEasing need to have a valueAt function."
      );
    }
  }
}


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Easing; });
/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


class Easing extends _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(points) {
    super(points);
  }

  validatePoints() {
    if (this.points[0] !== 0) {
      throw new Error("The first point needs to be zero");
    }

    if (this.points[this.points.length - 1] !== 1) {
      throw new Error("The last point needs to be one.");
    }
  }
}


/***/ })
/******/ ]);
});