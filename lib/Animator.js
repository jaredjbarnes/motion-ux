"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("./BezierCurve.js"));

var _GraphsVisitor = _interopRequireDefault(require("./GraphsVisitor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var visitor = new _GraphsVisitor.default();

var Animator =
/*#__PURE__*/
function () {
  function Animator(keyframe) {
    _classCallCheck(this, Animator);

    this.keyframe = keyframe;
    this.visit = this.visit.bind(this);
    this.time = 0;
    this.bezierCurve = new _BezierCurve.default([]);
    this.keyframeGraphs = [];
    this.updateKeyframeGraphs();
  }

  _createClass(Animator, [{
    key: "updateKeyframeGraphs",
    value: function updateKeyframeGraphs() {
      this.keyframeGraphs.length = 0;
      this.keyframeGraphs.push(this.keyframe.from.graph);

      for (var x = 0; x < this.keyframe.controls.length; x++) {
        this.keyframeGraphs.push(this.keyframe.controls[x].graph);
      }

      this.keyframeGraphs.push(this.keyframe.to.graph);
      this.keyframeGraphs.push(this.keyframe.result.graph);
    }
  }, {
    key: "visit",
    value: function visit(nodes) {
      var cloneNodes = nodes.slice();
      var resultNode = cloneNodes.pop();
      var time = this.time;

      if (cloneNodes[0].name === "number") {
        var elapsedTime = time - this.keyframe.startAt;
        var animationDuration = this.keyframe.endAt - this.keyframe.startAt;
        var timeWithEasing = this.keyframe.easing(elapsedTime / animationDuration);
        var points = cloneNodes.map(function (node) {
          return node.value;
        });
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
  }, {
    key: "update",
    value: function update(time) {
      this.updateKeyframeGraphs();
      this.time = time;
      visitor.setCallback(this.visit);
      visitor.visitDown(this.keyframeGraphs, true);
      var value = this.keyframe.result.graph.toString();
      this.keyframe.result.value = value;
      return this.keyframe.result;
    }
  }]);

  return Animator;
}();

exports.default = Animator;
//# sourceMappingURL=Animator.js.map