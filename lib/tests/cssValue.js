"use strict";

var _clarityPatternParser = require("clarity-pattern-parser");

var _cssValue = _interopRequireDefault(require("../patterns/cssValue.js"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["cssValue: single unit"] = function () {
  var cursor = new _clarityPatternParser.Cursor("0px");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[0].children[1].name, "unit-type");

  _assert.default.equal(node.children[0].children[0].children[0].value, "0");

  _assert.default.equal(node.children[0].children[0].children[1].value, "px");
};

exports["cssValue: multiple units"] = function () {
  var cursor = new _clarityPatternParser.Cursor("0px 0px");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[0].children[1].name, "unit-type");

  _assert.default.equal(node.children[0].children[0].children[0].value, "0");

  _assert.default.equal(node.children[0].children[0].children[1].value, "px");

  _assert.default.equal(node.children[0].children[2].children[0].name, "number");

  _assert.default.equal(node.children[0].children[2].children[1].name, "unit-type");

  _assert.default.equal(node.children[0].children[2].children[0].value, "0");

  _assert.default.equal(node.children[0].children[2].children[1].value, "px");
};

exports["cssValue: three hex"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#000");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "hex");

  _assert.default.equal(node.children[0].children[0].value, "#000");
};

exports["cssValue: six hex"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#000000");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "hex");

  _assert.default.equal(node.children[0].children[0].value, "#000000");
};

exports["cssValue: single name string"] = function () {
  var cursor = new _clarityPatternParser.Cursor("left");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[0].value, "left");
};

exports["cssValue: mulitple name string"] = function () {
  var cursor = new _clarityPatternParser.Cursor("top left");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[0].value, "top");

  _assert.default.equal(node.children[0].children[2].name, "name");

  _assert.default.equal(node.children[0].children[2].value, "left");
};

exports["cssValue: empty method"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate()");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[0].children[2].name, "close-paren");
};

exports["cssValue: method, one argument"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate(0px)");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[0].children[2].name, "arguments");

  _assert.default.equal(node.children[0].children[0].children[3].name, "close-paren");

  _assert.default.equal(node.children[0].children[0].children[2].children[0].name, "values");

  _assert.default.equal(node.children[0].children[0].children[2].children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[0].children[2].children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[0].children[2].children[0].children[0].children[1].name, "unit-type");
};

exports["cssValue: method, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("translate(0px, 0px)");

  var node = _cssValue.default.parse(cursor);

  _assert.default.equal(node.name, "css-value");

  _assert.default.equal(node.children[0].children[0].name, "method");

  _assert.default.equal(node.children[0].children[0].children[0].name, "name");

  _assert.default.equal(node.children[0].children[0].children[1].name, "open-paren");

  _assert.default.equal(node.children[0].children[0].children[2].name, "arguments");

  _assert.default.equal(node.children[0].children[0].children[3].name, "close-paren");

  _assert.default.equal(node.children[0].children[0].children[2].children[0].name, "values");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].name, "unit");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[0].name, "number");

  _assert.default.equal(node.children[0].children[2].children[0].children[0].children[1].name, "unit-type");
};

exports["cssValue: method, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)");

  var node = _cssValue.default.parse(cursor);
};

exports["cssValue: multiple methods, mulitple arguments"] = function () {
  var cursor = new _clarityPatternParser.Cursor("linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)");

  var node = _cssValue.default.parse(cursor);
};

exports["cssValue: multiple methods, mulitple arguments, with other cssValue"] = function () {
  var cursor = new _clarityPatternParser.Cursor("#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)");

  var node = _cssValue.default.parse(cursor);
};

exports["cssValue: method rgba"] = function () {
  var cursor = new _clarityPatternParser.Cursor("rgba(0,0,0,0)");

  var node = _cssValue.default.parse(cursor);
};

exports["cssValue: svg path."] = function () {
  var cursor = new _clarityPatternParser.Cursor("M 0 0 C 0 0, 0 0, 0 0");
  var cursor2 = new _clarityPatternParser.Cursor("M 300 300 C 20 20, 10 10, 5 5");

  var node = _cssValue.default.parse(cursor);

  var node2 = _cssValue.default.parse(cursor2);
};
//# sourceMappingURL=cssValue.js.map