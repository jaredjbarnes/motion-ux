import BezierCurve from "./BezierCurve.js";
import GraphsVisitor from "./GraphsVisitor.js";

const visitor = new GraphsVisitor();

export default class Animator {
  constructor(animation) {
    this.animation = animation;
    this.visit = this.visit.bind(this);
    this.progress = 0;
    this.bezierCurve = new BezierCurve([]);
    this.animationGraphs = [];
    this.createAnimationGraphs();
  }

  createAnimationGraphs() {
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
    const progress = this.progress;

    if (cloneNodes[0].name === "number") {
      const relativeProgress = progress - this.animation.startAt;
      const animationDuration = this.animation.endAt - this.animation.startAt;
      const progressWithEasing =
        this.animation.easing(relativeProgress) * animationDuration;

      const points = cloneNodes.map((node) => node.value);

      this.bezierCurve.setPoints(points);
      resultNode.value = this.bezierCurve.valueAt(progressWithEasing);
    } else {
      if (!Array.isArray(resultNode.children)) {
        if (progress >= this.animation.startAt) {
          resultNode.value = cloneNodes[cloneNodes.length - 1].value;
        } else {
          resultNode.value = cloneNodes[0].value;
        }
      }
    }
  }

  render(progress) {
    this.progress = progress;

    visitor.setCallback(this.visit);
    visitor.visitDown(this.animationGraphs);

    const value = this.animation.result.graph.toString();
    this.animation.result.value = value;

    return this.animation.result;
  }
}
