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

/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _Animation_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easings", function() { return _easings_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BezierCurve", function() { return _BezierCurve_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



const sortAsc = (animatorA, animatorB) => {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

class Timeline {
  constructor(animations) {
    this.animators = new Map();
    this._time = 0;

    this.initialize(animations);
  }

  initialize(animations) {
    this._currentValues = {};

    this.animators = animations
      .map((animation) => {
        if (animation instanceof _Animation_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          return animation;
        } else {
          return _Animation_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromSimpleConfig(animation);
        }
      })
      .map((animation) => new _Animator_js__WEBPACK_IMPORTED_MODULE_0__["default"](animation));

    this._createCurrentValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  _createCurrentValues() {
    this._currentValues = this.animators.reduce((results, animator) => {
      const name = animator.animation.name;
      const property = animator.animation.property;

      let animation = results[name];

      if (animation == null) {
        animation = results[name] = {};
      }

      if (animation[property] == null) {
        animation[property] = animator.animation.result.clone();
      }

      return results;
    }, {});
  }

  _assignValue(animation) {
    const currentValue = this._currentValues[animation.name][
      animation.property
    ];

    currentValue.value = animation.result.value;
    currentValue.graph = animation.result.graph;
    currentValue.graphHash = animation.result.graphHash;
  }

  _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    // Assign all values at least once.
    // This initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const animation = animators[x].animation;
      const key = `${animation.name}|${animation.property}`;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this._assignValue(animation);
      }
    }

    // Assign if the value if the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const animation = animators[x].animation;

      if (animation.startAt <= this._time) {
        this._assignValue(animation);
      }
    }
  }

  update(time) {
    this._time = time;
    // Update all animations
    this.animators.forEach((animator) => {
      animator.update(time);
    });

    this._saveCurrentValues();

    return this;
  }

  getCurrentValues() {
    return this._currentValues;
  }

  merge(timeline) {
    const oldAnimations = this.animators.map((a) => a.animation);
    const newAnimations = timeline.animators.map((a) => a.animation);

    this.initialize([...oldAnimations, ...newAnimations]);

    return this;
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animator; });
/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _GraphsVisitor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



const visitor = new _GraphsVisitor_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class Animator {
  constructor(animation) {
    this.animation = animation;
    this.visit = this.visit.bind(this);
    this.time = 0;
    this.bezierCurve = new _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__["default"]([]);
    this.animationGraphs = [];
    this.createAnimationGraphs();
  }

  createAnimationGraphs() {
    this.animationGraphs.length = 0;

    this.animationGraphs.push(this.animation.from.graph);

    for (let x = 0; x < this.animation.controls.length; x++) {
      this.animationGraphs.push(this.animation.controls[x].graph);
    }

    this.animationGraphs.push(this.animation.to.graph);
    this.animationGraphs.push(this.animation.result.graph);
  }

  visit(nodes) {
    const cloneNodes = nodes.slice();
    const resultNode = cloneNodes.pop();
    const time = this.time;

    if (cloneNodes[0].name === "number") {
      const relativeProgress = time - this.animation.startAt;
      const animationDuration = this.animation.endAt - this.animation.startAt;
      const timeWithEasing =
        this.animation.easing(relativeProgress) * animationDuration;

      const points = cloneNodes.map((node) => node.value);

      this.bezierCurve.setPoints(points);
      resultNode.value = this.bezierCurve.valueAt(timeWithEasing);
    } else {
      if (!Array.isArray(resultNode.children)) {
        if (time >= this.animation.startAt) {
          resultNode.value = cloneNodes[cloneNodes.length - 1].value;
        } else {
          resultNode.value = cloneNodes[0].value;
        }
      }
    }
  }

  update(time) {
    this.time = time;

    visitor.setCallback(this.visit);
    visitor.visitDown(this.animationGraphs, true);

    const value = this.animation.result.graph.toString();
    this.animation.result.value = value;

    return this.animation.result;
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BezierCurve; });
class BezierCurve {
  constructor(points) {
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphsVisitor; });
/* harmony import */ var _TreeUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const emptyFn = () => {};
const treeUtility = new _TreeUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

