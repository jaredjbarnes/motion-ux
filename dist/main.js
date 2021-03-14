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
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _Animation_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Keyframe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyframe", function() { return _Keyframe_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easings", function() { return _easings_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _BezierCurve_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BezierCurve", function() { return _BezierCurve_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Keyframe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



const sortAsc = (animatorA, animatorB) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

class Animation {
  constructor(keyframes) {
    this.animators = new Map();
    this._time = 0;

    this.initialize(keyframes);
  }

  initialize(keyframes) {
    this._currentValues = {};

    this.animators = keyframes
      .map((keyframe) => {
        if (keyframe instanceof _Keyframe_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          return keyframe;
        } else {
          return _Keyframe_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromSimpleConfig(keyframe);
        }
      })
      .map((keyframe) => new _Animator_js__WEBPACK_IMPORTED_MODULE_0__["default"](keyframe));

    this._createCurrentValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  _createCurrentValues() {
    this._currentValues = this.animators.reduce((results, animator) => {
      const name = animator.keyframe.name;
      const property = animator.keyframe.property;

      let keyframe = results[name];

      if (keyframe == null) {
        keyframe = results[name] = {};
      }

      if (keyframe[property] == null) {
        keyframe[property] = animator.keyframe.result.clone();
      }

      return results;
    }, {});
  }

  _assignValue(keyframe) {
    const currentValue = this._currentValues[keyframe.name][
      keyframe.property
    ];

    currentValue.value = keyframe.result.value;
    currentValue.graph = keyframe.result.graph;
    currentValue.graphHash = keyframe.result.graphHash;
  }

  _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    // Assign all values at least once.
    // This initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;
      const key = `${keyframe.name}|${keyframe.property}`;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this._assignValue(keyframe);
      }
    }

    // Assign if the value of the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;

      if (keyframe.startAt <= this._time) {
        this._assignValue(keyframe);
      }
    }
  }

  update(time) {
    this._time = time;
    // Update all keyframes
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
    const oldKeyframes = this.animators.map((a) => a.keyframe);
    const newKeyframes = timeline.animators.map((a) => a.keyframe);

    this.initialize([...oldKeyframes, ...newKeyframes]);

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
  constructor(keyframe) {
    this.keyframe = keyframe;
    this.visit = this.visit.bind(this);
    this.time = 0;
    this.bezierCurve = new _BezierCurve_js__WEBPACK_IMPORTED_MODULE_0__["default"]([]);
    this.keyframeGraphs = [];
    this.updateKeyframeGraphs();
  }

  updateKeyframeGraphs() {
    this.keyframeGraphs.length = 0;
    this.keyframeGraphs.push(this.keyframe.from.graph);

    for (let x = 0; x < this.keyframe.controls.length; x++) {
      this.keyframeGraphs.push(this.keyframe.controls[x].graph);
    }

    this.keyframeGraphs.push(this.keyframe.to.graph);
    this.keyframeGraphs.push(this.keyframe.result.graph);
  }

  visit(nodes) {
    const cloneNodes = nodes.slice();
    const resultNode = cloneNodes.pop();
    const time = this.time;

    if (cloneNodes[0].name === "number") {
      const elapsedTime = time - this.keyframe.startAt;
      const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
      const timeWithEasing = this.keyframe.easing(
        elapsedTime / animationDuration
      );

      const points = cloneNodes.map((node) => node.value);

      this.bezierCurve.setPoints(points);
      resultNode.value = this.bezierCurve.valueAt(timeWithEasing);
    } else {
      if (!Array.isArray(resultNode.children)) {
        if (time >= this.keyframe.startAt) {
          resultNode.value = cloneNodes[cloneNodes.length - 1].value;
        } else {
          resultNode.value = cloneNodes[0].value;
        }
      }
    }
  }

  update(time) {
    this.updateKeyframeGraphs();
    this.time = time;

    visitor.setCallback(this.visit);
    visitor.visitDown(this.keyframeGraphs, true);

    const value = this.keyframe.result.graph.toString();
    this.keyframe.result.value = value;

    return this.keyframe.result;
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Keyframe; });
/* harmony import */ var _KeyframeConfigValidator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _KeyframeUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);



