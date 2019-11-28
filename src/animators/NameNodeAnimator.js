export default class NameNodeAnimator {
  constructor(options) {
    this.options = options;
  }

  render(progress) {
    if (progress < 1) {
      return this.options.controls[0].value;
    } else {
      return this.options.controls[1].value;
    }
  }
}