class GraphsVisitor {
  constructor(callback) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  visitUp(graphs, optimized = false) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    if (!optimized) {
      const areEqual = siblings.every((sibling) =>
        treeUtility.areTreeStructuresEqual(node, sibling)
      );

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }
    }

    this.walkUp(graphs);
  }

  walkUp(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const node = graphs[0];

    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childGraphs = graphs.map((node) => {
          return node.children[index];
        });
        this.walkUp(childGraphs);
      }
    }

    this.callback(graphs);
  }

  visitDown(graphs, optimized = false) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    if (!optimized) {
      const areEqual = siblings.every((sibling) =>
        treeUtility.areTreeStructuresEqual(node, sibling)
      );

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }
    }

    this.walkDown(graphs);
  }

  walkDown(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    this.callback(graphs);

    const node = graphs[0];
    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childGraphs = graphs.map((node) => {
          return node.children[index];
        });
        this.walkDown(childGraphs);
      }
    }
  }

  setCallback(callback) {
    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TreeUtility; });
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const visitor = new _Visitor_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

function convertNumberNode(node) {
  if (node.name === "number") {
    node.value = Number(node.value);
  }
}

// Hashing function, this may not be the best. So this may need to be replaced.
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

class TreeUtility {
  areTreeStructuresEqual(nodeA, nodeB) {
    const nodeASequence = this.sequence(nodeA);
    const nodeBSequence = this.sequence(nodeB);
    return nodeASequence === nodeBSequence;
  }

  sequence(node) {
    const sequence = [];
    visitor.setCallback((node) => {
      sequence.push(node.name);
    });
    visitor.visitDown(node);

    return sequence.join("|");
  }

  sequenceHash(node) {
    return hash(this.sequence(node));
  }

  convertNumberNodesToNumberValues(node) {
    visitor.setCallback(convertNumberNode);
    visitor.visitDown(node);
  }
}


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _AnimationConfigValidator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _AnimationUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);



const validator = new _AnimationConfigValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const utility = new _AnimationUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class Animation {
  constructor(config) {
    validator.setConfig(config);
    validator.validate(config);

    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.result = config.from.clone();
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls;
    this.easing = config.easing;
  }

  static fromSimpleConfig(config) {
    return new Animation(utility.normalizeConfig(config));
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimationConfigValidator; });
/* harmony import */ var _ParsedValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class AnimationConfigValidator {
  constructor() {
    this.config = null;
  }

  setConfig(config) {
    this.config = config;
  }

  isSimpleConfig() {
    return this.hasValidToAsString();
  }

  validateConfig() {
    if (this.config == null) {
      throw new Error(
        `Invalid Arguments: The "config" cannot be null or undefined.`
      );
    }
  }

  validate(config) {
    this.setConfig(config);
    this.validateName();
    this.validateProperty();
    this.validateToAsParsedValue();
    this.validateControlsAsParsedValues();
    this.validateFromAsParsedValue();
    this.validateStartAt();
    this.validateEndAt();
    this.validateEasingFunction();
    this.validateNodes();
  }

  validateName() {
    this.validateConfig();

    if (!this.hasValidName()) {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
      );
    }
  }

  hasValidName() {
    return typeof this.config.name === "string";
  }

  validateProperty() {
    this.validateConfig();

    if (!this.hasValidProperty()) {
      throw new Error(`The "property" property needs to be a string.`);
    }
  }

  hasValidProperty() {
    return typeof this.config.property === "string";
  }

  validateToAsString() {
    this.validateConfig();

    if (!this.hasValidToAsString()) {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.config.to}.`
      );
    }
  }

  hasValidToAsString() {
    return typeof this.config.to === "string";
  }

  validateToAsParsedValue() {
    this.validateConfig();

    if (!this.hasValidToAsParsedValue()) {
      throw new Error(
        `The "to" property needs to be a ParsedValue, but found ${this.config.to}.`
      );
    }
  }

  hasValidToAsParsedValue() {
    return this.config.to instanceof _ParsedValue__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  validateFromAsString() {
    this.validateConfig();

    if (typeof this.config.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.config.from}.`
      );
    }
  }

  hasValidFromAsString() {
    return typeof this.config.from === "string";
  }

  validateFromAsParsedValue() {
    this.validateConfig();

    if (!this.hasValidFromAsParsedValue()) {
      throw new Error(
        `The "from" property needs to be a ParsedValue, but found ${this.config.from}.`
      );
    }
  }

  hasValidFromAsParsedValue() {
    return this.config.from instanceof _ParsedValue__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  validateControlsAsStrings() {
    this.validateConfig();

    if (!this.hasValidControlsAsStrings()) {
      throw new Error(
        `The "controls" property needs to be made of strings, but found ${this.config.controls}.`
      );
    }
  }

  hasValidControlsAsStrings() {
    return (
      Array.isArray(this.config.controls) &&
      this.config.controls.every((control) => typeof control === "string")
    );
  }

  validateControlsAsParsedValues() {
    this.validateConfig();

    if (!this.hasValidControlsAsParsedValues()) {
      throw new Error(
        `The "controls" property needs to be made of ParsedValues, but found ${this.config.controls}.`
      );
    }
  }

  hasValidControlsAsParsedValues() {
    return this.config.controls.every(
      (control) => control instanceof _ParsedValue__WEBPACK_IMPORTED_MODULE_0__["default"]
    );
  }

  validateStartAt() {
    this.validateConfig();

    if (!this.hasValidStartAt) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }
  }

  hasValidStartAt() {
    return (
      typeof this.config.startAt === "number" &&
      this.config.startAt >= 0 &&
      this.config.startAt <= 1
    );
  }

  validateEndAt() {
    this.validateConfig();

    if (!this.hasValidEndAt()) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }
  }

  hasValidEndAt() {
    return (
      typeof this.config.endAt === "number" &&
      this.config.endAt >= 0 &&
      this.config.endAt <= 1
    );
  }

  validateEasingString() {
    this.validateConfig();

    if (!this.hasValidEasingString()) {
      throw new Error(`The "easing" property must be a string.`);
    }
  }

  hasValidEasingString() {
    return typeof this.config.easing === "string";
  }

  validateEasingFunction() {
    this.validateConfig();

    if (!this.hasValidEasingFunction()) {
      throw new Error(`The "easing" property must be a function.`);
    }
  }

  hasValidEasingFunction() {
    return typeof this.config.easing === "function";
  }

  validateNodes() {
    this.validateConfig();
    const config = this.config;

    if (!this.areGraphStructuresEqual()) {
      throw new Error(
        `Invalid Animation: The value types that are being animated do not match. From: ${JSON.stringify(
          config.from.value
        )}, To:${JSON.stringify(config.to.value)}, Controls: ${JSON.stringify(
          config.controls.map((v) => v.value)
        )}`
      );
    }
  }

  areGraphStructuresEqual() {
    let allStructuresAreEqual = true;
    const config = this.config;

    if (config.to.graphHash !== config.from.graphHash) {
      allStructuresAreEqual = false;
    }

    for (let x = 0; x < config.controls.length; x++) {
      const value = config.controls[x];

      if (value.graphHash !== config.from.graphHash) {
        allStructuresAreEqual = false;
        break;
      }
    }

    return allStructuresAreEqual;
  }
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParsedValue; });
/* harmony import */ var _patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
/* harmony import */ var _TreeUtility_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_3__);