const validator = new _KeyframeConfigValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const utility = new _KeyframeUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class Keyframe {
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
    return new Keyframe(utility.normalizeConfig(config));
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyframeConfigValidator; });
/* harmony import */ var _ParsedValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class KeyframeConfigValidator {
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
        `Invalid Keyframe: The value types that are being animated do not match. From: ${JSON.stringify(
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
/* harmony import */ var _TreeNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
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
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);




const cssValue = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("css-value", _values_js__WEBPACK_IMPORTED_MODULE_2__["default"], _divider_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (cssValue);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
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
/* harmony import */ var _ast_Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _ast_Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositeNode", function() { return _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueNode", function() { return _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Cursor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cursor", function() { return _Cursor_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _patterns_value_RegexValue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegexValue", function() { return _patterns_value_RegexValue_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _patterns_value_AndValue_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AndValue", function() { return _patterns_value_AndValue_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _patterns_value_AnyOfThese_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnyOfThese", function() { return _patterns_value_AnyOfThese_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _patterns_value_Literal_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Literal", function() { return _patterns_value_Literal_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _patterns_value_NotValue_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotValue", function() { return _patterns_value_NotValue_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _patterns_value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionalValue", function() { return _patterns_value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _patterns_value_OrValue_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(17);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrValue", function() { return _patterns_value_OrValue_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _patterns_value_RepeatValue_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RepeatValue", function() { return _patterns_value_RepeatValue_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _patterns_value_ValuePattern_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValuePattern", function() { return _patterns_value_ValuePattern_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _patterns_composite_AndComposite_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AndComposite", function() { return _patterns_composite_AndComposite_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _patterns_composite_CompositePattern_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositePattern", function() { return _patterns_composite_CompositePattern_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _patterns_composite_OptionalComposite_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionalComposite", function() { return _patterns_composite_OptionalComposite_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _patterns_composite_OrComposite_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrComposite", function() { return _patterns_composite_OrComposite_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _patterns_composite_RepeatComposite_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(23);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RepeatComposite", function() { return _patterns_composite_RepeatComposite_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _patterns_Pattern_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return _patterns_Pattern_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _patterns_RecursivePattern_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecursivePattern", function() { return _patterns_RecursivePattern_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _ParseInspector_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(25);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseInspector", function() { return _ParseInspector_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _TextInspector_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(26);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextInspector", function() { return _TextInspector_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });




























/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
class Node {
  constructor(type, name, startIndex, endIndex) {
    this.type = type;
    this.name = name;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (
      typeof this.startIndex !== "number" ||
      typeof this.endIndex !== "number"
    ) {
      throw new Error(
        "Invalid Arguments: startIndex and endIndex need to be number."
      );
    }
  }

  filter(){
    throw new Error("Not Implemented Exception: expected subclass to override this method.");
  }

  clone() {
    throw new Error(
      "Not Implemented Exception: expected subclass to override this method."
    );
  }

  toString() {
    throw new Error(
      "Not Implemented Exception: expected subclass to override this method."
    );
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompositeNode; });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class CompositeNode extends _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type, name, startIndex = 0, endIndex = 0) {
    super(type, name, startIndex, endIndex);
    this.children = [];
  }

  clone() {
    const node = new CompositeNode(
      this.type,
      this.name,
      this.startIndex,
      this.endIndex
    );
    node.children = this.children.map(child => {
      return child.clone();
    });

    return node;
  }

  filter(shouldKeep, context = []) {
    const childrenContext = context.slice();
    childrenContext.push(this);

    Object.freeze(childrenContext);

    const matches = this.children.reduce((acc, child) => {
      return acc.concat(child.filter(shouldKeep, childrenContext));
    }, []);

    const match = shouldKeep(this, context);

    if (match) {
      matches.push(this);
    }

    return matches;
  }

  toString() {
    return this.children.map(child => child.toString()).join("");
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValueNode; });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class ValueNode extends _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type, name, value, startIndex = 0, endIndex = 0) {
    super(type, name, startIndex, endIndex);
    this.value = value;
  }

  clone() {
    return new ValueNode(this.type, this.name, this.value, this.startIndex, this.endIndex);
  }

  filter(shouldKeep, context){
    const match = shouldKeep(this, context);

    if (match){
      return [this];
    }

    return [];
  }

  toString(){
    return this.value;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cursor; });
/* harmony import */ var _CursorHistory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class Cursor {
  constructor(string) {
    this.string = string;
    this.assertValidity();


    this.index = 0;
    this.length = string.length;
    this.history = new _CursorHistory_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.isInErrorState = false;
  }

  assertValidity() {
    if (this.isNullOrEmpty(this.string)) {
      throw new Error(
        "Illegal Argument: Cursor needs to have a string that has a length greater than 0."
      );
    }
  }

  startRecording(){
    this.history.startRecording();
  }

  stopRecording(){
    this.history.stopRecording();
  }

  get parseError (){
    return this.history.getFurthestError();
  }

  get lastMatch(){
    return this.history.getFurthestMatch();
  }

  throwError(parseError) {
    this.isInErrorState = true;
    this.history.addError(parseError);
  }

  addMatch(pattern, astNode){
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
    return this.index + 1 < this.string.length;
  }

  hasPrevious() {
    return this.index - 1 >= 0;
  }

  next() {
    if (this.hasNext()) {
      this.index++;
    } else {
      throw new Error("Cursor: Out of Bounds Exception.");
    }
  }

  previous() {
    if (this.hasPrevious()) {
      this.index--;
    } else {
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
    this.index = this.string.length - 1;
  }

  getChar() {
    return this.string.charAt(this.index);
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
    return this.index === this.string.length - 1;
  }

  lastIndex() {
    return this.length - 1;
  }

  didSuccessfullyParse(){
    return !this.hasUnresolvedError() && this.isAtEnd();
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CursorHistory; });
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

    if (
      this.furthestMatch.astNode == null ||
      astNode.endIndex >= this.furthestMatch.astNode.endIndex
    ) {
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
    } else {
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
        } else {
          const left = Math.max(
            currentNode.startIndex,
            previousNode.startIndex
          );
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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegexValue; });
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




class RegexValue extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(name, regex) {
    super("regex-value", name);
    this.regexString = regex;
    this.regex = new RegExp(`^${regex}`, "g");
    this._assertArguments();
  }

  _assertArguments() {
    if (typeof this.regexString !== "string") {
      throw new Error(
        "Invalid Arguments: The regex argument needs to be a string of regex."
      );
    }

    if (this.regexString.length < 1) {
      throw new Error(
        "Invalid Arguments: The regex string argument needs to be at least one character long."
      );
    }

    if (this.regexString.charAt(0) === "^") {
      throw new Error(
        "Invalid Arguments: The regex string cannot start with a '^' because it is expected to be in the middle of a string."
      );
    }

    if (this.regexString.charAt(this.regexString.length - 1) === "$") {
      throw new Error(
        "Invalid Arguments: The regex string cannot end with a '$' because it is expected to be in the middle of a string."
      );
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
    this.substring = this.cursor.string.substr(this.cursor.getIndex());
    this.node = null;
  }

  _tryPattern() {
    const result = this.regex.exec(this.substring);

    if (result != null && result.index === 0) {
      const currentIndex = this.cursor.getIndex();
      const newIndex = currentIndex + result[0].length - 1;

      this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "regex-value",
        this.name,
        result[0],
        currentIndex,
        newIndex
      );

      this.cursor.index = newIndex;
      this.cursor.addMatch(this, this.node);
    } else {
      this._processError();
    }
  }

  _processError() {
    const message = `ParseError: Expected regex pattern of '${this.regexString}' but found '${this.substring}'.`;
    const parseError = new _ParseError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, this.cursor.getIndex(), this);

    this.cursor.throwError(parseError);
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new RegexValue(name, this.regexString);
  }

  getPossibilities() {
    return [this.getTokenValue()];
  }

  getTokenValue() {
    return this.name;
  }

  getTokens() {
    return [this.name];
  }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParseError; });
class ParseError {
    constructor(message, index, pattern){
        this.message = message;
        this.name = 'ParseError';
        this.index = index;
        this.pattern = pattern;
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValuePattern; });
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class ValuePattern extends _Pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type, name, children = []) {
    super(type, name, children);
  }

  _assertChildren() {
    if (!Array.isArray(this._children)) {
      throw new Error(
        "Invalid Arguments: The patterns argument need to be an array of ValuePattern."
      );
    }

    const areAllPatterns = this._children.every(
      pattern => pattern instanceof ValuePattern || pattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    );

    if (!areAllPatterns) {
      throw new Error(
        "Invalid Argument: All patterns need to be an instance of ValuePattern."
      );
    }

    if (typeof this.name !== "string") {
      throw new Error(
        "Invalid Argument: ValuePatterns needs to have a name that's a string."
      );
    }

    if (typeof this.type !== "string") {
      throw new Error(
        "Invalid Argument: ValuePatterns needs to have a type that's a string."
      );
    }
  }

  clone() {
    throw new Error("Not Yet Implemented");
  }

}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pattern; });
/* harmony import */ var _Cursor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class Pattern {
  constructor(type = null, name, children = []) {
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
      throw new Error(
        "Invalid Argument: Patterns needs to have a name that's a string."
      );
    }
  }

  parse() {
    throw new Error("Method Not Implemented");
  }

  exec(string) {
    const cursor = new _Cursor_js__WEBPACK_IMPORTED_MODULE_0__["default"](string);
    const node = this.parse(cursor);

    if (cursor.didSuccessfullyParse()) {
      return node;
    } else {
      return null;
    }
  }

  test(string) {
    return this.exec(string) != null;
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
    // Empty, meant to be overridden by subclasses.
  }

  _cloneChildren() {
    // We need to clone the patterns so nested patterns can be parsed.
    this._children = this._children.map((pattern) => {
      if (!(pattern instanceof Pattern)) {
        throw new Error(
          `The ${this.name} pattern has an invalid child pattern.`
        );
      }
      return pattern.clone();
    });

    // We need to freeze the childen so they aren't modified.
    Object.freeze(this._children);
  }

  _assignAsParent() {
    this._children.forEach((child) => (child.parent = this));
  }

  clone() {
    throw new Error("Method Not Implemented");
  }

  getPossibilities() {
    throw new Error("Method Not Implemented");
  }

  getTokens() {
    throw new Error("Method Not Implemented");
  }

  getNextTokens() {
    if (this._parent != null) {
      const siblings = this._parent.children;
      const index = siblings.findIndex((c) => c === this);
      const nextSibling = siblings[index + 1];

      // I don't like this, so I think we need to rethink this.
      if (this._parent.type.indexOf("repeat") === 0) {
        const tokens = this._parent.getNextTokens();
        if (index === 0 && siblings.length > 1) {
          return nextSibling.getTokens().concat(tokens);
        } else if (index === 1) {
          return siblings[0].getTokens().concat(tokens);
        } else {
          return this.getTokens().concat(tokens);
        }
      }

      // Another thing I don't like.
      if (
        this._parent.type.indexOf("and") === 0 &&
        nextSibling != null &&
        nextSibling.type.indexOf("optional") === 0
      ) {
        let tokens = [];

        for (let x = index + 1; x < siblings.length; x++) {
          const child = siblings[x];

          if (child.type.indexOf("optional") === 0) {
            tokens = tokens.concat(child.getTokens());
          } else {
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

  getTokenValue() {
    return null;
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AndValue; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _Permutor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);







const permutor = new _Permutor_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

class AndValue extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, patterns) {
    super("and-value", name, patterns);
    this._assertArguments();
  }

  _assertArguments() {
    if (this._children.length < 2) {
      throw new Error(
        "Invalid Argument: AndValue needs to have more than one value pattern."
      );
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

  _next() {
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

  _hasMorePatterns() {
    return this.index + 1 < this._children.length;
  }

  _assertRestOfPatternsAreOptional() {
    const areTheRestOptional = this.children.every((pattern, index) => {
      return index <= this.index || pattern instanceof _OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    });

    if (!areTheRestOptional) {
      const parseError = new _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
        `Could not match ${this.name} before string ran out.`,
        this.index,
        this
      );

      this.cursor.throwError(parseError);
    }
  }

  _processValue() {
    if (this.cursor.hasUnresolvedError()) {
      this.node = null;
    } else {
      this.nodes = this.nodes.filter((node) => node != null);

      const lastNode = this.nodes[this.nodes.length - 1];
      const startIndex = this.mark;
      const endIndex = lastNode.endIndex;
      const value = this.nodes.map((node) => node.value).join("");

      this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "and-value",
        this.name,
        value,
        startIndex,
        endIndex
      );

      this.cursor.index = this.node.endIndex;
      this.cursor.addMatch(this, this.node);
    }
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new AndValue(name, this._children);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
      rootPattern = this;
    }

    const possibilities = this.children.map((child) =>
      child.getPossibilities(rootPattern)
    );
    return permutor.permute(possibilities);
  }

  getTokens() {
    let tokens = [];

    for (let x = 0; x < this._children.length; x++) {
      const child = this._children[x];

      if (child instanceof _OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
        tokens = tokens.concat(child.getTokens());
      } else {
        tokens = tokens.concat(child.getTokens());
        break;
      }
    }

    return tokens;
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OptionalValue; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



class OptionalValue extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(pattern) {
    super("optional-value", "optional-value", [pattern]);
    this._assertArguments();
  }

  _assertArguments() {
    if (!(this.children[0] instanceof _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error("Invalid Arguments: Expected a ValuePattern.");
    }
  }

  parse(cursor) {
    const mark = cursor.mark();

    const node = this.children[0].parse(cursor);

    if (cursor.hasUnresolvedError()) {
      cursor.resolveError();
      cursor.moveToMark(mark);
      return null;
    } else {
      cursor.addMatch(this, node);
      return node;
    }
  }

  clone() {
    return new OptionalValue(this.children[0]);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
      rootPattern = this;
    }

    // This is to prevent possibilities explosion.
    if (this.parent === rootPattern) {
      const possibilities = this.children[0].getPossibilities(rootPattern);
      possibilities.unshift("");

      return possibilities;
    } else {
      return this.children[0].getPossibilities(rootPattern);
    }
  }

  getTokens() {
    return this._children[0].getTokens();
  }
  
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Permutor; });
class Permutor {
  constructor() {
    this.array = [];
    this.positionToOptions = null;
  }

  permute(array) {
    this.array = array;
    this.createPositionMap();
    return this.getPermutations();
  }

  getPermutations() {
    return this.array[0].reduce((acc, value, index) => {
      return acc.concat(this.getOptions(0, index));
    }, []);
  }

  getKey(x, y) {
    return `${x}|${y}`;
  }

  createPositionMap() {
    this.positionToOptions = {};

    for (let x = this.array.length - 1; x >= 0; x--) {
      for (let y = 0; y < this.array[x].length; y++) {
        const yValue = this.array[x][y];
        const nextX = x + 1;

        if (this.array[nextX] != null) {
          const options = this.array[nextX];

          const value = options
            .map((option, index) => {
              let permutations = this.getOptions(nextX, index);

              return permutations.map(option => {
                return `${yValue}${option}`;
              });
            })
            .reduce((acc, value) => {
              return acc.concat(value);
            }, []);

          this.setOptions(x, y, value);
        } else {
          this.setOptions(x, y, [yValue]);
        }
      }
    }
  }

  getOptions(x, y) {
    return this.positionToOptions[this.getKey(x, y)];
  }

  setOptions(x, y, value) {
    this.positionToOptions[this.getKey(x, y)] = value;
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnyOfThese; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





class AnyOfThese extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, characters) {
    super("any-of-these", name);
    this.characters = characters;
    this._assertArguments();
  }

  _assertArguments() {
    if (typeof this.characters !== "string") {
      throw new Error(
        "Invalid Arguments: The characters argument needs to be a string of characters."
      );
    }

    if (this.characters.length < 1) {
      throw new Error(
        "Invalid Arguments: The characters argument needs to be at least one character long."
      );
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
    this.node = null;
  }

  _tryPattern() {
    if (this._isMatch()) {
      const value = this.cursor.getChar();
      const index = this.cursor.getIndex();

      this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_2__["default"]("any-of-these", this.name, value, index, index);

      this.cursor.addMatch(this, this.node);
    } else {
      this._processError();
    }
  }

  _isMatch() {
    return this.characters.indexOf(this.cursor.getChar()) > -1;
  }

  _processError() {
    const message = `ParseError: Expected one of these characters, '${
      this.characters
    }' but found '${this.cursor.getChar()}' while parsing for '${this.name}'.`;

    const parseError = new _ParseError_js__WEBPACK_IMPORTED_MODULE_1__["default"](message, this.cursor.getIndex(), this);
    this.cursor.throwError(parseError);
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new AnyOfThese(name, this.characters);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      rootPattern = this;
    }

    return this.getTokens();
  }

  getTokens() {
    return this.characters.split("");
  }

}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Literal; });
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




