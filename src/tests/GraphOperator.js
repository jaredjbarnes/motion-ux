import assert from "assert";
import GraphOperator from "../GraphOperator.js";
import ParsedValue from "../ParsedValue.js";

exports["GraphOperator: Add"] = () => {
  const left = new ParsedValue("rgba(100,100,100,0.5)");
  const right = new ParsedValue("rgba(100,100,100,0)");
  const result = right.clone();

  const graphs = [left.graph, right.graph, result.graph];

  const graphOperator = new GraphOperator();
  graphOperator.add(graphs);

  const stringResult = result.graph.toString();

  assert.strictEqual(stringResult, "rgba(200, 200, 200, 0.5)");
};

exports["GraphOperator: Subtract"] = () => {
  const left = new ParsedValue("rgba(100,100,100,0.5)");
  const right = new ParsedValue("rgba(100,100,100,0)");
  const result = right.clone();

  const graphs = [left.graph, right.graph, result.graph];

  const graphOperator = new GraphOperator();
  graphOperator.subtract(graphs);

  const stringResult = result.graph.toString();

  assert.strictEqual(stringResult, "rgba(0, 0, 0, 0.5)");
};

exports["GraphOperator: Multiply"] = () => {
  const left = new ParsedValue("rgba(2,2,2,0.5)");
  const right = new ParsedValue("rgba(2,2,2,0)");
  const result = right.clone();

  const graphs = [left.graph, right.graph, result.graph];

  const graphOperator = new GraphOperator();
  graphOperator.multiply(graphs);

  const stringResult = result.graph.toString();

  assert.strictEqual(stringResult, "rgba(4, 4, 4, 0)");
};

exports["GraphOperator: Divide"] = () => {
  const left = new ParsedValue("rgba(2,2,2,0.5)");
  const right = new ParsedValue("rgba(2,2,2,1)");
  const result = right.clone();

  const graphs = [left.graph, right.graph, result.graph];

  const graphOperator = new GraphOperator();
  graphOperator.divide(graphs);

  const stringResult = result.graph.toString();

  assert.strictEqual(stringResult, "rgba(1, 1, 1, 0.5)");
};

exports["GraphOperator: assign"] = () => {
  const left = new ParsedValue("rgba(2,2,2,1)");

  const graphOperator = new GraphOperator();
  graphOperator.assign(left.graph, 1);

  const stringResult = left.graph.toString();

  assert.strictEqual(stringResult, "rgba(1, 1, 1, 1)");
};
