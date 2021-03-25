import { Node } from "clarity-pattern-parser";
export default class TreeUtility {
    areTreeStructuresEqual(nodeA: Node, nodeB: Node): boolean;
    sequence(node: Node): string;
    sequenceHash(node: Node): number;
    convertNumberNodesToNumberValues(node: Node): void;
}