class Literal extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(name, literal) {
    super("literal", name);
    this.literal = literal;
    this._assertArguments();
  }

  _assertArguments() {
    if (typeof this.literal !== "string") {
      throw new Error(
        "Invalid Arguments: The literal argument needs to be a string of characters."
      );
    }

    if (this.literal.length < 1) {
      throw new Error(
        "Invalid Arguments: The literalString argument needs to be at least one character long."
      );
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
    this.substring = this.cursor.string.substring(
      this.mark,
      this.mark + this.literal.length
    );
    this.node = null;
  }

  _tryPattern() {
    if (this.substring === this.literal) {
      this._processMatch();
    } else {
      this._processError();
    }
  }

  _processError() {
    const message = `ParseError: Expected '${this.literal}' but found '${this.substring}'.`;

    const parseError = new _ParseError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, this.cursor.getIndex(), this);
    this.cursor.throwError(parseError);
  }

  _processMatch() {
    this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
      "literal",
      this.name,
      this.substring,
      this.mark,
      this.mark + this.literal.length - 1
    );

    this.cursor.index = this.node.endIndex;
    this.cursor.addMatch(this, this.node);
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new Literal(name, this.literal);
  }

  getPossibilities() {
    return [this.getTokenValue()];
  }

  getTokenValue() {
    return this.literal;
  }

  getTokens() {
    return [this.getTokenValue()];
  }
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotValue; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





