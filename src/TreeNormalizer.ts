import HexColor from "./HexColor";
import { Node, Visitor } from "clarity-pattern-parser";

const filterOutSpaces = (child: Node) => child.name !== "optional-spaces";

export default class TreeNormalizer {
  constructor() {
    this.visitNode = this.visitNode.bind(this);
  }

  visitNode(node: Node) {
    if (node.isComposite) {
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
      node.value = node.value.trim();
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
    new Visitor(node, [node]).flatten();
    Visitor.walkDown(node, this.visitNode);

    const resultArray = node.children.map((node) => {
      if (node.name === "number") {
        return Number(node.value);
      }
      return node.value;
    });
    return node;
  }
}
