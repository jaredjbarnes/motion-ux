import TreeUtility from "./TreeUtility";
import { Node } from "clarity-pattern-parser";

const emptyFn = () => {};
const treeUtility = new TreeUtility();

type Visitor = (graphs: Node[]) => void;

export default class GraphsVisitor {
  private visitor: Visitor = emptyFn;

  constructor(callback: Visitor = emptyFn) {
    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  visitUp(graphs: Node[], optimized = false) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    if (!optimized) {
      const areEqual = siblings.every((sibling) =>
        treeUtility.areTreeStructuresEqual(node, sibling)
      );

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }
    }

    this.walkUp(graphs);
  }

  walkUp(graphs: Node[]) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const node = graphs[0];

    if (node.isComposite) {
      for (let index = 0; index < node.children.length; index++) {
        const childGraphs = graphs.map((node) => {
          return node.children[index];
        });
        this.walkUp(childGraphs);
      }
    }

    this.visitor(graphs);
  }

  visitDown(graphs: Node[], optimized = false) {
    if (!Array.isArray(graphs)) {
      return;
    }

    const siblings = graphs.slice(1);
    const node = graphs[0];

    if (!optimized) {
      const areEqual = siblings.every((sibling) =>
        treeUtility.areTreeStructuresEqual(node, sibling)
      );

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }
    }

    this.walkDown(graphs);
  }

  walkDown(graphs: Node[]) {
    if (!Array.isArray(graphs)) {
      return;
    }

    this.visitor(graphs);

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

  setCallback(visitor: Visitor) {
    if (typeof visitor === "function") {
      this.visitor = visitor;
    } else {
      this.visitor = emptyFn;
    }

    this.visitor = visitor;
  }
}
