import BezierCurve from "./BezierCurve.js";
import SideBySideVisitor from "./SideBySideVisitor.js";

const visitor = new SideBySideVisitor();

export default class Animator {
  constructor(animation) {
    this.animation = animation;
    this.visit = this.visit.bind(this);
    this.convertNumberNodes = this.convertNumberNodes.bind(this);
    this.progress = 0;
    this.bezierCurve = new BezierCurve([]);
    this.nodes = [
      this.animation.fromNode,
      ...this.animation.controlNodes,
      this.animation.toNode,
      this.animation.resultNode,
    ];

    visitor.setCallback(this.convertNumberNodes);
    visitor.visitDown(this.nodes.slice(0, this.nodes.length - 1));
  }

  convertNumberNodes(...nodes) {
    if (nodes[0].name === "number") {
      nodes.forEach((node) => {
        node.value = Number(node.value);
      });
    }
  }

  visit(...nodes) {
    if (nodes[0].name === "number") {
      const resultNode = nodes.pop();
      const progress = this.progress;

      const relativeProgress = progress - this.animation.startAt;
      const duration = this.animation.endAt - this.animation.startAt;
      const progressWithEasing =
        this.animation.easing.valueAt(relativeProgress) * duration;

      const points = nodes.map((node) => node.value);
      this.bezierCurve.setPoints(points);
      resultNode.value = this.bezierCurve
        .valueAt(progressWithEasing)
        .toString();
    }
  }

  render(progress) {
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
}
