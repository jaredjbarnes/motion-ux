import { RepeatComposite } from "clarity-pattern-parser";
import value from "./value";
import spaces from "./spaces";

const values = new RepeatComposite("values", value, spaces);

export default values;
