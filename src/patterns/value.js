import { OrComposite } from "clarity-pattern-parser";

import unit from "./unit.js";
import hex from "./hex.js";
import number from "./number";
import method from "./method.js";
import name from "./name.js"

const value = new OrComposite("value", [hex, method, unit, number, name]);

export default value;