const treeUtility = new _TreeUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const treeNormalizer = new _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class ParsedValue {
  constructor(value, graph, graphHash) {
    this.value = value;

    if (typeof graph === "undefined") {
      this.graph = treeNormalizer.normalize(_patterns_cssValue_js__WEBPACK_IMPORTED_MODULE_0__["default"].parse(new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_3__["Cursor"](value)));
      treeUtility.convertNumberNodesToNumberValues(this.graph);
    } else {
      this.graph = graph;
    }

    if (typeof graphHash === "undefined") {
      this.graphHash = treeUtility.sequenceHash(this.graph);
    } else {
      this.graphHash = graphHash;
    }
  }

  clone() {
    return new ParsedValue(this.value, this.graph.clone(), this.graphHash);
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);




const cssValue = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("css-value", _values_js__WEBPACK_IMPORTED_MODULE_2__["default"], _divider_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (cssValue);


/***/ }),
/* 12 */
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

var _Node = _interopRequireDefault(__webpack_require__(13));

var _CompositeNode = _interopRequireDefault(__webpack_require__(14));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _Cursor = _interopRequireDefault(__webpack_require__(16));

var _RegexValue = _interopRequireDefault(__webpack_require__(18));

var _AndValue = _interopRequireDefault(__webpack_require__(22));

var _AnyOfThese = _interopRequireDefault(__webpack_require__(25));

var _Literal = _interopRequireDefault(__webpack_require__(26));

var _NotValue = _interopRequireDefault(__webpack_require__(27));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _OrValue = _interopRequireDefault(__webpack_require__(28));

var _RepeatValue = _interopRequireDefault(__webpack_require__(29));

var _ValuePattern = _interopRequireDefault(__webpack_require__(20));

var _AndComposite = _interopRequireDefault(__webpack_require__(30));

