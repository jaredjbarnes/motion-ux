import { Node } from "clarity-pattern-parser";
export default class GraphOperations {
    constructor();
    add(nodes: Node[]): void;
    subtract(nodes: Node[]): void;
    multiply(nodes: Node[]): void;
    divide(nodes: Node[]): void;
    isNumberNode(nodes: Node[]): boolean;
    canOperate(nodes: Node[]): boolean;
}
