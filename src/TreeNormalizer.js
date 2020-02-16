import Visitor from "./Visitor.js";

const filterOutSpaces = child => child.name !== "spaces";
const filterOutDividers = child => child.name !== "divider";

export default class TreeNormalizer {
  constructor() {
    this.removeSpacesVisitor = new Visitor(this.visitNode);
  }

  visitNode(node) {
    if (Array.isArray(node.children)) {
      node.children = node.children.filter(filterOutSpaces);
    }

    if (node.name === "css-value") {
      node.children = node.children.filter(filterOutDividers);
    }
  }

  normalize(node) {
    this.removeSpacesVisitor.visitDown(node);
  }
}
