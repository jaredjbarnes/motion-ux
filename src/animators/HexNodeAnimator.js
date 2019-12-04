import NumberAnimator from "./NumberAnimator.js";

const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

export default class HexNodeAnimator {
  constructor(options) {
    this.options = options;
    this.progress = null;
    this.duration = null;

    this.parseValues();
    this.createAnimators();
  }

  parseValues() {
    const values = this.options.controls.map(node => {
      return this.hexToRgb(this.convertToFullHex(node.value));
    });

    const { reds, greens, blues } = values.reduce(
      (acc, rgb) => {
        acc.reds.push(rgb[0]);
        acc.greens.push(rgb[1]);
        acc.blues.push(rgb[2]);
        return acc;
      },
      {
        reds: [],
        greens: [],
        blues: []
      }
    );

    this.reds = reds;
    this.greens = greens;
    this.blues = blues;
  }

  convertToFullHex(value) {
    if (value.length === 4) {
      value = value + value.substring(1);
    }
    return value;
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

  createAnimators() {
    this.redAnimator = new NumberAnimator({
      ...this.options,
      controls: this.reds
    });

    this.greenAnimator = new NumberAnimator({
      ...this.options,
      controls: this.greens
    });

    this.blueAnimator = new NumberAnimator({
      ...this.options,
      controls: this.blues
    });
  }

  render(progress) {
    let red = Math.round(this.redAnimator.render(progress));
    let green = Math.round(this.greenAnimator.render(progress));
    let blue = Math.round(this.blueAnimator.render(progress));

    red = red > 255 ? 255 : red;
    green = green > 255 ? 255 : green;
    blue = blue > 255 ? 255 : blue;

    red = red < 0 ? 0 : red;
    green = green < 0 ? 0 : green;
    blue = blue < 0 ? 0 : blue;

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  }
}