class NotValue extends _Pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(name, pattern) {
    super("not-value", name, [pattern]);
  }

  _assertChildren() {
    if (!(this.children[0] instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      throw new Error(
        "Invalid Arguments: Expected the pattern to be a ValuePattern."
      );
    }

    if (typeof this.name !== "string") {
      throw new Error("Invalid Arguments: Expected name to be a string.");
    }
  }

  _reset(cursor) {
    this.match = "";
    this.node = null;
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
      const mark = this.cursor.mark();
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

  _processMatch() {
    if (this.match.length === 0) {
      const parseError = new _ParseError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
        `Didn't find any characters that didn't match the ${this.children[0].name} pattern.`,
        this.mark,
        this
      );
      this.cursor.throwError(parseError);
    } else {
      this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "not-value",
        this.name,
        this.match,
        this.mark,
        this.mark
      );

      this.cursor.index = this.node.endIndex;
      this.cursor.addMatch(this, this.node);
    }
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new NotValue(name, this.children[0]);
  }

  getPossibilities() {
    return [];
  }

  getTokens() {
    return [];
  }
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrValue; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _OptionalValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





class OrValue extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, patterns) {
    super("or-value", name, patterns);
    this._assertArguments();
  }

  _assertArguments() {
    if (this._children.length < 2) {
      throw new Error(
        "Invalid Argument: OrValue needs to have more than one value pattern."
      );
    }

    const hasOptionalChildren = this._children.some(
      (pattern) => pattern instanceof _OptionalValue_js__WEBPACK_IMPORTED_MODULE_2__["default"]
    );

    if (hasOptionalChildren) {
      throw new Error("OrValues cannot have optional values.");
    }
  }

  _reset(cursor) {
    this.index = 0;
    this.errors = [];
    this.node = null;
    this.cursor = cursor;
    this.mark = cursor.mark();
  }

  parse(cursor) {
    this._reset(cursor);
    this._tryPattern();

    return this.node;
  }

  _tryPattern() {
    while (true) {
      const pattern = this._children[this.index];
      const node = pattern.parse(this.cursor, this.parseError);

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
        this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
          "or-value",
          this.name,
          node.value,
          node.startIndex,
          node.endIndex
        );

        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);

        break;
      }
    }
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new OrValue(name, this._children);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      rootPattern = this;
    }

    return this.children
      .map((child) => {
        return child.getPossibilities(rootPattern);
      })
      .reduce((acc, value) => {
        return acc.concat(value);
      }, []);
  }

  getTokens() {
    const tokens = this._children.map((c) => c.getTokens());

    const hasPrimitiveTokens = tokens.every((t) =>
      t.every((value) => typeof value === "string")
    );

    if (hasPrimitiveTokens && tokens.length > 0) {
      return tokens.reduce((acc, t) => acc.concat(t), []);
    }

    return this._children[0].getTokens();
  }

}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RepeatValue; });
/* harmony import */ var _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);






