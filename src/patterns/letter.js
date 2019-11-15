import { AnyOfThese } from "../../node_modules/clarity-pattern-parser/src/index.js";

const letter = new AnyOfThese(
  "letter",
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

export default letter;
