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

  numberToHex(number) {
    if (number > 255) {
      number = 255;
    }

    if (number < 0) {
      number = 0;
    }

    let hex = number.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
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
    const red = this.numberToHex(Math.round(this.redAnimator.render(progress)));

    const green = this.numberToHex(
      Math.round(this.greenAnimator.render(progress))
    );

    const blue = this.numberToHex(
      Math.round(this.blueAnimator.render(progress))
    );

    return `#${red}${green}${blue}`;
  }
}