class RepeatValue extends _ValuePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, pattern, divider) {
    super(
      "repeat-value",
      name,
      divider != null ? [pattern, divider] : [pattern]
    );

    this._pattern = this.children[0];
    this._divider = this.children[1];

    this._assertArguments();
  }

  _assertArguments() {
    if (this._pattern instanceof _OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      throw new Error(
        "Invalid Arguments: The pattern cannot be a optional pattern."
      );
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
      } else {
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
          } else {
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
      const parseError = new _ParseError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
        `Did not find a repeating match of ${this.name}.`,
        this.mark,
        this
      );
      this.cursor.throwError(parseError);
      this.node = null;
    } else {
      const value = this.nodes.map((node) => node.value).join("");

      this.node = new _ast_ValueNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "repeat-value",
        this.name,
        value,
        this.nodes[0].startIndex,
        this.nodes[this.nodes.length - 1].endIndex
      );

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

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_4__["default"])) {
      rootPattern = this;
    }

    if (this._divider != null) {
      const dividerPossibilities = this._divider.getPossibilities(rootPattern);

      return this._pattern
        .getPossibilities(rootPattern)
        .map((possibility) => {
          return dividerPossibilities.map((divider) => {
            return `${possibility}${divider}`;
          });
        })
        .reduce((acc, value) => {
          return acc.concat(value);
        }, []);
    } else {
      return this._pattern.getPossibilities(rootPattern);
    }
  }

  getTokens() {
    return this._pattern.getTokens();
  }

}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AndComposite; });
/* harmony import */ var _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _Permutor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);








const permutor = new _Permutor_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

class AndComposite extends _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, patterns = []) {
    super("and-composite", name, patterns);
    this._assertArguments();
  }

  _assertArguments() {
    if (this._children.length < 2) {
      throw new Error(
        "Invalid Argument: AndValue needs to have more than one value pattern."
      );
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
      } else {
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

  _hasMorePatterns() {
    return this.index + 1 < this._children.length;
  }

  _assertRestOfPatternsAreOptional() {
    const areTheRestOptional = this.children.every((pattern, index) => {
      return (
        index <= this.index ||
        pattern instanceof _value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__["default"] ||
        pattern instanceof _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_4__["default"]
      );
    });

    if (!areTheRestOptional) {
      const parseError = new _patterns_ParseError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
        `Could not match ${this.name} before string ran out.`,
        this.index,
        this
      );
      this.cursor.throwError(parseError);
    }
  }

  _processValue() {
    if (!this.cursor.hasUnresolvedError()) {
      this.nodes = this.nodes.filter((node) => node != null);

      const lastNode = this.nodes[this.nodes.length - 1];
      const startIndex = this.mark;
      const endIndex = lastNode.endIndex;

      this.node = new _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "and-composite",
        this.name,
        startIndex,
        endIndex
      );

      this.node.children = this.nodes;

      this.cursor.index = this.node.endIndex;
      this.cursor.addMatch(this, this.node);
    } else {
      this.node = null;
    }
  }

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new AndComposite(name, this._children);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_6__["default"])) {
      rootPattern = this;
    }

    const possibilities = this.children.map((child) =>
      child.getPossibilities(rootPattern)
    );
    return permutor.permute(possibilities);
  }

  getTokens() {
    let tokens = [];

    for (let x = 0; x < this._children.length; x++) {
      const child = this._children[x];

      if (
        child instanceof _value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_3__["default"] ||
        child instanceof _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_4__["default"]
      ) {
        tokens = tokens.concat(child.getTokens());
      } else {
        tokens = tokens.concat(child.getTokens());
        break;
      }
    }

    return tokens;
  }
}


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompositePattern; });
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class CompositePattern extends _Pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type, name, children = []) {
    super(type, name, children);
  }

  clone() {
    throw new Error("Not Yet Implemented");
  }
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OptionalComposite; });
/* harmony import */ var _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



class OptionalComposite extends _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    } else {
      cursor.addMatch(this, node);
      return node;
    }
  }

  clone() {
    return new OptionalComposite(this.children[0]);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
      rootPattern = this;
    }

    // This is to prevent possibilities explosion.
    if (this.parent === rootPattern){
      const possibilities = this.children[0].getPossibilities(rootPattern);
      possibilities.unshift("");

      return possibilities;
    } else {
      return this.children[0].getPossibilities(rootPattern);
    }
  }

  getTokens() {
    return this._children[0].getTokens();
  }
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrComposite; });
/* harmony import */ var _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





class OrComposite extends _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, patterns) {
    super("or-composite", name, patterns);
    this._assertArguments();
  }

  _assertArguments() {
    if (this._children.length < 2) {
      throw new Error(
        "Invalid Argument: OrValue needs to have more than one value pattern."
      );
    }

    const hasOptionalChildren = this._children.some(
      (pattern) =>
        pattern instanceof _value_OptionalValue_js__WEBPACK_IMPORTED_MODULE_1__["default"] || pattern instanceof _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_2__["default"]
    );

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

  clone(name) {
    if (typeof name !== "string") {
      name = this.name;
    }
    return new OrComposite(name, this._children);
  }

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      rootPattern = this;
    }

    return this.children
      .map((child) => {
        return child.getPossibilities(rootPattern);
      })
      .reduce((acc, value) => {
        return acc.concat(value);
      }, []);
  }

  getTokens() {
    const tokens = this._children.map((c) => c.getTokens());

    const hasPrimitiveTokens = tokens.every((t) =>
      t.every((value) => typeof value === "string")
    );

    if (hasPrimitiveTokens && tokens.length > 0) {
      return tokens.reduce((acc, t) => acc.concat(t), []);
    }

    return this._children[0].getTokens();
  }
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RepeatComposite; });
/* harmony import */ var _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);






