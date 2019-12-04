import HexNodeAnimator from "../animators/HexNodeAnimator.js";
import easings from "../easings.js";
import hex from "../patterns/hex.js";
import { Cursor } from "clarity-pattern-parser";
import assert from "assert";

exports["HexNodeAnimator: "] = () => {
  const fromNode = hex.parse(new Cursor("#000000"));
  const toNode = hex.parse(new Cursor("#FFFFFF"));

  const animator = new HexNodeAnimator({
    startAt: 0,
    endAt: 1,
    easing: easings.linear,
    controls: [fromNode, toNode]
  });

  const result = animator.render(0.5);
  assert.equal(result, "#808080");
};
