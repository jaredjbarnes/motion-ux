import {
  Literal,
  AndComposite,
  RepeatComposite,
  OrComposite,
} from "clarity-pattern-parser";
import number from "./number";
import optionalSpaces from "./optionalSpaces";
import spaces from "./spaces";
import divider from "./divider";

const m = new Literal("M", "M");
const v = new Literal("v", "v");
const V = new Literal("V", "V");
const h = new Literal("h", "h");
const H = new Literal("H", "H");
const c = new Literal("c", "c");
const C = new Literal("C", "C");

const x = number.clone("x");
const y = number.clone("y");

const dx = number.clone("dx");
const dy = number.clone("dy");

export const moveTo = new AndComposite("moveTo", [
  m,
  optionalSpaces,
  x,
  spaces,
  y,
]);

export const absoluteVerticalLine = new AndComposite("absoluteVerticalLine", [
  V,
  optionalSpaces,
  y,
]);

export const relativeVerticalLine = new AndComposite("relativeVerticalLine", [
  v,
  optionalSpaces,
  dy,
]);

export const absoluteHorizontalLine = new AndComposite(
  "absoluteHorizontalLine",
  [H, optionalSpaces, x]
);

export const relativeHorizontalLine = new AndComposite(
  "relativeHorizontalLine",
  [h, optionalSpaces, dx]
);

export const absoluteCurvedLine = new AndComposite("absoluteCurvedLine", [
  C,
  optionalSpaces,
  x,
  spaces,
  y,
  divider,
  x,
  spaces,
  y,
  divider,
  x,
  spaces,
  y,
]);

export const relativeCurvedLine = new AndComposite("relativeCurvedLine", [
  c,
  optionalSpaces,
  dx,
  spaces,
  dy,
  divider,
  dx,
  spaces,
  dy,
  divider,
  dx,
  spaces,
  dy,
]);

export const pathCommands = new OrComposite("pathCommands", [
  moveTo,
  absoluteVerticalLine,
  relativeVerticalLine,
  absoluteHorizontalLine,
  relativeHorizontalLine,
  absoluteCurvedLine,
  relativeCurvedLine,
]);

export const path = new RepeatComposite("path", pathCommands, spaces);
