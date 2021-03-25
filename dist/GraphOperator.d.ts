import { Node } from "clarity-pattern-parser";
export default class GraphOperator {
    graphsVisitor: any;
    visitor: any;
    graphOperations: any;
    constructor();
    assign(graph: Node, number: number): void;
    add(graphs: Node[]): void;
    subtract(graphs: Node[]): void;
    multiply(graphs: Node[]): void;
    divide(graphs: Node[]): void;
}
