import Visitor from "./Visitor.js";

export default class TreeNormalizer {
  constructor() {
    this.removeSpacesVisitor = new Visitor(node => {
      if (Array.isArray(node.children)) {
        node.children = node.children.filter(child => {
          return child.name !== "spaces";
        });
      }
    });
  }

  normalize(node) {
    this.removeSpacesVisitor.visitDown(node);
  }
}
