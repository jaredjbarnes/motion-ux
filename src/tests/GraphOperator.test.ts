import GraphOperator from "../GraphOperator";
import ParsedValue from "../ParsedValue";

describe("GraphOperator", () => {
  test("Add", () => {
    const left = new ParsedValue("rgba(100,100,100,0.5)");
    const right = new ParsedValue("rgba(100,100,100,0)");
    const result = right.clone();

    const graphs = [left.graph, right.graph, result.graph];

    const graphOperator = new GraphOperator();
    graphOperator.add(graphs);

    const stringResult = result.graph.toString();

    expect(stringResult).toBe("rgba(200,200,200,0.5)");
  });

  test("Subtract", () => {
    const left = new ParsedValue("rgba(100,100,100,0.5)");
    const right = new ParsedValue("rgba(100,100,100,0)");
    const result = right.clone();

    const graphs = [left.graph, right.graph, result.graph];

    const graphOperator = new GraphOperator();
    graphOperator.subtract(graphs);

    const stringResult = result.graph.toString();

    expect(stringResult).toBe("rgba(0,0,0,0.5)");
  });

  test("Multiply", () => {
    const left = new ParsedValue("rgba(2,2,2,0.5)");
    const right = new ParsedValue("rgba(2,2,2,0)");
    const result = right.clone();

    const graphs = [left.graph, right.graph, result.graph];

    const graphOperator = new GraphOperator();
    graphOperator.multiply(graphs);

    const stringResult = result.graph.toString();

    expect(stringResult).toBe("rgba(4,4,4,0)");
  });

  test("Divide", () => {
    const left = new ParsedValue("rgba(2,2,2,0.5)");
    const right = new ParsedValue("rgba(2,2,2,1)");
    const result = right.clone();

    const graphs = [left.graph, right.graph, result.graph];

    const graphOperator = new GraphOperator();
    graphOperator.divide(graphs);

    const stringResult = result.graph.toString();

    expect(stringResult).toBe("rgba(1,1,1,0.5)");
  });

  test("assign", () => {
    const left = new ParsedValue("rgba(2,2,2,1)");

    const graphOperator = new GraphOperator();
    graphOperator.assign(left.graph, 1);

    const stringResult = left.graph.toString();

    expect(stringResult).toBe("rgba(1,1,1,1)");
  });
});
