import assert from "assert";
import Animator from "../Animator.js";
import Animation from "../Animation.js";

exports["Animator: "] = () => {
  const animation = new Animation({
    name: "test",
    property: "color",
    startAt: 0,
    endAt: 1,
    from: "rgba(0,0,0,0)",
    to: "rgba(255,255,255,1)",
  });

  const animator = new Animator(animation);
  const value = animator.render(0.5).value;

  assert.strictEqual("rgba(127.5, 127.5, 127.5, 0.5)", value);
};
