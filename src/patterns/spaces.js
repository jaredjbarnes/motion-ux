import { Literal, RepeatValue } from "clarity-pattern-parser";

const space = new Literal("space", " ");
const spaces = new RepeatValue("spaces", space);

export default spaces;
