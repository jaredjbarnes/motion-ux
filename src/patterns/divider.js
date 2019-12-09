import {
  Literal,
  AndValue,
  OptionalValue
} from "clarity-pattern-parser";

import spaces from "./spaces.js";

const comma = new Literal("comma", ",");
const optionalSpaces = new OptionalValue(spaces);
const divider = new AndValue("divider", [
  optionalSpaces,
  comma,
  optionalSpaces
]);

export default divider;
