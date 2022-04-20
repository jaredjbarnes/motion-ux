import { OrComposite } from "clarity-pattern-parser";
import unit from "./unit";
import hex from "./hex";
import number from "./number";
import method from "./method";
import name from "./name";
import array from "./array";
import expression from "./expression";

const value = new OrComposite("value", [
  array,
  hex,
  expression,
  method,
  unit,
  number,
  name,
]);

export default value;
