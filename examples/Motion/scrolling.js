import { createAnimation } from "../../dist/index.esm.js";

const first = document.querySelector("#first-circle");
const second = document.querySelector("#second-circle");
const third = document.querySelector("#third-circle");
const fourth = document.querySelector("#fourth-circle");

const firstAnimation = createAnimation({
  left: {
    from: 0,
    to: {
      value: 50,
      easeIn: "elastic",
    },
  },
});

const secondAnimation = createAnimation({
  left: {
    from: 0,
    "5%": 0,
    to: {
      value: 50,
      easeIn: "elastic",
    },
  },
});

const thirdAnimation = createAnimation({
  left: {
    from: 0,
    "10%": 0,
    to: {
      value: 50,
      easeIn: "elastic",
    },
  },
});

const fourthAnimation = createAnimation({
  left: {
    from: 0,
    "15%": 0,
    to: {
      value: 50,
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

  animations.forEach((animation, index) => {
    animation.update(time);
    const element = circles[index];
    const values = animation.currentValues;

    element.style.left = `${values.left}%`;
  });
}
