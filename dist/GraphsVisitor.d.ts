import { Node } from "clarity-pattern-parser";
declare type Visitor = (graphs: Node[]) => void;
export default class GraphsVisitor {
    private visitor;
    constructor(callback?: Visitor);
    visitUp(graphs: Node[], optimized?: boolean): void;
    walkUp(graphs: Node[]): void;
    visitDown(graphs: Node[], optimized?: boolean): void;
    walkDown(graphs: Node[]): void;
    setCallback(visitor: Visitor): void;
}
export {};
