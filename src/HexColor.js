import { ValueNode } from "clarity-pattern-parser";
import { CompositeNode } from "clarity-pattern-parser";
import hex from "./patterns/hex";

const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

export default class HexColor {
  constructor(hexString) {
    this.setHex(hexString);
  }

  setHex(hexString) {
    this.hexString = hexString;
    this.normalizeHex();
    this.saveRgb();
  }

  saveRgb() {
    hex = this.hexString;
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    this.rgb = result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  }

  toComplexNode() {
    const children = this.rgb.map((number) => {
      new ValueNode("number", number.toString());
    });

    const node = new CompositeNode("hex");
    node.children = children;
  }

  toValueNode() {
    return new ValueNode("hex", this.hexString);
  }

  toRgbString() {
    return `rgb(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]})`;
  }

  normalizeHex() {
    if (this.hexString.length === 4) {
      this.hexString = this.hexString + this.hexString.substring(1);
    }
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

  toHexString() {
    const rgbArray = this.rgb;
    const red = this.numberToHex(rgbArray[0]);
    const green = this.numberToHex(rgbArray[1]);
    const blue = this.numberToHex(rgbArray[2]);

    return `#${red}${green}${blue}`;
  }
}
