import {
  Motion,
  CssKeyframesGenerator,
  Animation,
  easings,
} from "../../dist/index.esm.js";

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

const motion = new Motion((animation) => {
  const values = animation.currentValues;
  Object.keys(values).forEach((k) => (subject.style[k] = values[k].join("")));
});

motion.segueTo(animation1);

let lastX = 0;
let lastY = 0;

document.body.addEventListener("pointerdown", (event) => {
  const animation = new Animation(
    "Second Animation",
    cssGenerator.generate({
      top: {
        from: `${lastY}px`,
        to: {
          value: `${event.pageY}px`,
          easeIn: "expo",
        },
      },
      left: {
        from: `${lastX}px`,
        to: {
          value: `${event.pageX}`,
          easeIn: "expo",
        },
      },
    })
  );
  
  lastX = event.pageX;
  lastY = event.pageY;

  animation.duration = 1000;
  motion.segueTo(animation, easings.easeOutExpo);
});
