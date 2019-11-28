import NumberAnimator from "./NumberAnimator.js";

export default class NumberNodeAnimator {
  constructor(options) {
    this.animator = new NumberAnimator({
      ...options,
      controls: options.controls.map(node => parseFloat(node.value))
    });
  }

  render(progress) {
    return this.animator.render(progress);
  }
}
