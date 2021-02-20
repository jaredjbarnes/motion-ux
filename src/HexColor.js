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
    this.saveRgba();
  }

  saveRgba() {
    const hex = this.hexString;
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    this.rgba = result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
          1
        ]
      : [0, 0, 0, 1];
  }

  toComplexNode() {
    const children = this.rgba
      .map((number) => {
        const valuesNode = new CompositeNode("repeat-composite", "values");
        valuesNode.children.push(new ValueNode("regex-value", "number", number.toString()));

        return valuesNode;
      })
      .reduce((acc, valueNode) => {
        acc.push(valueNode);
        acc.push(new ValueNode("regex-value", "divider", ", "));
        return acc;
      }, []);

    const node = new CompositeNode("and-composite", "method");
    const name = new ValueNode("regex-value", "name", "rgba");
    const openParen = new ValueNode("literal", "open-paren", "(");
    const args = new CompositeNode("repeat-composite", "arguments");
    const closeParen = new ValueNode("literal", "close-paren", ")");

    args.children = children;

    node.children.push(name, openParen, args, closeParen);

    return node;
  }

  toValueNode() {
    return new ValueNode("hex", this.hexString);
  }

  toRgbString() {
    return `rgb(${this.rgba[0]},${this.rgba[1]},${this.rgba[2]})`;
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
    const rgbArray = this.rgba;
    const red = this.numberToHex(rgbArray[0]);
    const green = this.numberToHex(rgbArray[1]);
    const blue = this.numberToHex(rgbArray[2]);

    return `#${red}${green}${blue}`;
  }
}
