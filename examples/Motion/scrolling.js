import { createCssAnimation } from "../../dist/index.esm.js";

const first = document.querySelector("#first-circle");
const second = document.querySelector("#second-circle");
const third = document.querySelector("#third-circle");
const fourth = document.querySelector("#fourth-circle");

const firstAnimation = createCssAnimation({
  left: {
    from: "0%",
    to: {
      value: "50%",
      easeIn: "elastic",
    },
  },
  transform: {
    from: "scale(1)",
    "8%": "scale(1)",
    "13%": "scale(1.5)",
    to: "scale(2)",
  },
});

const secondAnimation = createCssAnimation({
  left: {
    from: "0%",
    "5%": "0%",
    to: {
      value: "50%",
      easeIn: "elastic",
    },
  },
});

const thirdAnimation = createCssAnimation({
  left: {
    from: "0%",
    "10%": "0%",
    to: {
      value: "50%",
      easeIn: "elastic",
    },
  },
});

const fourthAnimation = createCssAnimation({
  left: {
    from: "0%",
    "15%": "0%",
    to: {
      value: "50%",
      easeIn: "elastic",
    },
  },
});

const animations = [
  firstAnimation,
  secondAnimation,
  thirdAnimation,
  fourthAnimation,
];

const circles = [first, second, third, fourth];

window.addEventListener("load", () => {
  update();
});

window.addEventListener("scroll", () => {
  update();
});

function update() {
  const body = document.body;

  const scrollHeight = body.scrollHeight;
  const scrollTop = body.scrollTop;
  const height = body.offsetHeight;
  const time = scrollTop / (scrollHeight - height);
  console.log(time);

  animations.forEach((animation, index) => {
    animation.update(time);
    const element = circles[index];
    const values = animation.currentValues;
    Object.keys(values).forEach((key) => {
      const value = values[key]
        .map((value) => {
          if (typeof value === "number") {
            return value.toFixed(2);
          }
          return value;
        })
        .join("");
      element.style[key] = value;
    });
  });
}
