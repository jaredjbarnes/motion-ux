import {
  Motion,
  CssKeyframesGenerator,
  Animation,
  easings,
} from "../../dist/index.esm.js";

window.setTimeout(() => {
  const subject = document.querySelector("#subject");
  const cssGenerator = new CssKeyframesGenerator();

  const animation1 = new Animation(
    "First Animation",
    cssGenerator.generate({
      left: {
        from: "0px",
        to: "0px",
      },
      top: {
        from: "0px",
        to: {
          value: "300px",
          easeIn: "expo",
        },
      },
    })
  );
  animation1.duration = 2000;

  const animation2 = new Animation(
    "Second Animation",
    cssGenerator.generate({
      top: {
        from: "0px",
        to: {
          value: "150px",
          easeIn: "expo",
        },
      },
      left: {
        from: "0px",
        to: {
          value: "300px",
          easeIn: "expo",
        },
      },
    })
  );
  animation2.duration = 2000;

  const motion = new Motion((animation) => {
    const values = animation.currentValues;
    Object.keys(values).forEach((k) => (subject.style[k] = values[k].join("")));
  });

  motion.segueTo(animation1);

  window.setTimeout(() => {
    motion.segueTo(animation2, easings.easeOutExpo);
  }, 300);

  window.setTimeout(() => {
    motion.segueTo(animation1, easings.easeOutExpo);
  }, 1000);

}, 3000);
