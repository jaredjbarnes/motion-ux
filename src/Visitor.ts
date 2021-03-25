import { Node } from "clarity-pattern-parser";

const emptyFn = () => {};

export default class Visitor {
  public callback: any;

  constructor(callback: (node: Node) => void = emptyFn) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  walkUp(node: Node) {
    if (node.isComposite) {
      node.children.forEach(this.visitUp);
    }

    this.callback(node);
  }

  visitUp(node: Node) {
    this.walkUp(node);
  }

  walkDown(node: Node) {
    this.callback(node);

    if (node.isComposite) {
      node.children.forEach(this.visitDown);
    }
  }

  visitDown(node: Node) {
    this.walkDown(node);
  }

  setCallback(callback: (node: Node) => void) {
    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
  }
}
