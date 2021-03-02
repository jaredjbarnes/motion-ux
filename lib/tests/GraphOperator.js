"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _GraphOperator = _interopRequireDefault(require("../GraphOperator.js"));

var _ParsedValue = _interopRequireDefault(require("../ParsedValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["GraphOperator: Add"] = function () {
  var left = new _ParsedValue.default("rgba(100,100,100,0.5)");
  var right = new _ParsedValue.default("rgba(100,100,100,0)");
  var result = right.clone();
  var graphs = [left.graph, right.graph, result.graph];
  var graphOperator = new _GraphOperator.default();
  graphOperator.add(graphs);
  var stringResult = result.graph.toString();

  _assert.default.strictEqual(stringResult, "rgba(200, 200, 200, 0.5)");
};

exports["GraphOperator: Subtract"] = function () {
  var left = new _ParsedValue.default("rgba(100,100,100,0.5)");
  var right = new _ParsedValue.default("rgba(100,100,100,0)");
  var result = right.clone();
  var graphs = [left.graph, right.graph, result.graph];
  var graphOperator = new _GraphOperator.default();
  graphOperator.subtract(graphs);
  var stringResult = result.graph.toString();

  _assert.default.strictEqual(stringResult, "rgba(0, 0, 0, 0.5)");
};

exports["GraphOperator: Multiply"] = function () {
  var left = new _ParsedValue.default("rgba(2,2,2,0.5)");
  var right = new _ParsedValue.default("rgba(2,2,2,0)");
  var result = right.clone();
  var graphs = [left.graph, right.graph, result.graph];
  var graphOperator = new _GraphOperator.default();
  graphOperator.multiply(graphs);
  var stringResult = result.graph.toString();

  _assert.default.strictEqual(stringResult, "rgba(4, 4, 4, 0)");
};

exports["GraphOperator: Divide"] = function () {
  var left = new _ParsedValue.default("rgba(2,2,2,0.5)");
  var right = new _ParsedValue.default("rgba(2,2,2,1)");
  var result = right.clone();
  var graphs = [left.graph, right.graph, result.graph];
  var graphOperator = new _GraphOperator.default();
  graphOperator.divide(graphs);
  var stringResult = result.graph.toString();

  _assert.default.strictEqual(stringResult, "rgba(1, 1, 1, 0.5)");
};

exports["GraphOperator: assign"] = function () {
  var left = new _ParsedValue.default("rgba(2,2,2,1)");
  var graphOperator = new _GraphOperator.default();
  graphOperator.assign(left.graph, 1);
  var stringResult = left.graph.toString();

  _assert.default.strictEqual(stringResult, "rgba(1, 1, 1, 1)");
};
//# sourceMappingURL=GraphOperator.js.map