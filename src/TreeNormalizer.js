import Visitor from "./Visitor.js";
import HexColor from "./HexColor.js";

const filterOutSpaces = (child) => child.name !== "optional-spaces";

export default class TreeNormalizer {
  constructor() {
    this.visitNode = this.visitNode.bind(this);
    this.visitor = new Visitor(this.visitNode);
  }

  visitNode(node) {
    if (Array.isArray(node.children)) {
      this.removeOptionalSpaces(node);
      this.replaceHex(node);
      this.removeUnnecessaryDividers(node);
    }

  }

  removeUnnecessaryDividers(node) {
    const children = node.children;

    while (
      children.length > 0 &&
      children[children.length - 1].type === "divider"
    ) {
      children.pop();
    }
  }

  removeOptionalSpaces(node) {
    node.children = node.children.filter(filterOutSpaces);
  }

  replaceHex(node) {
    node.children = node.children.map((child) => {
      if (child.name === "hex") {
        const hexColor = new HexColor(child.value);
        return hexColor.toComplexNode();
      }
      return child;
    });
  }

  normalize(node) {
    this.visitor.visitDown(node);
    return node;
  }
}
