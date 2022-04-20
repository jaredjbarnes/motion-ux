import { createCssAnimation } from "../../dist/index.esm.js";

const first = document.querySelector("#first-circle");
const second = document.querySelector("#second-circle");
const third = document.querySelector("#third-circle");
const fourth = document.querySelector("#fourth-circle");

const firstAnimation = createCssAnimation({
  left: {
    from: {
      value: "calc(0% - 0px)",
    },
    to: {
      value: "calc(50% - 200px)",
      easeIn: "elastic",
    },
  },
});

const secondAnimation = createCssAnimation({
  left: {
    from: "calc(0% - 0px)",
    "5%": "calc(0% - 0px)",
    to: {
      value: "calc(50% - 150px)",
      easeIn: "elastic",
    },
  },
});

const thirdAnimation = createCssAnimation({
  left: {
    from: "calc(0% - 0px)",
    "10%": "calc(0% - 0px)",
    to: {
      value: "calc(50% - 100px)",
      easeIn: "elastic",
    },
  },
});

const fourthAnimation = createCssAnimation({
  left: {
    from: "calc(0% - 0px)",
    "15%": "calc(0% - 0px)",
    to: {
      value: "calc(50% - 50px)",
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
  console.log("Loaded");
});

window.addEventListener("scroll", () => {
  const body = document.body;

  const scrollHeight = body.scrollHeight;
  const scrollTop = body.scrollTop;
  const height = body.offsetHeight;

  const time = scrollTop / (scrollHeight - height);
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
});
