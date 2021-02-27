import cssValue from "./patterns/cssValue.js";
import TreeNormalizer from "./TreeNormalizer.js";
import TreeUtility from "./TreeUtility.js";
import { Cursor } from "clarity-pattern-parser";

const treeUtility = new TreeUtility();
const treeNormalizer = new TreeNormalizer();

export default class ParsedValue {
  constructor(value, graph, graphHash) {
    this.value = value;

    if (typeof graph === "undefined") {
      this.graph = treeNormalizer.normalize(cssValue.parse(new Cursor(value)));
      treeUtility.convertNumberNodesToNumberValues(this.graph);
    } else {
      this.graph = graph;
    }

    if (typeof graphHash === "undefined") {
      this.graphHash = treeUtility.sequenceHash(this.graph);
    } else {
      this.graphHash = graphHash;
    }
  }

  clone() {
    return new ParsedValue(this.value, this.graph.clone(), this.graphHash);
  }
}
