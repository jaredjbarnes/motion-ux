import { RegexValue } from "clarity-pattern-parser";

const number = new RegexValue(
  "number",
  "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?"
);

export default number;
