"use strict";

var _clarityPatternParser = require("clarity-pattern-parser");

var _values = _interopRequireDefault(require("../patterns/values.js"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Patterns: single unit"] = function () {
  var cursor = new _clarityPatternParser.Cursor("0px");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "unit");

  _assert.default.equal(node.children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[1].name, "unit-type");

  _assert.default.equal(node.children[0].children[0].value, "0");

  _assert.default.equal(node.children[0].children[1].value, "px");
};

exports["Patterns: multiple units"] = function () {
  var cursor = new _clarityPatternParser.Cursor("0px 0px");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "unit");

  _assert.default.equal(node.children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[1].name, "unit-type");

  _assert.default.equal(node.children[0].children[0].value, "0");

  _assert.default.equal(node.children[0].children[1].value, "px");

  _assert.default.equal(node.children[2].children[0].name, "number");

  _assert.default.equal(node.children[2].children[1].name, "unit-type");

  _assert.default.equal(node.children[2].children[0].value, "0");

  _assert.default.equal(node.children[2].children[1].value, "px");
};

exports["Patterns: three hex"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#000");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "hex");

  _assert.default.equal(node.children[0].value, "#000");
};

exports["Patterns: six hex"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#000000");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "hex");

  _assert.default.equal(node.children[0].value, "#000000");
};

exports["Patterns: single name string"] = function () {
  var cursor = new _clarityPatternParser.Cursor("left");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "name");

  _assert.default.equal(node.children[0].value, "left");
};

exports["Patterns: mulitple name string"] = function () {
  var cursor = new _clarityPatternParser.Cursor("top left");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "name");

  _assert.default.equal(node.children[0].value, "top");

  _assert.default.equal(node.children[2].name, "name");

  _assert.default.equal(node.children[2].value, "left");
};

exports["Patterns: empty method"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate()");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[2].name, "close-paren");
};

exports["Patterns: method, one argument"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate(0px)");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[2].name, "arguments");

  _assert.default.equal(node.children[0].children[3].name, "close-paren");

  _assert.default.equal(node.children[0].children[2].children[0].name, "values");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[1].name, "unit-type");
};

exports["Patterns: method, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate(0px, 0px)");

  var node = _values.default.parse(cursor);

  _assert.default.equal(node.name, "values");

  _assert.default.equal(node.children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[2].name, "arguments");

  _assert.default.equal(node.children[0].children[3].name, "close-paren");

  _assert.default.equal(node.children[0].children[2].children[0].name, "values");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[1].name, "unit-type");
};

exports["Patterns: method, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)");

  var node = _values.default.parse(cursor);
};

exports["Patterns: multiple methods, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)");

  var node = _values.default.parse(cursor);
};

exports["Patterns: multiple methods, mulitple arguments, with other values"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)");

  var node = _values.default.parse(cursor);
};

exports["Patterns: method rgba"] = function () {
  var cursor = new _clarityPatternParser.Cursor("rgba(0,0,0,0)");

  var node = _values.default.parse(cursor);
};
//# sourceMappingURL=values.js.map