import NumberAnimator from "./NumberAnimator.js";

const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

export default class HexNodeAnimator {
  constructor(options) {
    this.options = options;
    this.progress = null;
    this.values = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.change = null;

    this.parsefromValue();
    this.parsetoValue();
    this.createAnimators();
  }

  parsefromValue() {
    let fromValue = this.options.fromNode.value;
    if (fromValue.length === 4) {
      fromValue = fromValue + fromValue.substring(1);
    }
    this.fromValue = this.hexToRgb(fromValue);
  }

  parsetoValue() {
    let toValue = this.options.toNode.value;
    if (toValue.length === 4) {
      toValue = toValue + toValue.substring(1);
    }
    this.toValue = this.hexToRgb(toValue);
  }

  createAnimators() {
    this.animators = this.fromValue.map((value, index) => {
      return new NumberAnimator({
        from: value,
        to: this.toValue[index],
        startAt: this.options.startAt,
        endAt: this.options.endAt,
        easing: this.options.easing
      });
    });
  }

  hexToRgb(hex) {
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : null;
  }

  render(progress) {
    const red = Math.round(this.animators[0].render(progress));
    const green = Math.round(this.animators[1].render(progress));
    const blue = Math.round(this.animators[2].render(progress));

    return `rgba(${red},${green},${blue}, 1)`;
  }
}
