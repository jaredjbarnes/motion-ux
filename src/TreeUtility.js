import Visitor from "./Visitor.js";

const visitor = new Visitor();

export default class TreeUtility {
  areTreeStructuresEqual(nodeA, nodeB) {
    const nodeASequence = [];
    const nodeBSequence = [];

    visitor.setCallback(node => {
      nodeASequence.push(node.name);
    });
    visitor.visitDown(nodeA);

    visitor.setCallback(node => {
      nodeBSequence.push(node.name);
    });
    visitor.visitDown(nodeB);

    return nodeASequence.join("|") === nodeBSequence.join("|");
  }
}
