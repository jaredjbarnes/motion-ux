import Visitor from "./Visitor.js";

export default class TreeNormalizer {
  constructor() {
    this.removeSpacesVisitor = new Visitor(node => {
      if (Array.isArray(node.children)) {
        node.children = node.children.filter(child => child.name !== "spaces");
      }

      if (node.name === "css-value") {
        node.children = node.children.filter(child => child.name !== "divider");
      }
    });
  }

  normalize(node) {
    this.removeSpacesVisitor.visitDown(node);
  }
}
