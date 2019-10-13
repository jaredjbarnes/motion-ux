import RgbAnimator from "./RgbAnimator.js";
import RgbaAnimator from "./RgbaAnimator.js";
import HexAnimator from "./HexAnimator.js";

export default class ColorAnimator {
  constructor(options) {
    this.animator = null;
    this.options = options;

    if (HexAnimator.isMatch(options)) {
      this.animator = new HexAnimator(options);
    } else if (RgbAnimator.isMatch(options)) {
      this.animator = new RgbAnimator(options);
    } else if (RgbaAnimator.isMatch(options)) {
      this.animator = new RgbaAnimator(options);
    }
  }

  render(progress, duration) {
    if (this.animator == null) {
      throw new Error("Unable to detect the color animator.");
    }

    this.animator.render(progress, duration);
  }

  static isMatch(options) {
    return (
      HexAnimator.isMatch(options) ||
      RgbAnimator.isMatch(options) ||
      RgbaAnimator.isMatch(options)
    );
  }
}
