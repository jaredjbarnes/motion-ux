import NumberAnimator from "./NumberAnimator.js";

export default class NumberNodeAnimator {
  constructor(options) {
    this.animator = new NumberAnimator({
      ...options,
      from: parseFloat(options.fromNode.value),
      to: parseFloat(options.toNode.value)
    });
  }

  render(progress) {
    return this.animator.render(progress);
  }
}
