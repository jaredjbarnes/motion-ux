export default class GraphOperations {
  constructor() {
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
  }

  add(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value + rightNode.value;
    }
  }

  subtract(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value - rightNode.value;
    }
  }

  multiply(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value * rightNode.value;
    }
  }

  divide(nodes) {
    if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
      const leftNode = nodes[0];
      const rightNode = nodes[1];
      const resultNode = nodes[2];

      resultNode.value = leftNode.value / rightNode.value;
    }
  }

  isNumberNode(nodes) {
    return nodes[0].name === "number";
  }

  canOperate(nodes) {
    return nodes.length === 3;
  }
}
