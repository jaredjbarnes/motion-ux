"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _GraphsVisitor = _interopRequireDefault(require("../GraphsVisitor.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _webpack = require("webpack");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

exports["GraphsVisitor: Two nodes."] = function () {
  var nodeAVisits = [];
  var nodeBVisits = [];
  var visitor = new _GraphsVisitor.default(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node1 = _ref2[0],
        node2 = _ref2[1];

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
  var visitor = new _GraphsVisitor.default(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 3),
        node1 = _ref4[0],
        node2 = _ref4[1],
        node3 = _ref4[2];

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