var _CompositePattern = _interopRequireDefault(__webpack_require__(31));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(32));

var _OrComposite = _interopRequireDefault(__webpack_require__(33));

var _RepeatComposite = _interopRequireDefault(__webpack_require__(34));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

var _RecursivePattern = _interopRequireDefault(__webpack_require__(35));

var _ParseInspector = _interopRequireDefault(__webpack_require__(36));

var _TextInspector = _interopRequireDefault(__webpack_require__(37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(13));

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(__webpack_require__(13));

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CursorHistory = _interopRequireDefault(__webpack_require__(17));

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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _Cursor = _interopRequireDefault(__webpack_require__(16));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(21));

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cursor = _interopRequireDefault(__webpack_require__(16));

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _Permutor = _interopRequireDefault(__webpack_require__(24));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern = _interopRequireDefault(__webpack_require__(20));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _Pattern2 = _interopRequireDefault(__webpack_require__(21));

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuePattern2 = _interopRequireDefault(__webpack_require__(20));

var _ValueNode = _interopRequireDefault(__webpack_require__(15));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(31));

var _CompositeNode = _interopRequireDefault(__webpack_require__(14));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(32));

var _Permutor = _interopRequireDefault(__webpack_require__(24));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(21));

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(31));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(31));

var _OptionalValue = _interopRequireDefault(__webpack_require__(23));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(32));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CompositePattern2 = _interopRequireDefault(__webpack_require__(31));

var _CompositeNode = _interopRequireDefault(__webpack_require__(14));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

var _OptionalComposite = _interopRequireDefault(__webpack_require__(32));

var _Pattern = _interopRequireDefault(__webpack_require__(21));

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pattern2 = _interopRequireDefault(__webpack_require__(21));

var _ParseError = _interopRequireDefault(__webpack_require__(19));

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = __webpack_require__(12);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = __webpack_require__(12);

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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const divider = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("divider", "\\s*[,]\\s*");

/* harmony default export */ __webpack_exports__["default"] = (divider);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _spaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);




const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("values", _value_js__WEBPACK_IMPORTED_MODULE_1__["default"], _spaces_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (values);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _method_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45);
;






const value = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrComposite"]("value", [_hex_js__WEBPACK_IMPORTED_MODULE_2__["default"], _method_js__WEBPACK_IMPORTED_MODULE_4__["default"], _unit_js__WEBPACK_IMPORTED_MODULE_1__["default"], _number_js__WEBPACK_IMPORTED_MODULE_3__["default"], _name_js__WEBPACK_IMPORTED_MODULE_5__["default"]]);

/* harmony default export */ __webpack_exports__["default"] = (value);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);




const unitType = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("unit-type", "[a-zA-Z%]+");
const unit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("unit", [_number_js__WEBPACK_IMPORTED_MODULE_1__["default"], unitType]);

/* harmony default export */ __webpack_exports__["default"] = (unit);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const number = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"](
  "number",
  "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?"
);

/* harmony default export */ __webpack_exports__["default"] = (number);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const hex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");

/* harmony default export */ __webpack_exports__["default"] = (hex);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var _optionalSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);






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
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const name = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

/* harmony default export */ __webpack_exports__["default"] = (name);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);



