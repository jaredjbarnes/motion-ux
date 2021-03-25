import Visitor from "./Visitor";
import HexColor from "./HexColor";
import { Node } from "clarity-pattern-parser";

const filterOutSpaces = (child: Node) => child.name !== "optional-spaces";

export default class TreeNormalizer {
  public visitor: any;

  constructor() {
    this.visitNode = this.visitNode.bind(this);
    this.visitor = new Visitor(this.visitNode);
  }

  visitNode(node: Node) {
    if (Array.isArray(node.children)) {
      this.removeOptionalSpaces(node);
      this.replaceHex(node);
      this.removeUnnecessaryDividers(node);
      this.removeUnnecessaryValuesSpaces(node);
    }

    this.collapseWhiteSpace(node);
    this.removeSpacesAroundDividers(node);
  }

  collapseWhiteSpace(node: Node) {
    if (node.name === "spaces") {
      node.value = " ";
    }
  }

  removeSpacesAroundDividers(node: Node) {
    if (node.name === "divider") {
      node.value = node.value.trim() + " ";
    }
  }

  removeUnnecessaryDividers(node: Node) {
    const children = node.children;

    while (
      children.length > 0 &&
      children[children.length - 1].name === "divider"
    ) {
      children.pop();
    }
  }

  removeUnnecessaryValuesSpaces(node: Node) {
    const children = node.children;

    while (
      node.name === "values" &&
      children.length > 0 &&
      children[children.length - 1].name === "spaces"
    ) {
      children.pop();
    }
  }

  removeOptionalSpaces(node: Node) {
    node.children = node.children.filter(filterOutSpaces);
  }

  replaceHex(node: Node) {
    node.children = node.children.map((child) => {
      if (child.name === "hex") {
        const hexColor = new HexColor(child.value);
        return hexColor.toComplexNode();
      }
      return child;
    });
  }

  normalize(node: Node) {
    this.visitor.visitDown(node);
    return node;
  }
}
