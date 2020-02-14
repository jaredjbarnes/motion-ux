export default class NameNodeAnimator {
  constructor(options) {
    this.options = options;
    this.values = this.options.controls.map(node => {
      return node.value;
    });

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  render(progress) {
    if (progress > 0) {
      return this.values[this.values.length - 1];
    } else {
      return this.values[0];
    }
  }
}
