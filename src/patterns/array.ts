import divider from "./divider";
import number from "./number";
import optionalSpaces from "./optionalSpaces";

import {
  Literal,
  AndComposite,
  RepeatComposite,
} from "clarity-pattern-parser";

const openBracket = new Literal("open-square-bracket", "[");
const closeBracket = new Literal("close-square-bracket", "]");
const items = new RepeatComposite("items", number, divider);

const array = new AndComposite("array", [
  openBracket,
  optionalSpaces,
  items,
  optionalSpaces,
  closeBracket,
]);

export default array;
