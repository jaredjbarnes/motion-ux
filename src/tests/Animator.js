import assert from "assert";
import Animator from "../Animator.js";
import Animation from "../Animation.js";

exports["Animator: "] = () => {
  const from = "rgba(0,0,0,0)";
  const to = "rgba(255,255,255,1)";

  const animation = new Animation({
    name: "test",
    property: "color",
    startAt: 0,
    endAt: 1,
    from: from,
    to: to,
  });

  const animator = new Animator(animation);
  const value = animator.render(0.5);

};
