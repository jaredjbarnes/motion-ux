import { Node } from "clarity-pattern-parser";
import GraphOperations from "./GraphOperations";
import GraphsVisitor from "./GraphsVisitor";
import Visitor from "./Visitor";

export default class GraphOperator {
  public graphsVisitor: GraphsVisitor;
  public visitor: Visitor;
  public graphOperations: GraphOperations;

  constructor() {
    this.graphsVisitor = new GraphsVisitor();
    this.visitor = new Visitor();
    this.graphOperations = new GraphOperations();
  }

  assign(graph: Node, number: number) {
    this.visitor.setCallback((node: Node) => {
      if (node.name === "number") {
        (node as any).value = number;
      }
    });

    this.visitor.visitDown(graph);
  }

  add(graphs: Node[]) {
    this.graphsVisitor.setCallback(this.graphOperations.add);
    this.graphsVisitor.visitDown(graphs);
  }

  subtract(graphs: Node[]) {
    this.graphsVisitor.setCallback(this.graphOperations.subtract);
    this.graphsVisitor.visitDown(graphs);
  }

  multiply(graphs: Node[]) {
    this.graphsVisitor.setCallback(this.graphOperations.multiply);
    this.graphsVisitor.visitDown(graphs);
  }

  divide(graphs: Node[]) {
    this.graphsVisitor.setCallback(this.graphOperations.divide);
    this.graphsVisitor.visitDown(graphs);
  }

  invert(graph: Node) {
    const negativeOne = graph.clone();
    this.assign(negativeOne, -1);

    const graphs = [graph, negativeOne, graph];
    this.graphsVisitor.setCallback(this.graphOperations.multiply);
    this.graphsVisitor.visitDown(graphs);
  }
}
