export default class NameNodeAnimator {
  constructor(options) {
    this.options = options;
  }

  render(progress) {
    if (progress > 0) {
      return this.options.controls[this.options.controls.length - 1].value;
    } else {
      return this.options.controls[0].value;
    }
  }
}
