import { RepeatComposite } from "clarity-pattern-parser";
import divider from "./divider";
import values from "./values";

const cssValue = new RepeatComposite("css-value", values, divider);

export default cssValue;
