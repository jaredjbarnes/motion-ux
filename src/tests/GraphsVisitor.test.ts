import GraphsVisitor from "../GraphsVisitor";
import { CompositeNode, ValueNode } from "clarity-pattern-parser";

describe("GraphsVisitor", () => {
  test("Two nodes.", () => {
    const nodeAVisits: string[] = [];
    const nodeBVisits: string[] = [];

    const visitor = new GraphsVisitor(([node1, node2]) => {
      if (!node1.isComposite) {
        nodeAVisits.push(node1.value);
      }

      if (!node2.isComposite) {
        nodeBVisits.push(node2.value);
      }
    });

    const composite = new CompositeNode("and-composite", "parent");
    const child1 = new ValueNode("value", "child", "Kendi");
    const child2 = new ValueNode("value", "child", "Aydri");

    composite.children.push(child1, child2);

    const clone = composite.clone();

    visitor.visitUp([composite, clone]);

    expect(nodeAVisits.join("|")).toBe("Kendi|Aydri");
    expect(nodeBVisits.join("|")).toBe("Kendi|Aydri");
  });

  test("Three nodes.", () => {
    const nodeAVisits: string[] = [];
    const nodeBVisits: string[] = [];
    const nodeCVisits: string[] = [];

    const visitor = new GraphsVisitor(([node1, node2, node3]) => {
      if (!node1.isComposite) {
        nodeAVisits.push(node1.value);
      }

      if (!node2.isComposite) {
        nodeBVisits.push(node2.value);
      }

      if (!node3.isComposite) {
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

    expect(nodeAVisits.join("|")).toBe("Kendi|Aydri");
    expect(nodeBVisits.join("|")).toBe("Kendi|Aydri");
    expect(nodeCVisits.join("|")).toBe("Kendi|Aydri");
  });

  test("Without callback.", () => {
    const visitor = new GraphsVisitor();
    const composite = new CompositeNode("and-composite", "parent");
    const child1 = new ValueNode("value", "child", "Kendi");
    const child2 = new ValueNode("value", "child", "Aydri");

    composite.children.push(child1, child2);
    (visitor as any).visitDown(composite);
  });
});