class RepeatComposite extends _CompositePattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name, pattern, divider) {
    super(
      "repeat-composite",
      name,
      divider != null ? [pattern, divider] : [pattern]
    );
    this._pattern = this.children[0];
    this._divider = this.children[1];
    this._assertArguments();
  }

  _assertArguments() {
    if (this._pattern instanceof _OptionalComposite_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      throw new Error(
        "Invalid Arguments: The pattern cannot be a optional pattern."
      );
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
      } else {
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
          } else {
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
      this.cursor.throwError(
        new _ParseError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
          `Did not find a repeating match of ${this.name}.`,
          this.mark,
          this
        )
      );
      this.node = null;
    } else {
      this.node = new _ast_CompositeNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        "repeat-composite",
        this.name,
        this.nodes[0].startIndex,
        this.nodes[this.nodes.length - 1].endIndex
      );

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

  getPossibilities(rootPattern) {
    if (rootPattern == null || !(rootPattern instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_4__["default"])) {
      rootPattern = this;
    }

    if (this._divider != null) {
      const dividerPossibilities = this._divider.getPossibilities(rootPattern);

      return this._pattern
        .getPossibilities(rootPattern)
        .map(possibility => {
          return dividerPossibilities.map(divider => {
            return `${possibility}${divider}`;
          });
        })
        .reduce((acc, value) => {
          return acc.concat(value);
        }, []);
    } else {
      return this._pattern.getPossibilities(rootPattern);
    }
  }

  getTokens() {
    return this._pattern.getTokens();
  }
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecursivePattern; });
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _ParseError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class RecursivePattern extends _Pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name) {
    super("recursive", name);
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
    } else {
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
        cursor.throwError(
          new _ParseError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
            `Couldn't find parent pattern to recursively parse, with the name ${this.name}.`
          ),
          cursor.index,
          this
        );
        return null;
      }

      this.pattern = pattern.clone();
      this.pattern.parent = this;
    }

    const node = this.pattern.parse(cursor);

    if (!cursor.hasUnresolvedError()) {
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

  getPossibilities() {
    if (!this.isRecursing) {
      this.isRecursing = true;
      const possibilities = this.getPattern().getPossibilities();
      this.isRecursing = false;

      return possibilities;
    } else {
      return [`[${this.name}]`];
    }
  }

  getTokenValue() {
    return this.getPattern().getTokenValue();
  }

  getTokens() {
    if (!this.isRecursing) {
      this.isRecursing = true;
      const tokens = this.getPattern().getTokens();
      this.isRecursing = false;

      return tokens;
    }
  }
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParseInspector; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


class ParseInspector {
  constructor() {
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

  inspectParse(text, pattern) {
    this.reset();

    this.text = text;
    this.rootPattern = pattern;

    // If no text all options are available.
    if (text.length === 0) {
      return {
        pattern: null,
        astNode: null,
        match: null,
        error: null,
        possibilities: {
          startIndex: 0,
          options: pattern.getPossibilities(),
        },
        isComplete: false,
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
      isComplete: this.cursor.didSuccessfullyParse(),
    };
  }

  reset() {
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

  parse() {
    this.rootPattern = this.rootPattern;
    this.cursor = new _index_js__WEBPACK_IMPORTED_MODULE_0__["Cursor"](this.text);
    this.result = this.rootPattern.parse(this.cursor);
    this.patternMatch = this.cursor.lastMatch;
  }

  saveMatchedText() {
    if (this.patternMatch.astNode != null) {
      this.matchedText = this.text.substring(
        0,
        this.patternMatch.astNode.endIndex + 1
      );
    }
  }

  saveMatch() {
    const node = this.patternMatch.astNode;

    if (node == null) {
      this.match = null;
      return;
    }

    let endIndex = this.matchedText.length - 1;

    this.match = {
      text: this.matchedText,
      startIndex: 0,
      endIndex: endIndex,
    };
  }

  saveError() {
    if (this.patternMatch.astNode == null) {
      this.error = {
        startIndex: 0,
        endIndex: this.text.length - 1,
        text: this.text,
      };
      return this;
    }

    if (this.text.length > this.matchedText.length) {
      const difference = this.text.length - this.matchedText.length;
      const startIndex = this.patternMatch.astNode.endIndex + 1;
      const endIndex = startIndex + difference - 1;

      this.error = {
        startIndex: startIndex,
        endIndex: endIndex,
        text: this.text.substring(startIndex, endIndex + 1),
      };

      return;
    } else {
      this.error = null;
      return;
    }
  }

  savePossibilities() {
    if (
      this.patternMatch.pattern === this.rootPattern &&
      this.cursor.didSuccessfullyParse()
    ) {
      this.possibilities = null;
      return;
    }

    if (this.patternMatch.astNode == null) {
      let options = this.rootPattern.getPossibilities();
      const parts = this.text.split(" ").filter((part) => {
        return part.length > 0;
      });

      options = options.filter((option) => {
        return parts.some((part) => {
          return option.indexOf(part) > -1;
        });
      });

      if (options.length === 0) {
        this.possibilities = null;
        return;
      }

      this.possibilities = {
        startIndex: 0,
        options,
      };

      return;
    }

    const pattern = this.patternMatch.pattern;
    const parentPattern = pattern.parent;
    const index = parentPattern.children.indexOf(pattern);
    const parentClone = parentPattern.clone();

    parentClone.children = parentClone.children.slice(index + 1);

    const options = parentClone.getPossibilities();
    let startIndex = this.matchedText.length;

    if (this.matchedText.length < this.text.length) {
      const leftOver = this.text.substring(this.matchedText.length);
      const partialMatchOptions = options
        .filter((option) => {
          return option.indexOf(leftOver) === 0;
        })
        .map((option) => {
          return option.substring(leftOver.length);
        });

      if (partialMatchOptions.length === 0) {
        this.possibilities = null;
        return;
      } else {
        this.match = {
          ...this.match,
          text: this.match.text + leftOver,
          endIndex: this.match.endIndex + leftOver.length,
        };

        this.error = null;

        this.possibilities = {
          startIndex: this.match.endIndex + 1,
          options: partialMatchOptions,
        };

        return;
      }
    }

    this.possibilities = {
      startIndex,
      options,
    };
  }

  static inspectParse(text, pattern) {
    return new ParseInspector().inspectParse(text, pattern);
  }
}


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextInspector; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


class TextInspector {
  constructor() {
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

  inspect(text, pattern) {
    this.reset();

    this.text = text;
    this.rootPattern = pattern;

    // If no text all options are available.
    if (text.length === 0) {
      return {
        pattern: null,
        astNode: null,
        match: null,
        error: null,
        tokens: {
          startIndex: 0,
          options: pattern.getTokens(),
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

  reset() {
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

  parse() {
    this.rootPattern = this.rootPattern;
    this.cursor = new _index_js__WEBPACK_IMPORTED_MODULE_0__["Cursor"](this.text);
    this.cursor.startRecording();
    this.result = this.rootPattern.parse(this.cursor);
    this.patternMatch = this.cursor.lastMatch;
  }

  saveParseStack() {
    this.parseStack = this.cursor.history.getLastParseStack();
  }

  saveMatchedText() {
    if (this.patternMatch.astNode != null) {
      this.matchedText = this.text.substring(
        0,
        this.patternMatch.astNode.endIndex + 1
      );
    }
  }

  saveMatch() {
    const node = this.patternMatch.astNode;

    if (node == null) {
      this.match = null;
      return;
    }

    let endIndex = this.matchedText.length - 1;

    this.match = {
      text: this.matchedText,
      startIndex: 0,
      endIndex: endIndex,
    };
  }

  saveError() {
    if (this.patternMatch.astNode == null) {
      this.error = {
        startIndex: 0,
        endIndex: this.text.length - 1,
        text: this.text,
      };
      return this;
    }

    if (this.text.length > this.matchedText.length) {
      const difference = this.text.length - this.matchedText.length;
      const startIndex = this.patternMatch.astNode.endIndex + 1;
      const endIndex = startIndex + difference - 1;

      this.error = {
        startIndex: startIndex,
        endIndex: endIndex,
        text: this.text.substring(startIndex, endIndex + 1),
      };

      return;
    } else {
      this.error = null;
      return;
    }
  }

  saveNextToken() {
    if (
      this.patternMatch.pattern === this.rootPattern &&
      this.cursor.didSuccessfullyParse()
    ) {
      this.tokens = null;
      return;
    }

    if (this.patternMatch.astNode == null) {
      let options = this.rootPattern.getTokens();
      const parts = this.text.split(" ").filter((part) => {
        return part.length > 0;
      });

      options = options.filter((option) => {
        return parts.some((part) => {
          return option.indexOf(part) > -1;
        });
      });

      if (options.length === 0) {
        this.tokens = null;
        return;
      }

      this.tokens = {
        startIndex: 0,
        options,
      };

      return;
    }

    const options = this.options;
    let startIndex = this.matchedText.length;

    if (this.matchedText.length < this.text.length) {
      const leftOver = this.text.substring(this.matchedText.length);
      const partialMatchOptions = options
        .filter((option) => {
          return option.indexOf(leftOver) === 0;
        })
        .map((option) => {
          return option.substring(leftOver.length);
        });

      if (partialMatchOptions.length === 0) {
        this.tokens = null;
        return;
      } else {
        this.match = {
          ...this.match,
          text: this.match.text + leftOver,
          endIndex: this.match.endIndex + leftOver.length,
        };

        this.error = null;

        this.tokens = {
          startIndex: this.match.endIndex + 1,
          options: partialMatchOptions,
        };

        return;
      }
    }

    this.tokens = {
      startIndex,
      options,
    };
  }

  saveOptions() {
    const furthestMatches = this.cursor.history.astNodes.reduce(
      (acc, node, index) => {
        if (node.endIndex === acc.furthestTextIndex) {
          acc.nodeIndexes.push(index);
        } else if (node.endIndex > acc.furthestTextIndex) {
          acc.furthestTextIndex = node.endIndex;
          acc.nodeIndexes = [index];
        }

        return acc;
      },
      { furthestTextIndex: -1, nodeIndexes: [] }
    );

    const matches = furthestMatches.nodeIndexes.reduce((acc, index) => {
      const pattern = this.cursor.history.patterns[index];
      const tokens = pattern.getNextTokens();

      tokens.forEach((token) => {
        acc[token] = true;
      });

      return acc;
    }, {});

    this.options = Object.keys(matches);
  }

  static inspect(text, pattern) {
    return new TextInspector().inspect(text, pattern);
  }
}


/***/ })
/******/ ]);
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const divider = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("divider", "\\s*[,]\\s*");

/* harmony default export */ __webpack_exports__["default"] = (divider);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _spaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);




const values = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatComposite"]("values", _value_js__WEBPACK_IMPORTED_MODULE_1__["default"], _spaces_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (values);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _method_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
;






const value = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["OrComposite"]("value", [_hex_js__WEBPACK_IMPORTED_MODULE_2__["default"], _method_js__WEBPACK_IMPORTED_MODULE_4__["default"], _unit_js__WEBPACK_IMPORTED_MODULE_1__["default"], _number_js__WEBPACK_IMPORTED_MODULE_3__["default"], _name_js__WEBPACK_IMPORTED_MODULE_5__["default"]]);

/* harmony default export */ __webpack_exports__["default"] = (value);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);




const unitType = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("unit-type", "[a-zA-Z%]+");
const unit = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["AndComposite"]("unit", [_number_js__WEBPACK_IMPORTED_MODULE_1__["default"], unitType]);

/* harmony default export */ __webpack_exports__["default"] = (unit);


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const hex = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");

/* harmony default export */ __webpack_exports__["default"] = (hex);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _optionalSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _divider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);






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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const name = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RegexValue"]("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

/* harmony default export */ __webpack_exports__["default"] = (name);


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__);


const space = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["Literal"]("space", " ");
const spaces = new clarity_pattern_parser__WEBPACK_IMPORTED_MODULE_0__["RepeatValue"]("spaces", space);

/* harmony default export */ __webpack_exports__["default"] = (spaces);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TreeNormalizer; });
/* harmony import */ var _Visitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _HexColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);



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
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyframeUtility; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _KeyframeConfigValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _ParsedValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




