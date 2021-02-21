"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("./BezierCurve.js"));

var _SideBySideVisitor = _interopRequireDefault(require("./SideBySideVisitor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var visitor = new _SideBySideVisitor.default();

var Animator =
/*#__PURE__*/
function () {
  function Animator(animation) {
    _classCallCheck(this, Animator);

    this.animation = animation;
    this.visit = this.visit.bind(this);
    this.convertNumberNodes = this.convertNumberNodes.bind(this);
    this.progress = 0;
    this.bezierCurve = new _BezierCurve.default([]);
    this.nodes = [this.animation.fromNode].concat(_toConsumableArray(this.animation.controlNodes), [this.animation.toNode, this.animation.resultNode]);
    visitor.setCallback(this.convertNumberNodes);
    visitor.visitDown(this.nodes.slice(0, this.nodes.length - 1));
  }

  _createClass(Animator, [{
    key: "convertNumberNodes",
    value: function convertNumberNodes() {
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      if (nodes[0].name === "number") {
        nodes.forEach(function (node) {
          node.value = Number(node.value);
        });
      }
    }
  }, {
    key: "visit",
    value: function visit() {
      for (var _len2 = arguments.length, nodes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nodes[_key2] = arguments[_key2];
      }

      if (nodes[0].name === "number") {
        var resultNode = nodes.pop();
        var progress = this.progress;
        var relativeProgress = progress - this.animation.startAt;
        var duration = this.animation.endAt - this.animation.startAt;
        var progressWithEasing = this.animation.easing.valueAt(relativeProgress) * duration;
        var points = nodes.map(function (node) {
          return node.value;
        });
        this.bezierCurve.setPoints(points);
        resultNode.value = this.bezierCurve.valueAt(progressWithEasing).toString();
      }
    }
  }, {
    key: "render",
    value: function render(progress) {
      if (progress <= this.animation.startAt) {
        return this.animation.from;
      }

      if (progress >= this.animation.endAt) {
        return this.animation.to;
      }

      this.progress = progress;
      visitor.setCallback(this.visit);
      visitor.visitDown(this.nodes);
      return this.animation.resultNode.toString();
    }
  }]);

  return Animator;
}();

exports.default = Animator;
//# sourceMappingURL=Animator.js.map