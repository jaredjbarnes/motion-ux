import MethodNodeAnimator from "../animators/MethodNodeAnimator.js";
import easings from "../easings.js";
import values from "../patterns/values.js";
import { Cursor } from "clarity-pattern-parser";;
import assert from "assert";

exports["MethodNodeAnimator: "] = () => {
  const fromNode = values.parse(new Cursor("rgba(0,0,0,0)")).children[0];
  const toNode = values.parse(new Cursor("rgba(255,255,255,1)")).children[0];

  const animator = new MethodNodeAnimator({
    startAt: 0,
    endAt: 1,
    easing: easings.linear,
    fromNode: fromNode,
    toNode: toNode
  });

  const result = animator.render(0.5);
  assert.equal(result, "rgba(127.5, 127.5, 127.5, 0.5)");
};
