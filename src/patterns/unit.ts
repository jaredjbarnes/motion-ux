import { AndComposite, RegexValue } from "clarity-pattern-parser";

import number from "./number";

const unitType = new RegexValue("unit-type", "[a-zA-Z%]+");
const unit = new AndComposite("unit", [number, unitType]);

export default unit;
