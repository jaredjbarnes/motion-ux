import { Cursor } from "clarity-pattern-parser";
import values from "../patterns/values.js";
import assert from "assert";

exports["Patterns: single unit"] = () => {
  const cursor = new Cursor("0px");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "unit");
  assert.equal(node.children[0].children[0].name, "number");
  assert.equal(node.children[0].children[1].name, "unit-type");
  assert.equal(node.children[0].children[0].value, "0");
  assert.equal(node.children[0].children[1].value, "px");
};

exports["Patterns: multiple units"] = () => {
  const cursor = new Cursor("0px 0px");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "unit");
  assert.equal(node.children[0].children[0].name, "number");
  assert.equal(node.children[0].children[1].name, "unit-type");
  assert.equal(node.children[0].children[0].value, "0");
  assert.equal(node.children[0].children[1].value, "px");

  assert.equal(node.children[2].children[0].name, "number");
  assert.equal(node.children[2].children[1].name, "unit-type");
  assert.equal(node.children[2].children[0].value, "0");
  assert.equal(node.children[2].children[1].value, "px");
};

exports["Patterns: three hex"] = () => {
  const cursor = new Cursor("#000");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "hex");
  assert.equal(node.children[0].value, "#000");
};

exports["Patterns: six hex"] = () => {
  const cursor = new Cursor("#000000");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "hex");
  assert.equal(node.children[0].value, "#000000");
};

exports["Patterns: single name string"] = () => {
  const cursor = new Cursor("left");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "name");
  assert.equal(node.children[0].value, "left");
};

exports["Patterns: mulitple name string"] = () => {
  const cursor = new Cursor("top left");

  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "name");
  assert.equal(node.children[0].value, "top");
  assert.equal(node.children[2].name, "name");
  assert.equal(node.children[2].value, "left");
};

exports["Patterns: empty method"] = () => {
  const cursor = new Cursor("translate()");
  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "method");
  assert.equal(node.children[0].children[0].name, "name");
  assert.equal(node.children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[2].name, "close-paren");
};

exports["Patterns: method, one argument"] = () => {
  const cursor = new Cursor("translate(0px)");
  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "method");
  assert.equal(node.children[0].children[0].name, "name");
  assert.equal(node.children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[2].name, "arguments");
  assert.equal(node.children[0].children[3].name, "close-paren");
  assert.equal(node.children[0].children[2].children[0].name, "values");
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

exports["Patterns: method, mulitple arguments"] = () => {
  const cursor = new Cursor("translate(0px, 0px)");
  const node = values.parse(cursor);

  assert.equal(node.name, "values");
  assert.equal(node.children[0].name, "method");
  assert.equal(node.children[0].children[0].name, "name");
  assert.equal(node.children[0].children[1].name, "open-paren");
  assert.equal(node.children[0].children[2].name, "arguments");
  assert.equal(node.children[0].children[3].name, "close-paren");
  assert.equal(node.children[0].children[2].children[0].name, "values");
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

exports["Patterns: method, mulitple arguments"] = () => {
  const cursor = new Cursor(
    "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)"
  );
  const node = values.parse(cursor);
};

exports["Patterns: multiple methods, mulitple arguments"] = () => {
  const cursor = new Cursor(
    "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
  );
  const node = values.parse(cursor);
};


exports["Patterns: multiple methods, mulitple arguments, with other values"] = () => {
    const cursor = new Cursor(
      "#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
    );
    const node = values.parse(cursor);
  };

  exports["Patterns: method rgba"] = () => {
    const cursor = new Cursor(
      "rgba(0,0,0,0)"
    );
    const node = values.parse(cursor);
  };
  