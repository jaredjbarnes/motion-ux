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

    this.unit = this.options.controls[0].children[1].value;

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    const value = this.animator.render(progress);
    const unit = this.unit;
    return `${value.toFixed(3)}${unit}`;
  }
}
