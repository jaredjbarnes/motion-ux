import { Cursor, OrComposite } from "clarity-pattern-parser";
import unit from "./unit";
import hex from "./hex";
import number from "./number";
import method from "./method";
import name from "./name";
import array from "./array";

const value = new OrComposite("value", [
  array,
  hex,
  method,
  unit,
  number,
  name,
]);

export default value;