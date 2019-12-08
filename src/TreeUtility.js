import Visitor from "./Visitor.js";

export default class TreeUtility {
    areTreeStructuresEqual(nodeA, nodeB){
        const nodeASequence = [];
        const nodeBSequence = [];

        const nodeAVisitor = new Visitor((node)=>{
            nodeASequence.push(node.name);
        });
        nodeAVisitor.visitDown(nodeA);

        const nodeBVisitor = new Visitor((node)=>{
            nodeBSequence.push(node.name);
        });
        nodeBVisitor.visitDown(nodeB);

        return nodeASequence.join("|") === nodeBSequence.join("|");
    }
}