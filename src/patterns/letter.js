import { AnyOfThese } from "clarity-pattern-parser";

const letter = new AnyOfThese(
  "letter",
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

export default letter;
