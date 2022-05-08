import {
  NormalizedPathAnimation,
  Player,
  easings,
  PathAnimation,
} from "../../dist/index.esm.js";

const first = document.querySelector("#first-circle");
const second = document.querySelector("#second-circle");
const third = document.querySelector("#third-circle");
const fourth = document.querySelector("#fourth-circle");

const SCALE = 100;
const CIRCLE_CONTROL_RATIO = 0.552284749;
const POSITION = 4;

const pointX1 = 1;
const pointY1 = 0;

const pointX2 = 2;
const pointY2 = 1;

const pointX3 = 1;
const pointY3 = 2;

const pointX4 = 0;
const pointY4 = 1;

const controlX1 = pointX1 + CIRCLE_CONTROL_RATIO;
const controlY1 = pointY1;

const controlX2 = pointX2;
const controlY2 = pointY2 - CIRCLE_CONTROL_RATIO;

const controlX3 = pointX2;
const controlY3 = pointY2;

const controlX4 = pointX2;
const controlY4 = pointY2 + CIRCLE_CONTROL_RATIO;

const controlX5 = pointX3 + CIRCLE_CONTROL_RATIO;
const controlY5 = pointY3;

const controlX6 = pointX3;
const controlY6 = pointY3;

const controlX7 = pointX3 - CIRCLE_CONTROL_RATIO;
const controlY7 = pointY3;

const controlX8 = pointX4;
const controlY8 = pointY4 + CIRCLE_CONTROL_RATIO;

const controlX9 = pointX4;
const controlY9 = pointY4;

const controlX10 = pointX4;
const controlY10 = pointY4 - CIRCLE_CONTROL_RATIO;

const controlX11 = pointX1 - CIRCLE_CONTROL_RATIO;
const controlY11 = pointY1;

const controlX12 = pointX1;
const controlY12 = pointY1;

const controlX13 = pointX1 + CIRCLE_CONTROL_RATIO + 0.25;
const controlY13 = pointY1;

const controlX14 = pointX2 + 0.5;
const controlY14 = pointY2 - CIRCLE_CONTROL_RATIO;

const controlX15 = pointX2 + 0.5;
const controlY15 = pointY2;

const controlX16 = pointX2 + 0.5;
const controlY16 = (POSITION - pointY2) / 2 + pointY2;

const controlX17 = pointX1;
const controlY17 = (POSITION - pointY2) / 2 + pointY2;

const controlX18 = pointX1;
const controlY18 = POSITION;

const pathString = scale`M ${pointX1} ${pointY1}
C ${controlX1} ${controlY1},
${controlX2} ${controlY2},
${controlX3} ${controlY3}
C ${controlX4} ${controlY4},
${controlX5} ${controlY5},
${controlX6} ${controlY6}
C ${controlX7} ${controlY7},
${controlX8} ${controlY8},
${controlX9} ${controlY9}
C ${controlX10} ${controlY10},
${controlX11} ${controlY11},
${controlX12} ${controlY12}
C ${controlX13} ${controlY13},
${controlX14} ${controlY14},
${controlX15} ${controlY15}
C ${controlX16} ${controlY16},
${controlX17} ${controlY17},
${controlX18} ${controlY18}`;

//const firstAnimation = new PathAnimation(pathString, easings.linear);
const firstAnimation = new NormalizedPathAnimation(pathString, easings.easeOutExpo);
//const firstAnimation = new NormalizedPathAnimation("M0 0 C 50 50, 50 50, 100 100", easings.linear);

function scale(strings, ...keys) {
  return strings
    .map((s, index) => {
      const numberValue = keys[index];
      if (typeof numberValue === "number") {
        return s + String(numberValue * SCALE);
      }
      return s;
    })
    .join("")
    .replace(/(?:\r\n|\r|\n)/g, " ");
}

const animations = [
  firstAnimation,
  // secondAnimation,
  // thirdAnimation,
  // fourthAnimation,
];

const circles = [first, second, third, fourth];

const player = new Player();
player.render = (time) => {
  animations.forEach((animation, index) => {
    animation.update(time);
    const element = circles[index];
    const values = animation.currentValues;
    Object.keys(values).forEach((key) => {
      const x = values.x;
      const y = values.y;

      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
};
player.repeat = 1;
player.duration = 5000;
player.play();
