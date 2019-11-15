import ValuesNodeAnimator from "../animators/ValuesNodeAnimator.js";
import easings from "../easings.js";
import values from "../patterns/values.js";
import { Cursor } from "clarity-pattern-parser";
import assert from "assert";

exports["ValuesNodeAnimator: "] = () => {
  const fromNode = values.parse(
    new Cursor("linear-gradient(to left, #000, #000 50%, #eee 75%, #333 75%)")
  );
  const toNode = values.parse(
    new Cursor("linear-gradient(to left, #fff, #fff 50%, #eee 75%, #333 50%)")
  );

  const animator = new ValuesNodeAnimator({
    startAt: 0,
    endAt: 1,
    easing: easings.linear,
    fromNode: fromNode,
    toNode: toNode
  });

  const result = animator.render(0.75);
};
