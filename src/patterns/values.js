import { RepeatComposite, Literal, RepeatValue } from "clarity-pattern-parser";
import value from "./value.js";

const space = new Literal("space", " ");
const spaces = new RepeatValue("spaces", space);
const values = new RepeatComposite("values", value, spaces);

export default values;
