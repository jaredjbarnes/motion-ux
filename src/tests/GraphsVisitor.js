import assert from "assert";
import GraphsVisitor from "../GraphsVisitor.js";
import { CompositeNode, ValueNode } from "clarity-pattern-parser";
import { node } from "webpack";

exports["GraphsVisitor: Two nodes."] = () => {
  const nodeAVisits = [];
  const nodeBVisits = [];

  const visitor = new GraphsVisitor(([node1, node2]) => {
    if (!Array.isArray(node1.children)) {
      nodeAVisits.push(node1.value);
    }

    if (!Array.isArray(node2.children)) {
      nodeBVisits.push(node2.value);
    }
  });

  const composite = new CompositeNode("and-composite", "parent");
  const child1 = new ValueNode("value", "child", "Kendi");
  const child2 = new ValueNode("value", "child", "Aydri");

  composite.children.push(child1, child2);

  const clone = composite.clone();

  visitor.visitUp([composite, clone]);

  assert.equal(nodeAVisits.join("|"), "Kendi|Aydri");
  assert.equal(nodeBVisits.join("|"), "Kendi|Aydri");
};

exports["GraphsVisitor: Three nodes."] = () => {
  const nodeAVisits = [];
  const nodeBVisits = [];
  const nodeCVisits = [];

  const visitor = new GraphsVisitor(([node1, node2, node3]) => {
    if (!Array.isArray(node1.children)) {
      nodeAVisits.push(node1.value);
    }

    if (!Array.isArray(node2.children)) {
      nodeBVisits.push(node2.value);
    }

    if (!Array.isArray(node3.children)) {
      nodeCVisits.push(node3.value);
    }
  });

  const composite = new CompositeNode("and-composite", "parent");
  const child1 = new ValueNode("value", "child", "Kendi");
  const child2 = new ValueNode("value", "child", "Aydri");

  composite.children.push(child1, child2);

  const clone = composite.clone();
  const clone2 = composite.clone();

  visitor.visitUp([composite, clone, clone2]);

  assert.equal(nodeAVisits.join("|"), "Kendi|Aydri");
  assert.equal(nodeBVisits.join("|"), "Kendi|Aydri");
  assert.equal(nodeCVisits.join("|"), "Kendi|Aydri");
};

exports["GraphsVisitor: Without callback."] = () => {
  const visitor = new GraphsVisitor();
  const composite = new CompositeNode("and-composite", "parent");
  const child1 = new ValueNode("value", "child", "Kendi");
  const child2 = new ValueNode("value", "child", "Aydri");

  composite.children.push(child1, child2);
  visitor.visitDown(composite);

};

