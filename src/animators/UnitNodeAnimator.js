import NumberAnimator from "./NumberAnimator.js";

export default class UnitNodeAnimator {
  constructor(options) {
    this.options = options;

    this.animator = new NumberAnimator({
      ...options,
      controls: options.controls.map(node =>
        parseInt(node.children[0].value, 10)
      )
    });
  }

  render(progress) {
    const value = this.animator.render(progress);
    const unit = this.options.controls[0].children[1].value;
    return `${value}${unit}`;
  }
}
