import { Literal, RepeatValue } from "clarity-pattern-parser";
import { OptionalValue } from "clarity-pattern-parser";

const space = new Literal("optional-space", " ");
const spaces = new RepeatValue("optional-spaces", space);
const optionalSpaces = new OptionalValue(spaces);

export default optionalSpaces;
