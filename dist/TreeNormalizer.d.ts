import { Node } from "clarity-pattern-parser";
export default class TreeNormalizer {
    constructor();
    visitNode(node: Node): void;
    collapseWhiteSpace(node: Node): void;
    removeSpacesAroundDividers(node: Node): void;
    removeUnnecessaryDividers(node: Node): void;
    removeUnnecessaryValuesSpaces(node: Node): void;
    removeOptionalSpaces(node: Node): void;
    replaceHex(node: Node): void;
    normalize(node: Node): Node;
}
