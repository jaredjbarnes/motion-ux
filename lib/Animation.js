"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

var _cssValue = _interopRequireDefault(require("./patterns/cssValue.js"));

var _TreeNormalizer = _interopRequireDefault(require("./TreeNormalizer.js"));

var _TreeUtility = _interopRequireDefault(require("./TreeUtility.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var treeUtility = new _TreeUtility.default();
var treeNormalizer = new _TreeNormalizer.default();

var Animation =
/*#__PURE__*/
function () {
  function Animation(config) {
    _classCallCheck(this, Animation);

    this.config = config;
    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = Array.isArray(config.controls) ? config.controls : [];
    this.value = this.from;
    this.normalizeEasing();
    this.createNodeTrees();
    this.validate();
  }

  _createClass(Animation, [{
    key: "normalizeEasing",
    value: function normalizeEasing() {
      var config = this.config;
      this.easing = typeof config.easing === "string" ? _easings.default[config.easing] : config.easing;
      this.easing = config.easing || _easings.default.linear;
    }
  }, {
    key: "createNodeTrees",
    value: function createNodeTrees() {
      this.controlNodes = this.controls.map(function (c) {
        return treeNormalizer.normalize(_cssValue.default.parse(new _clarityPatternParser.Cursor(c)));
      });
      this.toNode = treeNormalizer.normalize(_cssValue.default.parse(new _clarityPatternParser.Cursor(this.to)));
      this.fromNode = treeNormalizer.normalize(_cssValue.default.parse(new _clarityPatternParser.Cursor(this.from)));
      this.resultNode = this.fromNode.clone();
    }
  }, {
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

      if (this.easing == null || typeof this.easing.valueAt !== "function") {
        throw new Error("The \"easing\" property must be an instance of Easing.");
      }

      this.validateNodes();
    }
  }, {
    key: "validateNodes",
    value: function validateNodes() {
      var allTrees = [this.fromNode].concat(_toConsumableArray(this.controlNodes), [this.toNode]);
      var fromNode = this.fromNode;
      var allStructuresAreEqual = allTrees.every(function (node) {
        return treeUtility.areTreeStructuresEqual(fromNode, node);
      });

      if (!allStructuresAreEqual) {
        throw new Error("Invalid Animation: The value types that are being animated do not match. From: ".concat(JSON.stringify(this.from), ", To:").concat(JSON.stringify(this.to), ", Controls: ").concat(JSON.stringify(this.controls)));
      }
    }
  }]);

  return Animation;
}();

exports.default = Animation;
//# sourceMappingURL=Animation.js.map