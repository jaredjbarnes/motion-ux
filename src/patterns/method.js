import {
  Literal,
  AndValue,
  RepeatValue,
  OptionalValue,
  AndComposite,
  RepeatComposite,
  RecursivePattern,
  OptionalComposite
} from "clarity-pattern-parser";

import name from "./name.js";

const comma = new Literal("comma", ",");
const space = new Literal("space", " ");
const spaces = new RepeatValue("spaces", space);
const optionalSpaces = new OptionalValue(spaces);
const divider = new AndValue("divider", [
  optionalSpaces,
  comma,
  optionalSpaces
]);
const openParen = new Literal("open-paren", "(");
const closeParen = new Literal("close-paren", ")");
const values = new RecursivePattern("values");
const args = new RepeatComposite("arguments", values, divider);
const optionalArgs = new OptionalComposite(args);

const method = new AndComposite("method", [
  name,
  openParen,
  optionalSpaces,
  optionalArgs,
  optionalSpaces,
  closeParen
]);

export default method;
