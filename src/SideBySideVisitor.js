import TreeUtility from "./TreeUtility.js";

const emptyFn = () => {};
const treeUtility = new TreeUtility();

export default class SideBySideVisitor {
  constructor(callback) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  visitUp(nodes) {
    if (!Array.isArray(nodes)) {
      return;
    }

    const siblings = nodes.slice(1);
    const node = nodes[0];

    const areEqual = siblings.every((sibling) =>
      treeUtility.areTreeStructuresEqual(node, sibling)
    );

    if (!areEqual) {
      throw new Error("The nodes structures need to be the same.");
    }

    this.walkUp(nodes);
  }

  walkUp(nodes) {
    if (!Array.isArray(nodes)) {
      return;
    }

    const node = nodes[0];

    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childNodes = nodes.map((node) => {
          return node.children[index];
        });
        this.walkUp(childNodes);
      }
    }

    this.callback(...nodes);
  }

  visitDown(nodes) {
    if (!Array.isArray(nodes)) {
      return;
    }

    const siblings = nodes.slice(1);
    const node = nodes[0];

    const areEqual = siblings.every((sibling) =>
      treeUtility.areTreeStructuresEqual(node, sibling)
    );

    if (!areEqual) {
      throw new Error("The nodes structures need to be the same.");
    }

    this.walkDown(nodes);
  }

  walkDown(nodes) {
    if (!Array.isArray(nodes)) {
      return;
    }

    this.callback(...nodes);

    const node = nodes[0];
    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childNodes = nodes.map((node) => {
          return node.children[index];
        });
        this.walkDown(childNodes);
      }
    }
  }

  setCallback(callback) {
    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
  }
}
