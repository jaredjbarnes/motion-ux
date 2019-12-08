const emptyFn = () => {};

export default class Visitor {
  constructor(callback) {
    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
  }

  walkUp(node) {
    if (Array.isArray(node.children)) {
      node.children.forEach(child => {
        this.walkUp(child);
      });
    }

    this.callback(node);
  }

  visitUp(node) {
    this.walkUp(node);
  }

  walkDown(node) {
    this.callback(node);

    if (Array.isArray(node.children)) {
      node.children.forEach(child => {
        this.walkDown(child);
      });
    }
  }

  visitDown(node) {
    this.walkDown(node);
  }
}
