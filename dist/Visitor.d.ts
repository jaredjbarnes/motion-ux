import { Node } from "clarity-pattern-parser";
export default class Visitor {
    callback: any;
    constructor(callback?: (node: Node) => void);
    walkUp(node: Node): void;
    visitUp(node: Node): void;
    walkDown(node: Node): void;
    visitDown(node: Node): void;
    setCallback(callback: (node: Node) => void): void;
}
