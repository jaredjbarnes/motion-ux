import {
    Literal,
    OrValue,
    RepeatValue,
    AndValue,
    AnyOfThese,
    OptionalValue
  } from "clarity-pattern-parser";

const letter = new AnyOfThese(
  "letter",
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
const digit = new AnyOfThese("digit", "0987654321");
const underbar = new Literal("underbar", "_");
const dash = new Literal("dash", "-");
const character = new OrValue("character", [
  letter,
  digit,
  new OrValue("bar", [underbar, dash])
]);

const characterSequence = new RepeatValue("character-sequence", character);
const optionalCharacter = new OptionalValue(characterSequence);

const name = new AndValue("name", [letter, optionalCharacter]);

export default name;
