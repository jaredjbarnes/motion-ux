import { Cursor } from "clarity-pattern-parser";
import cssValue from "../patterns/cssValue.js";
import assert from "assert";

exports["cssValue: single unit"] = () => {
  const cursor = new Cursor("0px");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "unit");
  assert.equal(node.children[0].children[0].children[0].name, "number");
  assert.equal(node.children[0].children[0].children[1].name, "unit-type");
  assert.equal(node.children[0].children[0].children[0].value, "0");
  assert.equal(node.children[0].children[0].children[1].value, "px");
};

exports["cssValue: multiple units"] = () => {
  const cursor = new Cursor("0px 0px");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "unit");
  assert.equal(node.children[0].children[0].children[0].name, "number");
  assert.equal(node.children[0].children[0].children[1].name, "unit-type");
  assert.equal(node.children[0].children[0].children[0].value, "0");
  assert.equal(node.children[0].children[0].children[1].value, "px");

  assert.equal(node.children[0].children[2].children[0].name, "number");
  assert.equal(node.children[0].children[2].children[1].name, "unit-type");
  assert.equal(node.children[0].children[2].children[0].value, "0");
  assert.equal(node.children[0].children[2].children[1].value, "px");
};

exports["cssValue: three hex"] = () => {
  const cursor = new Cursor("#000");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "hex");
  assert.equal(node.children[0].children[0].value, "#000");
};

exports["cssValue: six hex"] = () => {
  const cursor = new Cursor("#000000");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "hex");
  assert.equal(node.children[0].children[0].value, "#000000");
};

exports["cssValue: single name string"] = () => {
  const cursor = new Cursor("left");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "name");
  assert.equal(node.children[0].children[0].value, "left");
};

exports["cssValue: mulitple name string"] = () => {
  const cursor = new Cursor("top left");

  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "name");
  assert.equal(node.children[0].children[0].value, "top");
  assert.equal(node.children[0].children[2].name, "name");
  assert.equal(node.children[0].children[2].value, "left");
};

exports["cssValue: empty method"] = () => {
  const cursor = new Cursor("translate()");
  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "method");
  assert.equal(node.children[0].children[0].children[0].name, "name");
  assert.equal(node.children[0].children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[0].children[2].name, "close-paren");
};

exports["cssValue: method, one argument"] = () => {
  const cursor = new Cursor("translate(0px)");
  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "method");
  assert.equal(node.children[0].children[0].children[0].name, "name");
  assert.equal(node.children[0].children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[0].children[2].name, "arguments");
  assert.equal(node.children[0].children[0].children[3].name, "close-paren");
  assert.equal(
    node.children[0].children[0].children[2].children[0].name,
    "values"
  );
  assert.equal(
    node.children[0].children[0].children[2].children[0].children[0].name,
    "unit"
  );
  assert.equal(
    node.children[0].children[0].children[2].children[0].children[0].children[0]
      .name,
    "number"
  );
  assert.equal(
    node.children[0].children[0].children[2].children[0].children[0].children[1]
      .name,
    "unit-type"
  );
};

exports["cssValue: method, mulitple arguments"] = () => {
  const cursor = new Cursor("translate(0px, 0px)");
  const node = cssValue.parse(cursor);

  assert.equal(node.name, "css-value");
  assert.equal(node.children[0].children[0].name, "method");
  assert.equal(node.children[0].children[0].children[0].name, "name");
  assert.equal(node.children[0].children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[0].children[2].name, "arguments");
  assert.equal(node.children[0].children[0].children[3].name, "close-paren");
  assert.equal(
    node.children[0].children[0].children[2].children[0].name,
    "values"
  );
  assert.equal(
    node.children[0].children[2].children[0].children[0].name,
    "unit"
  );
  assert.equal(
    node.children[0].children[2].children[0].children[0].children[0].name,
    "number"
  );
  assert.equal(
    node.children[0].children[2].children[0].children[0].children[1].name,
    "unit-type"
  );
};

exports["cssValue: method, mulitple arguments"] = () => {
  const cursor = new Cursor(
    "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)"
  );
  const node = cssValue.parse(cursor);
};

exports["cssValue: multiple methods, mulitple arguments"] = () => {
  const cursor = new Cursor(
    "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
  );
  const node = cssValue.parse(cursor);
};

exports[
  "cssValue: multiple methods, mulitple arguments, with other cssValue"
] = () => {
  const cursor = new Cursor(
    "#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
  );
  const node = cssValue.parse(cursor);
};

exports["cssValue: method rgba"] = () => {
  const cursor = new Cursor("rgba(0,0,0,0)");
  const node = cssValue.parse(cursor);
};

exports["cssValue: simple svg path."] = () => {
  const cursor = new Cursor("M 0 0 C 0 0, 0 0, 0 0");
  const cursor2 = new Cursor("M 300 300 C 20 20, 10 10, 5 5");

  const node = cssValue.parse(cursor);
  const node2 = cssValue.parse(cursor2);
};


exports["cssValue: complex svg path."] = () => {
  const cursor = new Cursor("M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10");
  const cursor2 = new Cursor("M 300 300 C 20 20, 10 10, 5 5");

  const node = cssValue.parse(cursor);
  const node2 = cssValue.parse(cursor2);
};

