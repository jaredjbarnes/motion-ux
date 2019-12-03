import UnitNodeAnimator from "../animators/UnitNodeAnimator.js";
import easings from "../easings.js";
import unit from "../patterns/unit.js";
import { Cursor } from "clarity-pattern-parser";
import assert from "assert";

exports["UnitNodeAnimator: "] = () => {
  const fromNode = unit.parse(new Cursor("100px"));
  const toNode = unit.parse(new Cursor("200px"));

  const animator = new UnitNodeAnimator({
    startAt: 0,
    endAt: 1,
    easing: easings.linear,
    controls: [fromNode, toNode]
  });

  const result = animator.render(0.5);
  assert.equal(result, "150px");
};