const validator = new _KeyframeConfigValidator_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

class KeyframeUtility {
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
    this._normalizeValue();
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

  _normalizeValue() {
    if (this.config.value != null) {
      this.config.to = this.config.value;
      this.config.from = this.config.value;
    }
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easingFunctions_easeInQuad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _easingFunctions_easeOutQuad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _easingFunctions_easeInOutQuad_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _easingFunctions_easeInElastic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _easingFunctions_easeInOutElastic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var _easingFunctions_easeOutElastic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);
/* harmony import */ var _easingFunctions_easeInOutBack_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33);
/* harmony import */ var _easingFunctions_easeInOutBounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34);
/* harmony import */ var _easingFunctions_easeInBounce_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35);
/* harmony import */ var _easingFunctions_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(36);
/* harmony import */ var _easingFunctions_easeInCubic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(37);
/* harmony import */ var _easingFunctions_easeOutCubic_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(38);
/* harmony import */ var _easingFunctions_easeInOutCubic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(39);
/* harmony import */ var _easingFunctions_easeInQuart_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40);
/* harmony import */ var _easingFunctions_easeOutQuart_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(41);
/* harmony import */ var _easingFunctions_easeInOutQuart_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(42);
/* harmony import */ var _easingFunctions_easeInQuint_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(43);
/* harmony import */ var _easingFunctions_easeOutQuint_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(44);
/* harmony import */ var _easingFunctions_easeInOutQuint_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(45);
/* harmony import */ var _easingFunctions_easeInSine_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(46);
/* harmony import */ var _easingFunctions_easeOutSine_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(47);
/* harmony import */ var _easingFunctions_easeInOutSine_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(48);
/* harmony import */ var _easingFunctions_easeInExpo_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(49);
/* harmony import */ var _easingFunctions_easeOutExpo_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(50);
/* harmony import */ var _easingFunctions_easeInOutExpo_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(51);
/* harmony import */ var _easingFunctions_easeInCirc_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(52);
/* harmony import */ var _easingFunctions_easeOutCirc_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(53);
/* harmony import */ var _easingFunctions_easeInOutCirc_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(54);
/* harmony import */ var _easingFunctions_easeInBack_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(55);
/* harmony import */ var _easingFunctions_easeOutBack_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(56);
/* harmony import */ var _easingFunctions_easeLinear_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(57);
































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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage * percentage;
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -percentage * (percentage - 2);
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1) return (1 / 2) * percentage * percentage;
  return (-1 / 2) * (--percentage * (percentage - 2) - 1);
});


