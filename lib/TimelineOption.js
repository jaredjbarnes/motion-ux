"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TimelineOption =
/*#__PURE__*/
function () {
  function TimelineOption(_ref) {
    var name = _ref.name,
        target = _ref.target,
        to = _ref.to,
        from = _ref.from,
        startAt = _ref.startAt,
        endAt = _ref.endAt,
        easing = _ref.easing;

    _classCallCheck(this, TimelineOption);

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

  _createClass(TimelineOption, [{
    key: "validate",
    value: function validate() {
      if (typeof this.name !== "string") {
        throw new Error("The \"name\" property needs to be a string.");
      }

      if (this.to == null) {
        throw new Error("The \"to\" property cannot be null or undefined.");
      }

      if (this.from == null) {
        throw new Error("The \"from\" property cannot be null or undefined.");
      }

      if (_typeof(this.target) !== "object" || this.target == null) {
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
  }]);

  return TimelineOption;
}();

exports.default = TimelineOption;
//# sourceMappingURL=TimelineOption.js.map