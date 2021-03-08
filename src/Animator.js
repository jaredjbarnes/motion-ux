import BezierCurve from "./BezierCurve.js";
import GraphsVisitor from "./GraphsVisitor.js";

const visitor = new GraphsVisitor();

export default class Animator {
  constructor(animation) {
    this.animation = animation;
    this.visit = this.visit.bind(this);
    this.time = 0;
    this.bezierCurve = new BezierCurve([]);
    this.animationGraphs = [];
    this.updateAnimationGraphs();
  }

  updateAnimationGraphs() {
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
      const elapsedTime = time - this.animation.startAt;
      const animationDuration = this.animation.endAt - this.animation.startAt;
      const timeWithEasing = this.animation.easing(
        elapsedTime / animationDuration
      );

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
    this.updateAnimationGraphs();
    this.time = time;

    visitor.setCallback(this.visit);
    visitor.visitDown(this.animationGraphs, true);

    const value = this.animation.result.graph.toString();
    this.animation.result.value = value;

    return this.animation.result;
  }
}
