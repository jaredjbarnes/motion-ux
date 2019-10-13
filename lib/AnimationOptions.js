"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimationOptions {
  constructor(_ref) {
    let {
      name,
      target,
      to,
      from,
      startAt,
      endAt,
      easing
    } = _ref;
    this.target = target;
    this.name = name;
    this.to = to;
    this.from = from;
    this.startAt = startAt;
    this.endAt = endAt;

    if (typeof easing === "string") {
      this.easing = _easings.default[easing];
    }

    this.easing = easing || _easings.default.linear;
    this.validate();
  }

  validate() {
    if (typeof this.name !== "string") {
      throw new Error("The \"name\" property needs to be a string.");
    }

    if (this.to == null) {
      throw new Error("The \"to\" property cannot be null or undefined.");
    }

    if (this.from == null) {
      throw new Error("The \"from\" property cannot be null or undefined.");
    }

    if (typeof this.target !== "object" || this.target == null) {
      throw new Error("Invalid Arguments: The \"target\" property needs to be an object.");
    }

    if (typeof this.startAt !== "number" || this.startAt < 0 || this.startAt > 1) {
      throw new Error("The \"startAt\" property must be a number between 0 and 1.");
    }

    if (typeof this.endAt !== "number" || this.endAt < 0 || this.endAt > 1) {
      throw new Error("The \"endAt\" property must be a number between 0 and 1.");
    }

    if (typeof this.easing !== "function") {
      throw new Error("The \"easing\" property must be a function.");
    }
  }

}

exports.default = AnimationOptions;