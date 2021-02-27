import TreeUtility from "./TreeUtility.js";

const emptyFn = () => {};
const treeUtility = new TreeUtility();

export default class GraphsVisitor {
  constructor(callback) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  visitUp(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    const areEqual = siblings.every((sibling) =>
      treeUtility.areTreeStructuresEqual(node, sibling)
    );

    if (!areEqual) {
      throw new Error("The nodes structures need to be the same.");
    }

    this.walkUp(graphs);
  }

  walkUp(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const node = graphs[0];

    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childGraphs = graphs.map((node) => {
          return node.children[index];
        });
        this.walkUp(childGraphs);
      }
    }

    this.callback(graphs);
  }

  visitDown(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    const areEqual = siblings.every((sibling) =>
      treeUtility.areTreeStructuresEqual(node, sibling)
    );

    if (!areEqual) {
      throw new Error("The nodes structures need to be the same.");
    }

    this.walkDown(graphs);
  }

  walkDown(graphs) {
    if (!Array.isArray(graphs)) {
      return;
    }

    this.callback(graphs);

    const node = graphs[0];
    if (Array.isArray(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        const childGraphs = graphs.map((node) => {
          return node.children[index];
        });
        this.walkDown(childGraphs);
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
