"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

var _ParsedValue = _interopRequireDefault(require("./ParsedValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation =
/*#__PURE__*/
function () {
  function Animation(config) {
    _classCallCheck(this, Animation);

    config.controls = Array.isArray(config.controls) ? config.controls : [];
    this.config = config;
    this.name = config.name;
    this.property = config.property;
    this.to = new _ParsedValue.default(config.to);
    this.from = new _ParsedValue.default(config.from);
    this.result = new _ParsedValue.default(config.from);
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls.map(function (v) {
      return new _ParsedValue.default(v);
    });
    this.normalizeEasing();
    this.validate();
  }

  _createClass(Animation, [{
    key: "setTo",
    value: function setTo(value) {
      if (!(value instanceof _ParsedValue.default)) {
        throw new Error("The value needs to be a ParsedValue.");
      }

      this.to = value;
      this.validateNodes();
    }
  }, {
    key: "setFrom",
    value: function setFrom(value) {
      if (!(value instanceof _ParsedValue.default)) {
        throw new Error("The value needs to be a ParsedValue.");
      }

      this.from = value;
      this.validateNodes();
    }
  }, {
    key: "normalizeEasing",
    value: function normalizeEasing() {
      var config = this.config;
      this.easing = typeof config.easing === "string" ? _easings.default[config.easing] : config.easing;
      this.config.easing = this.easing = config.easing || _easings.default.linear;
    }
  }, {
    key: "validate",
    value: function validate() {
      if (typeof this.property !== "string") {
        throw new Error("The \"property\" property needs to be a string.");
      }

      if (typeof this.config.to !== "string") {
        throw new Error("The \"to\" property needs to be a string, but found ".concat(this.to.value, "."));
      }

      if (typeof this.config.from !== "string") {
        throw new Error("The \"from\" property needs to be a string, but found ".concat(this.from.value, "."));
      }

      if (typeof this.config.name !== "string") {
        throw new Error("Invalid Arguments: The \"name\" property needs to be an string.");
      }

      if (typeof this.config.startAt !== "number" || this.config.startAt < 0 || this.config.startAt > 1) {
        throw new Error("The \"startAt\" property must be a number between 0 and 1.");
      }

      if (typeof this.config.endAt !== "number" || this.config.endAt < 0 || this.config.endAt > 1) {
        throw new Error("The \"endAt\" property must be a number between 0 and 1.");
      }

      if (typeof this.config.easing !== "function") {
        throw new Error("The \"easing\" property must be a function.");
      }

      this.validateNodes();
    }
  }, {
    key: "validateNodes",
    value: function validateNodes() {
      var allStructuresAreEqual = true;

      if (this.to.graphHash !== this.from.graphHash) {
        allStructuresAreEqual = false;
      }

      for (var x = 0; x < this.controls.length; x++) {
        var value = this.controls[x];

        if (value.graphHash !== this.from.graphHash) {
          allStructuresAreEqual = false;
          break;
        }
      }

      if (!allStructuresAreEqual) {
        throw new Error("Invalid Animation: The value types that are being animated do not match. From: ".concat(JSON.stringify(this.from.value), ", To:").concat(JSON.stringify(this.to.value), ", Controls: ").concat(JSON.stringify(this.controls.map(function (v) {
          return v.value;
        }))));
      }
    }
  }]);

  return Animation;
}();

exports.default = Animation;
//# sourceMappingURL=Animation.js.map