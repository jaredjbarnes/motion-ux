import { Node } from "clarity-pattern-parser";
export default class ParsedValue {
    value: string;
    graph: Node;
    graphHash: string;
    constructor(value: string, graph?: Node, graphHash?: string);
    clone(): ParsedValue;
}