const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("optional-space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("optional-spaces", space);
const optionalSpaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OptionalValue"](spaces);

/* harmony default export */ __webpack_exports__["default"] = (optionalSpaces);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("spaces", space);

/* harmony default export */ __webpack_exports__["default"] = (spaces);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TreeNormalizer; });
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _HexColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);



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
      this.removeUnnecessaryValuesSpaces(node);
    }
    
    this.collapseWhiteSpace(node);
    this.removeSpacesAroundDividers(node);
  }

  collapseWhiteSpace(node) {
    if (node.name === "spaces") {
      node.value = " ";
    }
  }

  removeSpacesAroundDividers(node) {
    if (node.name === "divider") {
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

  removeUnnecessaryValuesSpaces(node) {
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HexColor; });
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);



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
          1,
        ]
      : [0, 0, 0, 1];
  }

  toComplexNode() {
    const children = this.rgba
      .map((number) => {
        const valuesNode = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["CompositeNode"]("repeat-composite", "values");
        valuesNode.children.push(
          new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["ValueNode"]("regex-value", "number", number.toString())
        );

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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimationUtility; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _AnimationConfigValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _ParsedValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




const validator = new _AnimationConfigValidator_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class AnimationUtility {
  constructor() {
    this.config = null;
  }

  _setConfig(config) {
    this.config = config;
    this.result = {};
    validator.setConfig(config);
  }

  normalizeConfig(config) {
    this._setConfig(config);
    this._normalizeName();
    this._normalizeProperty();
    this._normalizeFrom();
    this._normalizeControls();
    this._normalizeTo();
    this._normalizeStartAt();
    this._normalizeEndAt();
    this._normalizeEasing();

    return this.result;
  }

  _normalizeName() {
    this.result.name = this.config.name;
  }

  _normalizeProperty() {
    this.result.property = this.config.property;
  }

  _normalizeFrom() {
    if (validator.hasValidFromAsString()) {
      this.result.from = new _ParsedValue_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.config.from);
    } else {
      validator.validateFromAsString();
    }
  }

  _normalizeControls() {
    if (!Array.isArray(this.config.controls)) {
      this.config.controls = [];
    }

    if (validator.hasValidControlsAsStrings()) {
      this.result.controls = this.config.controls.map(
        (control) => new _ParsedValue_js__WEBPACK_IMPORTED_MODULE_2__["default"](control)
      );
    } else {
      validator.validateControlsAsStrings();
    }
  }

  _normalizeTo() {
    if (validator.hasValidToAsString()) {
      this.result.to = new _ParsedValue_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.config.to);
    } else {
      validator.validateToAsString();
    }
  }

  _normalizeStartAt() {
    if (validator.hasValidStartAt()) {
      this.result.startAt = this.config.startAt;
    } else {
      this.result.startAt = 0;
    }
  }

  _normalizeEndAt() {
    if (validator.hasValidEndAt()) {
      this.result.endAt = this.config.endAt;
    } else {
      this.result.endAt = 1;
    }
  }

  _normalizeEasing() {
    if (
      !validator.hasValidEasingString() &&
      !validator.hasValidEasingFunction()
    ) {
      this.result.easing = _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"].linear;
    } else if (validator.hasValidEasingString()) {
      this.result.easing = _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.config.easing] || _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"].linear;
    } else if (validator.hasValidEasingFunction()) {
      this.result.easing = this.config.easing;
    }
  }
}


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easingFunctions_easeInQuad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _easingFunctions_easeOutQuad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
/* harmony import */ var _easingFunctions_easeInOutQuad_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var _easingFunctions_easeInElastic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);
/* harmony import */ var _easingFunctions_easeInOutElastic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56);
/* harmony import */ var _easingFunctions_easeOutElastic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57);
/* harmony import */ var _easingFunctions_easeInOutBack_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58);
/* harmony import */ var _easingFunctions_easeInOutBounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(59);
/* harmony import */ var _easingFunctions_easeInBounce_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(60);
/* harmony import */ var _easingFunctions_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(61);
/* harmony import */ var _easingFunctions_easeInCubic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(62);
/* harmony import */ var _easingFunctions_easeOutCubic_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(63);
/* harmony import */ var _easingFunctions_easeInOutCubic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(64);
/* harmony import */ var _easingFunctions_easeInQuart_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(65);
/* harmony import */ var _easingFunctions_easeOutQuart_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(66);
/* harmony import */ var _easingFunctions_easeInOutQuart_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(67);
/* harmony import */ var _easingFunctions_easeInQuint_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(68);
/* harmony import */ var _easingFunctions_easeOutQuint_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(69);
/* harmony import */ var _easingFunctions_easeInOutQuint_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(70);
/* harmony import */ var _easingFunctions_easeInSine_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(71);
/* harmony import */ var _easingFunctions_easeOutSine_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(72);
/* harmony import */ var _easingFunctions_easeInOutSine_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(73);
/* harmony import */ var _easingFunctions_easeInExpo_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(74);
/* harmony import */ var _easingFunctions_easeOutExpo_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(75);
/* harmony import */ var _easingFunctions_easeInOutExpo_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(76);
/* harmony import */ var _easingFunctions_easeInCirc_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(77);
/* harmony import */ var _easingFunctions_easeOutCirc_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(78);
/* harmony import */ var _easingFunctions_easeInOutCirc_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(79);
/* harmony import */ var _easingFunctions_easeInBack_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(80);
/* harmony import */ var _easingFunctions_easeOutBack_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(81);
/* harmony import */ var _easingFunctions_easeLinear_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(82);
































