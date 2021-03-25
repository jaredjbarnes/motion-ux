import {
  Literal,
  AndComposite,
  RepeatComposite,
  RecursivePattern,
  OptionalComposite
} from "clarity-pattern-parser";

import name from "./name";
import optionalSpaces from "./optionalSpaces";
import divider from "./divider";

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