/***/ }),
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easeInBounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _easeOutBounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);



/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if (percentage < 0.5) {
    return Object(_easeInBounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(percentage * 2) * 0.5;
  } else {
    return Object(_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(percentage * 2 - 1) * 0.5 + 0.5;
  }
});


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _easeOutBounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);


/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 - Object(_easeOutBounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1 - percentage);
});


/***/ }),
/* 36 */
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * (percentage /= 1) * percentage * percentage;
});


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1);
});


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * percentage * percentage * percentage;
  return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
});


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * (percentage /= 1) * percentage * percentage * percentage;
});


/***/ }),
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (
    1 * (percentage /= 1) * percentage * percentage * percentage * percentage
  );
});


/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -Math.cos(percentage * (Math.PI / 2)) + 1;
});


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
});


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
});


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
});


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage == 1 ? 1 : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
});


/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
});


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
});


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
  return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
});


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  const s = 1.70158;
  return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
});


/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((percentage) => {
  return percentage;
});


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var _DefaultClock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
/* harmony import */ var _SlopeAnimationBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63);
/* harmony import */ var _BlendedAnimation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);





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
    animation,
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
    this._animation = animation;
    this._clock = clock || defaultClock;
    this._state = STOPPED;
    this._render = typeof render === "function" ? render : defaultRender;
    this._slopeAnimationBuilder = new _SlopeAnimationBuilder_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

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

  seek(time) {
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

  transitionToTimeline(animation, duration, easing) {
    const slopeAnimation = this._slopeAnimationBuilder.build(
      this._animation,
      this._time,
      this._duration,
      duration,
      this._state
    );

    const blendedAnimation = new _BlendedAnimation_js__WEBPACK_IMPORTED_MODULE_3__["default"](
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


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);
/* harmony import */ var _TimeObserver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);



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
/* 60 */
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeObserver; });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);


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
/* 62 */
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SlopeAnimationBuilder; });
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _GraphOperator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
/* harmony import */ var _Keyframe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);





const FORWARD = 1;
const BACKWARD = -1;

class SlopeAnimationBuilder {
  constructor() {
    this.animation = null;
    this.slopeAnimation = null;
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

  build(animation, offset, duration, newDuration, direction) {
    this.animation = animation;
    this.offset = offset;
    this.duration = duration;
    this.newDuration = newDuration;
    this.direction = direction;

    this.cacheValues();
    this.calculate();
    this.createSlopeTimeline();

    return this.slopeAnimation;
  }

  cacheValues() {
    this.animation.update(this.offset);
    this.nowValues = this.cloneValues(this.animation.getCurrentValues());

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
    this.animation.update(this.offset + this.delta);
    this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
  }

  cacheDeltaValueBackward() {
    this.animation.update(this.offset - this.delta);
    this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
  }

  cacheDeltaValueStopped() {
    this.animation.update(this.offset);
    this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
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
    const keyframes = Object.keys(this.nowValues)
      .map((name) => {
        return Object.keys(this.nowValues[name]).map((property) => {
          return new _Keyframe_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
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

    this.slopeAnimation = new _Animation_js__WEBPACK_IMPORTED_MODULE_3__["default"](keyframes);
  }
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphOperator; });
/* harmony import */ var _GraphOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
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
/* 65 */
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlendedAnimation; });
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Keyframe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _easings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);




class BlendedAnimation extends _Animation_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(fromAnimation, toAnimation, easing) {
    const fromValues = fromAnimation.getCurrentValues();
    const toValues = toAnimation.getCurrentValues();

    const animations = Object.keys(fromValues)
      .map((name) => {
        const fromValue = fromValues[name];
        const toValue = toValues[name];

        return Object.keys(fromValue).map((property) => {
          const from = fromValue[property];
          const to = toValue[property];

          return new _Keyframe_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
            name,
            property,
            startAt: 0,
            endAt: 1,
            from,
            to,
            controls: [],
            easing: easing || _easings_js__WEBPACK_IMPORTED_MODULE_2__["default"].linear,
          });
        });
      })
      .flat();

    super(animations);

    this.fromAnimation = fromAnimation;
    this.toAnimation = toAnimation;
  }

  update(time) {
    this.fromAnimation.update(time);
    this.toAnimation.update(time);

    super.update(time);

  }
}


/***/ })
/******/ ]);
});