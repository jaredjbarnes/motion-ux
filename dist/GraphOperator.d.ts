import { Node } from "clarity-pattern-parser";
import GraphOperations from "./GraphOperations";
import GraphsVisitor from "./GraphsVisitor";
import Visitor from "./Visitor";
export default class GraphOperator {
    graphsVisitor: GraphsVisitor;
    visitor: Visitor;
    graphOperations: GraphOperations;
    constructor();
    assign(graph: Node, number: number): void;
    add(graphs: Node[]): void;
    subtract(graphs: Node[]): void;
    multiply(graphs: Node[]): void;
    divide(graphs: Node[]): void;
    invert(graph: Node): void;
}
