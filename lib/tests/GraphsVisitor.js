"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _GraphsVisitor = _interopRequireDefault(require("../GraphsVisitor.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _webpack = require("webpack");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["GraphsVisitor: Two nodes."] = function () {
  var nodeAVisits = [];
  var nodeBVisits = [];
  var visitor = new _GraphsVisitor.default(function (node1, node2) {
    if (!Array.isArray(node1.children)) {
      nodeAVisits.push(node1.value);
    }

    if (!Array.isArray(node2.children)) {
      nodeBVisits.push(node2.value);
    }
  });
  var composite = new _clarityPatternParser.CompositeNode("and-composite", "parent");
  var child1 = new _clarityPatternParser.ValueNode("value", "child", "Kendi");
  var child2 = new _clarityPatternParser.ValueNode("value", "child", "Aydri");
  composite.children.push(child1, child2);
  var clone = composite.clone();
  visitor.visitUp([composite, clone]);

  _assert.default.equal(nodeAVisits.join("|"), "Kendi|Aydri");

  _assert.default.equal(nodeBVisits.join("|"), "Kendi|Aydri");
};

exports["GraphsVisitor: Three nodes."] = function () {
  var nodeAVisits = [];
  var nodeBVisits = [];
  var nodeCVisits = [];
  var visitor = new _GraphsVisitor.default(function (node1, node2, node3) {
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
  var composite = new _clarityPatternParser.CompositeNode("and-composite", "parent");
  var child1 = new _clarityPatternParser.ValueNode("value", "child", "Kendi");
  var child2 = new _clarityPatternParser.ValueNode("value", "child", "Aydri");
  composite.children.push(child1, child2);
  var clone = composite.clone();
  var clone2 = composite.clone();
  visitor.visitUp([composite, clone, clone2]);

  _assert.default.equal(nodeAVisits.join("|"), "Kendi|Aydri");

  _assert.default.equal(nodeBVisits.join("|"), "Kendi|Aydri");

  _assert.default.equal(nodeCVisits.join("|"), "Kendi|Aydri");
};

exports["GraphsVisitor: Without callback."] = function () {
  var visitor = new _GraphsVisitor.default();
  var composite = new _clarityPatternParser.CompositeNode("and-composite", "parent");
  var child1 = new _clarityPatternParser.ValueNode("value", "child", "Kendi");
  var child2 = new _clarityPatternParser.ValueNode("value", "child", "Aydri");
  composite.children.push(child1, child2);
  visitor.visitDown(composite);
};
//# sourceMappingURL=GraphsVisitor.js.map