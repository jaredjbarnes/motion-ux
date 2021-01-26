"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

var _Easing = _interopRequireDefault(require("./Easing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TimelineOption =
/*#__PURE__*/
function () {
  function TimelineOption(animation) {
    _classCallCheck(this, TimelineOption);

    this.name = animation.name;
    this.property = animation.property;
    this.to = animation.to;
    this.from = animation.from;
    this.startAt = animation.startAt;
    this.endAt = animation.endAt;
    this.easing = animation.easing;
    this.controls = animation.controls;

    if (typeof easing === "string") {
      this.easing = _easings.default[easing];
    }

    if (!Array.isArray(this.controls)) {
      this.controls = [];
    }

    this.easing = this.easing || _easings.default.linear;
    this.validate();
  }

  _createClass(TimelineOption, [{
    key: "validate",
    value: function validate() {
      if (typeof this.property !== "string") {
        throw new Error("The \"property\" property needs to be a string.");
      }

      if (typeof this.to !== "string") {
        throw new Error("The \"to\" property needs to be a string, but found ".concat(this.to, "."));
      }

      if (typeof this.from !== "string") {
        throw new Error("The \"from\" property needs to be a string, but found ".concat(this.from, "."));
      }

      if (typeof this.name !== "string") {
        throw new Error("Invalid Arguments: The \"name\" property needs to be an string.");
      }

      if (typeof this.startAt !== "number" || this.startAt < 0 || this.startAt > 1) {
        throw new Error("The \"startAt\" property must be a number between 0 and 1.");
      }

      if (typeof this.endAt !== "number" || this.endAt < 0 || this.endAt > 1) {
        throw new Error("The \"endAt\" property must be a number between 0 and 1.");
      }

      if (!(this.easing instanceof _Easing.default)) {
        throw new Error("The \"easing\" property must be an instance of Easing.");
      }
    }
  }]);

  return TimelineOption;
}();

exports.default = TimelineOption;
//# sourceMappingURL=TimelineOption.js.map