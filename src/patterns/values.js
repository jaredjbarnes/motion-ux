import { RepeatComposite } from "clarity-pattern-parser";
import value from "./value.js";
import spaces from "./spaces.js";

const values = new RepeatComposite("values", value, spaces);

export default values;
