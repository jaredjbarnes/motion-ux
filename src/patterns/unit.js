import {
  Literal,
  AndComposite,
  OrValue,
  RepeatValue,
} from "clarity-pattern-parser";

import number from "./number.js";
import letter from "./letter.js";

const percent = new Literal("%", "%");
const character = new OrValue("character", [
  letter,
  percent
]);

const unitType = new RepeatValue("unit-type", character);
const unit = new AndComposite("unit", [number, unitType]);

export default unit;