const easings = {
  easeInQuad: _easingFunctions_easeInQuad_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  easeOutQuad: _easingFunctions_easeOutQuad_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  easeInOutQuad: _easingFunctions_easeInOutQuad_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  easeInCubic: _easingFunctions_easeInCubic_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  easeOutCubic: _easingFunctions_easeOutCubic_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  easeInOutCubic: _easingFunctions_easeInOutCubic_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  easeInQuart: _easingFunctions_easeInQuart_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  easeOutQuart: _easingFunctions_easeOutQuart_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  easeInOutQuart: _easingFunctions_easeInOutQuart_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  easeInQuint: _easingFunctions_easeInQuint_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  easeOutQuint: _easingFunctions_easeOutQuint_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  easeInOutQuint: _easingFunctions_easeInOutQuint_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  easeInSine: _easingFunctions_easeInSine_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  easeOutSine: _easingFunctions_easeOutSine_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  easeInOutSine: _easingFunctions_easeInOutSine_js__WEBPACK_IMPORTED_MODULE_21__["default"],
  easeInExpo: _easingFunctions_easeInExpo_js__WEBPACK_IMPORTED_MODULE_22__["default"],
  easeOutExpo: _easingFunctions_easeOutExpo_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  easeInOutExpo: _easingFunctions_easeInOutExpo_js__WEBPACK_IMPORTED_MODULE_24__["default"],
  easeInCirc: _easingFunctions_easeInCirc_js__WEBPACK_IMPORTED_MODULE_25__["default"],
  easeOutCirc: _easingFunctions_easeOutCirc_js__WEBPACK_IMPORTED_MODULE_26__["default"],
  easeInOutCirc: _easingFunctions_easeInOutCirc_js__WEBPACK_IMPORTED_MODULE_27__["default"],
  easeInElastic: _easingFunctions_easeInElastic_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  easeOutElastic: _easingFunctions_easeOutElastic_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  easeInOutElastic: _easingFunctions_easeInOutElastic_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  easeInBack: _easingFunctions_easeInBack_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  easeOutBack: _easingFunctions_easeOutBack_js__WEBPACK_IMPORTED_MODULE_29__["default"],
  easeInOutBack: _easingFunctions_easeInOutBack_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  easeInBounce: _easingFunctions_easeInBounce_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  easeOutBounce: _easingFunctions_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  easeInOutBounce: _easingFunctions_easeInOutBounce_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  linear: _easingFunctions_easeLinear_js__WEBPACK_IMPORTED_MODULE_30__["default"],
};

/* harmony default export */ __webpack_exports__["default"] = (easings);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage * percentage;
});


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -percentage * (percentage - 2);
});


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1) return (1 / 2) * percentage * percentage;
  return (-1 / 2) * (--percentage * (percentage - 2) - 1);
});


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const p = 0.3 / 1;
  const s = p / 4;
  const a = 1;

  if (percentage <= 0) return 0;
  if (percentage >= 1) return 1;

  return -(
    a *
    Math.pow(2, 10 * (percentage -= 1)) *
    Math.sin(((percentage - s) * (2 * Math.PI)) / p)
  );
});


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((t) => {
  var b = 0;
  var c = 1;
  var d = 1;
  var s = 1.70158;
  var p = 0;
  var a = c;

  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.3 / 1);
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
});


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const p = 0.3 / 1;
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
});


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const s = 1.70158 * 1.525;

  if ((percentage /= 1 / 2) < 1) {
    return (1 / 2) * (percentage * percentage * ((s + 1) * percentage - s));
  }

  return (
    (1 / 2) * ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2)
  );
});


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easeInBounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);
/* harmony import */ var _easeOutBounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);



/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if (percentage < 0.5) {
    return Object(_easeInBounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(percentage * 2) * 0.5;
  } else {
    return Object(_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(percentage * 2 - 1) * 0.5 + 0.5;
  }
});


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easeOutBounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);


