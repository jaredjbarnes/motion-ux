import { Node } from "clarity-pattern-parser";
import Visitor from "./Visitor";

const visitor = new Visitor();

function convertNumberNode(node: Node) {
  if (node.name === "number") {
    (node as any).value = Number(node.value);
  }
}

// Hashing function, this may not be the best. So this may need to be replaced.
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export default class TreeUtility {
  areTreeStructuresEqual(nodeA: Node, nodeB: Node) {
    const nodeASequence = this.sequence(nodeA);
    const nodeBSequence = this.sequence(nodeB);
    return nodeASequence === nodeBSequence;
  }

  sequence(node: Node) {
    const sequence: string[] = [];
    visitor.setCallback((node: Node) => {
      sequence.push(node.name);
    });
    visitor.visitDown(node);

    return sequence.join("|");
  }

  sequenceHash(node: Node) {
    return hash(this.sequence(node));
  }

  convertNumberNodesToNumberValues(node: Node) {
    visitor.setCallback(convertNumberNode);
    visitor.visitDown(node);
  }
}
