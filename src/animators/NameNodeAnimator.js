export default class NameNodeAnimator {
  constructor(options) {
    this.options = options;
  }

  render(progress) {
    if (progress < 1) {
      return this.options.fromNode.value;
    } else {
      return this.options.toNode.value;
    }
  }
}
