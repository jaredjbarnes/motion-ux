"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _SideBySideVisitor = _interopRequireDefault(require("../SideBySideVisitor.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _webpack = require("webpack");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["SideBySideVisitor: Two nodes."] = function () {
  var nodeAVisits = [];
  var nodeBVisits = [];
  var visitor = new _SideBySideVisitor.default(function (node1, node2) {
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

exports["SideBySideVisitor: Three nodes."] = function () {
  var nodeAVisits = [];
  var nodeBVisits = [];
  var nodeCVisits = [];
  var visitor = new _SideBySideVisitor.default(function (node1, node2, node3) {
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

exports["SideBySideVisitor: Without callback."] = function () {
  var visitor = new _SideBySideVisitor.default();
  var composite = new _clarityPatternParser.CompositeNode("and-composite", "parent");
  var child1 = new _clarityPatternParser.ValueNode("value", "child", "Kendi");
  var child2 = new _clarityPatternParser.ValueNode("value", "child", "Aydri");
  composite.children.push(child1, child2);
  visitor.visitDown(composite);
};
//# sourceMappingURL=SideBySideVisitor.js.map