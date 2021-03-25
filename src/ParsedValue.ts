import cssValue from "./patterns/cssValue";
import TreeNormalizer from "./TreeNormalizer";
import TreeUtility from "./TreeUtility";
import { Cursor, Node } from "clarity-pattern-parser";

const treeUtility = new TreeUtility();
const treeNormalizer = new TreeNormalizer();

export default class ParsedValue {
  public value: string;
  public graph: Node;
  public graphHash: string;

  constructor(value: string, graph?: Node, graphHash?: string) {
    this.value = value;

    if (typeof graph === "undefined") {
      const node = cssValue.parse(new Cursor(value));
      if (node == null) {
        throw new Error("Couldn't parse css value.");
      }

      this.graph = treeNormalizer.normalize(node);
      treeUtility.convertNumberNodesToNumberValues(this.graph);
    } else {
      this.graph = graph;
    }

    if (typeof graphHash === "undefined") {
      this.graphHash = treeUtility.sequenceHash(this.graph).toString();
    } else {
      this.graphHash = graphHash;
    }
  }

  clone() {
    return new ParsedValue(this.value, this.graph.clone(), this.graphHash);
  }
}
