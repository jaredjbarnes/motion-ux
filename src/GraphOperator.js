import GraphOperations from "./GraphOperations.js";
import GraphsVisitor from "./GraphsVisitor.js";
import Visitor from "./Visitor.js";

export default class GraphOperator {
  constructor() {
    this.graphsVisitor = new GraphsVisitor();
    this.visitor = new Visitor();
    this.graphOperations = new GraphOperations();
  }

  assign(graph, number) {
    this.visitor.setCallback((node) => {
      if (node.name === "number") {
        node.value = number;
      }
    });

    this.visitor.visitDown(graph);
  }

  add(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.add);
    this.graphsVisitor.visitDown(graphs);
  }

  subtract(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.subtract);
    this.graphsVisitor.visitDown(graphs);
  }

  multiply(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.multiply);
    this.graphsVisitor.visitDown(graphs);
  }

  divide(graphs) {
    this.graphsVisitor.setCallback(this.graphOperations.divide);
    this.graphsVisitor.visitDown(graphs);
  }
}
