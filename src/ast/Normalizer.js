export class Normalizer {
  constructor(visitor) {
    this.visitor = visitor;
    this.node = null;
  }

  visit() {
    return typeof this.visitor[this.node.name] === "function";
  }

  hasVisitor() {
    this.visitor[this.node.name](this.node);
  }

  normalize(node) {
    this.node = node;

    if (Array.isArray(node.children)) {
      node.children.forEach(child => this.normalize(child));
      this.node = node;
    }

    if (this.hasVisitor()) {
      this.visit();
    }
  }

  static normalize(visitor, node){
    return new Normalizer(visitor).normalize(node);
  }
}
