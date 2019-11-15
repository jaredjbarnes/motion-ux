import NumberAnimator from "./NumberAnimator.js";

export default class UnitNodeAnimator {
  constructor(options) {
    this.options = options;

    this.animator = new NumberAnimator({
      ...options,
      from: parseInt(options.fromNode.children[0].value, 10),
      to: parseInt(options.toNode.children[0].value, 10)
    });
  }

  render(progress) {
    const value = this.animator.render(progress);
    const unit = this.options.fromNode.children[1].value;
    return `${value}${unit}`;
  }
}
