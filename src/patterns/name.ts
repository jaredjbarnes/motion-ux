import { RegexValue } from "clarity-pattern-parser";

const name = new RegexValue("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

export default name;
