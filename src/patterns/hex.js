import {
  Literal,
  OrValue,
  AndValue,
  AnyOfThese,
} from "../../node_modules/clarity-pattern-parser/src/index.js";

const letter = new AnyOfThese("letter", "ABCDEFabcdef");
const number = new AnyOfThese("number", "0987654321");
const pound = new Literal("pound", "#");
const character = new OrValue("character", [letter, number]);
const sixHex = new AndValue("six-hex", [
  pound,
  character,
  character,
  character,
  character,
  character,
  character
]);

const threeHex = new AndValue("six-hex", [
  pound,
  character,
  character,
  character
]);

const hex = new OrValue("hex", [sixHex, threeHex]);

export default hex;
