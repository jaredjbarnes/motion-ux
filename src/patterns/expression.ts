import { AndComposite, OrComposite, RegexValue } from "clarity-pattern-parser";
import spaces from "./spaces";
import unit from "./unit";
import method from "./method";

const operator = new RegexValue("operator", "[\\+\\-\\*\\/]");
const value = new OrComposite("value", [unit, method]);
const expression = new AndComposite("expression", [
  value,
  spaces,
  operator,
  spaces,
  value,
]);

export default expression;
