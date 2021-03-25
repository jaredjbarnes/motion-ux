import { Node } from "clarity-pattern-parser";

export default class GraphOperations {
  constructor() {
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
  }

  add(nodes: Node[]) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value + rightNode.value;
    }
  }

  subtract(nodes: Node[]) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      (resultNode as any).value =
        (leftNode as any).value - (rightNode as any).value;
    }
  }

  multiply(nodes: Node[]) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      (resultNode as any).value =
        (leftNode as any).value * (rightNode as any).value;
    }
  }

  divide(nodes: Node[]) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      (resultNode as any).value =
        (leftNode as any).value / (rightNode as any).value;
    }
  }

  isNumberNode(nodes: Node[]) {
    return nodes[0].name === "number";
  }

  canOperate(nodes: Node[]) {
    return nodes.length === 3;
  }
}