/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 - Object(_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1 - percentage);
});


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
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
});


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * (percentage /= 1) * percentage * percentage;
});


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1);
});


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * percentage * percentage * percentage;
  return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
});


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * (percentage /= 1) * percentage * percentage * percentage;
});


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (
    -1 *
    ((percentage = percentage / 1 - 1) * percentage * percentage * percentage -
      1)
  );
});


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * percentage * percentage * percentage * percentage;
  return (
    (-1 / 2) * ((percentage -= 2) * percentage * percentage * percentage - 2)
  );
});


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (
    1 * (percentage /= 1) * percentage * percentage * percentage * percentage
  );
});


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (
    1 *
    ((percentage = percentage / 1 - 1) *
      percentage *
      percentage *
      percentage *
      percentage +
      1)
  );
});


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (
      (1 / 2) * percentage * percentage * percentage * percentage * percentage
    );
  return (
    (1 / 2) *
    ((percentage -= 2) * percentage * percentage * percentage * percentage + 2)
  );
});


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -Math.cos(percentage * (Math.PI / 2)) + 1;
});


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
});


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
});


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
});


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage == 1 ? 1 : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
});


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if (percentage == 0) return 0;
  if (percentage == 1) return 1;
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * Math.pow(2, 10 * (percentage - 1));
  return (1 / 2) * (-Math.pow(2, -10 * --percentage) + 2);
});


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
});


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
});


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
  return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
});


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const s = 1.70158;
  return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
});


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const s = 1.70158;
  return (
    1 *
    ((percentage = percentage / 1 - 1) *
      percentage *
      ((s + 1) * percentage + s) +
      1)
  );
});


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage;
});


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);
/* harmony import */ var _DefaultClock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _SlopeTimelineBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);
/* harmony import */ var _BlendedTimeline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91);





const defaultClock = new _DefaultClock_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

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

class Player extends _Observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    this._slopeTimelineBuilder = new _SlopeTimelineBuilder_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

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

    const blendedTimeline = new _BlendedTimeline_js__WEBPACK_IMPORTED_MODULE_3__["default"](
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


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var _TimeObserver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86);



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
/* 85 */
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
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeObserver; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);


class TimeObserver extends _Observer_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(time, callback, unbind){
        super(null, callback, unbind);
        this.time = time;
    }

    notify(event){
        if (typeof event.lastTime === "number" && typeof event.time === "number"){
            const high = Math.max(event.time, event.lastTime);
            const low = Math.min(event.time, event.lastTime);

            if (this.time >= low && this.time <= high){
                this.callback(event);
            }
        }
    }
}

/***/ }),
/* 87 */
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
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SlopeTimelineBuilder; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _GraphOperator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _Timeline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);





const FORWARD = 1;
const BACKWARD = -1;

class SlopeTimelineBuilder {
  constructor() {
    this.timeline = null;
    this.slopeTimeline = null;
    this.direction = 0;
    this.newDuration = 0;
    this.duration = 0;
    this.offset = 0;
    this.delta = 0.0001;
    this.deltaStepValues = null;
    this.scaledValues = null;
    this.deltaValues = null;
    this.nowValues = null;
    this.diffValues = null;
    this.derivativeValues = null;
    this.scaledValues = null;
    this.toValues = null;
    this.graphOperator = new _GraphOperator_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  cloneValues(values) {
    return Object.keys(values).reduce((clone, name) => {
      clone[name] = Object.keys(values[name]).reduce((clone, property) => {
        clone[property] = values[name][property].clone();
        return clone;
      }, {});
      return clone;
    }, {});
  }

  build(timeline, offset, duration, newDuration, direction) {
    this.timeline = timeline;
    this.offset = offset;
    this.duration = duration;
    this.newDuration = newDuration;
    this.direction = direction;

    this.cacheValues();
    this.calculate();
    this.createSlopeTimeline();

    return this.slopeTimeline;
  }

  cacheValues() {
    this.timeline.update(this.offset);
    this.nowValues = this.cloneValues(this.timeline.getCurrentValues());

    this.deltaStepValues = this.cloneValues(this.nowValues);
    this.scaleValues = this.cloneValues(this.nowValues);
    this.diffValues = this.cloneValues(this.nowValues);
    this.derivativeValues = this.cloneValues(this.nowValues);
    this.scaledValues = this.cloneValues(this.nowValues);
    this.toValues = this.cloneValues(this.nowValues);

    this.cacheDeltaStepValues();
    this.cacheScaleValues();

    if (this.direction === FORWARD) {
      this.cacheDeltaValueForward();
    } else if (this.direction === BACKWARD) {
      this.cacheDeltaValueBackward();
    } else {
      this.cacheDeltaValueStopped();
    }
  }

  cacheDeltaStepValues() {
    Object.keys(this.deltaStepValues).forEach((name) => {
      Object.keys(this.deltaStepValues[name]).forEach((property) => {
        this.graphOperator.assign(
          this.deltaStepValues[name][property].graph,
          this.delta
        );
      });
    });
  }

  cacheScaleValues() {
    const scale = this.newDuration / this.duration;
    Object.keys(this.scaleValues).forEach((name) => {
      Object.keys(this.scaleValues[name]).forEach((property) => {
        this.graphOperator.assign(
          this.scaleValues[name][property].graph,
          scale
        );
      });
    });
  }

  cacheDeltaValueForward() {
    this.timeline.update(this.offset + this.delta);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  cacheDeltaValueBackward() {
    this.timeline.update(this.offset - this.delta);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  cacheDeltaValueStopped() {
    this.timeline.update(this.offset);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  calculate() {
    Object.keys(this.nowValues).forEach((name) => {
      Object.keys(this.nowValues[name]).forEach((property) => {
        const now = this.nowValues[name][property].graph;
        const delta = this.deltaValues[name][property].graph;
        const diff = this.diffValues[name][property].graph;

        const deltaStep = this.deltaStepValues[name][property].graph;
        const derivative = this.derivativeValues[name][property].graph;
        const scale = this.scaleValues[name][property].graph;
        const scaled = this.scaledValues[name][property].graph;
        const to = this.toValues[name][property].graph;

        this.graphOperator.subtract([delta, now, diff]);
        this.graphOperator.divide([diff, deltaStep, derivative]);
        this.graphOperator.multiply([derivative, scale, scaled]);
        this.graphOperator.add([now, scaled, to]);

        // Lets update the ParsedValue.value.
        this.toValues[name][property].value = to.toString();
      });
    });
  }

  createSlopeTimeline() {
    const animations = Object.keys(this.nowValues)
      .map((name) => {
        return Object.keys(this.nowValues[name]).map((property) => {
          return new _Animation_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            name,
            property,
            from: this.nowValues[name][property],
            controls: [],
            to: this.toValues[name][property],
            startAt: 0,
            endAt: 1,
            easing: _easings_js__WEBPACK_IMPORTED_MODULE_0__["default"].linear,
          });
        });
      })
      .flat();

    this.slopeTimeline = new _Timeline_js__WEBPACK_IMPORTED_MODULE_3__["default"](animations);
  }
}


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphOperator; });
/* harmony import */ var _GraphOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);
/* harmony import */ var _GraphsVisitor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);




