import BezierCurve from "./BezierCurve.js";
import GraphsVisitor from "./GraphsVisitor.js";

const visitor = new GraphsVisitor();

export default class Animator {
  constructor(keyframe) {
    this.keyframe = keyframe;
    this.visit = this.visit.bind(this);
    this.time = 0;
    this.bezierCurve = new BezierCurve([]);
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
