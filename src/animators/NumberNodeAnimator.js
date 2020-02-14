import NumberAnimator from "./NumberAnimator.js";

export default class NumberNodeAnimator {
  constructor(options) {
    this.options = options;
    
    this.animator = new NumberAnimator({
      ...options,
      controls: options.controls.map(node => parseFloat(node.value))
    });

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    return this.animator.render(progress);
  }
}