class GraphOperator {
  constructor() {
    this.graphsVisitor = new _GraphsVisitor_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.visitor = new _Visitor_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.graphOperations = new _GraphOperations_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  assign(graph, number) {
    this.visitor.setCallback((node) => {
      if (node.name === "number") {
        node.value = number;
      }
    });

    this.visitor.visitDown(graph);
  }

  add(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.add);
    this.graphsVisitor.visitDown(graphs);
  }

  subtract(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.subtract);
    this.graphsVisitor.visitDown(graphs);
  }

  multiply(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.multiply);
    this.graphsVisitor.visitDown(graphs);
  }

  divide(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.divide);
    this.graphsVisitor.visitDown(graphs);
  }
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphOperations; });
class GraphOperations {
  constructor() {
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
  }

  add(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value + rightNode.value;
    }
  }

  subtract(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value - rightNode.value;
    }
  }

  multiply(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value * rightNode.value;
    }
  }

  divide(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value / rightNode.value;
    }
  }

  isNumberNode(nodes) {
    return nodes[0].name === "number";
  }

  canOperate(nodes) {
    return nodes.length === 3;
  }
}


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlendedTimeline; });
/* harmony import */ var _Timeline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




class BlendedTimeline extends _Timeline_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(fromTimeline, toTimeline, easing) {
    const fromAnimations = fromTimeline.getCurrentValues();
    const toAnimations = toTimeline.getCurrentValues();

    const animations = Object.keys(fromAnimations)
      .map((name) => {
        const fromAnimation = fromAnimations[name];
        const toAnimation = toAnimations[name];

        return Object.keys(fromAnimation).map((property) => {
          const from = fromAnimation[property];
          const to = toAnimation[property];

          return new _Animation_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
            name,
            property,
            startAt: 0,
            endAt: 1,
            from,
            to,
            controls: [to],
            easing: easing || _easings_js__WEBPACK_IMPORTED_MODULE_2__["default"].linear,
          });
        });
      })
      .flat();

    super(animations);

    this.fromTimeline = fromTimeline;
    this.toTimeline = toTimeline;
  }

  update(time) {
    this.fromTimeline.update(time);
    this.toTimeline.update(time);

    super.update(time);

  }
}


/***/ })
/******/ ]);
});