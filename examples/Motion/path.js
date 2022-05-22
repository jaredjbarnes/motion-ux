import {
  UniformPathAnimation,
  Player,
  easings,
  PointPath as Path,
} from "../../dist/index.esm.js";

const first = document.querySelector("#first-circle");
const second = document.querySelector("#second-circle");
const third = document.querySelector("#third-circle");
const fourth = document.querySelector("#fourth-circle");

const SCALE = 100;
const CIRCLE_CONTROL_RATIO = 0.552284749;
const POSITION = 6;

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

const pathPoints = rotatePoints(
  [
    pointX1,
    pointY1,
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    controlX3,
    controlY3,
    controlX4,
    controlY4,
    controlX5,
    controlY5,
    controlX6,
    controlY6,
    controlX7,
    controlY7,
    controlX8,
    controlY8,
    controlX9,
    controlY9,
    controlX10,
    controlY10,
    controlX11,
    controlY11,
    controlX12,
    controlY12,
    controlX13,
    controlY13,
    controlX14,
    controlY14,
    controlX15,
    controlY15,
    controlX16,
    controlY16,
    controlX17,
    controlY17,
    controlX18,
    controlY18,
  ].map((p) => p * 100),
  -Math.PI / 4
);

//const firstAnimation = new PathAnimation(pathString, easings.linear);
const firstAnimation = new UniformPathAnimation(
  new Path(createPathForTick(0, 100, 800)),
  easings.easeOutExpo
);
//const firstAnimation = new UniformPathAnimation("M0 0 C 50 50, 50 50, 100 100", easings.linear);

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

function rotatePoints(points, theta) {
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];

    points[i] = x * Math.cos(theta) - y * Math.sin(theta);
    points[i + 1] = y * Math.cos(theta) + x * Math.sin(theta);
  }
  return points;
}

// https://pomax.github.io/bezierinfo/#circles_cubic
function kScale(theta) {
  return (4 / 3) * Math.tan(theta / 4);
}

function createPathForTick(index, radius, finalY) {
  const points = [];
  const offset = (Math.PI * index) / 6;
  const smallRemainder = offset === 0 ? 0 : (Math.PI / 2) % offset;
  const largeRemainder = 2 * Math.PI - (smallRemainder + offset);
  const correctionOffset = -Math.PI / 2; // We need to rotate to start at top.

  points.push(radius);
  points.push(0);

  const k = kScale(smallRemainder);
  const sin = Math.sin(smallRemainder);
  const cos = Math.cos(smallRemainder);

  points.push(radius);
  points.push(radius * k);
  points.push(radius * (cos + k * sin));
  points.push(radius * (sin - k * cos));
  points.push(radius * cos);
  points.push(radius * sin);

  rotatePoints(points, offset + correctionOffset);

  const remainingParts = largeRemainder / (Math.PI / 2);
  for (let i = 0; i < remainingParts; i++) {
    const quarterCircle = Math.PI / 2;
    const innerPoints = [];
    const k = kScale(quarterCircle);
    const sin = Math.sin(quarterCircle);
    const cos = Math.cos(quarterCircle);

    innerPoints.push(radius);
    innerPoints.push(radius * k);
    innerPoints.push(radius * (cos + k * sin));
    innerPoints.push(radius * (sin - k * cos));
    innerPoints.push(radius * cos);
    innerPoints.push(radius * sin);

    rotatePoints(
      innerPoints,
      i * quarterCircle + (offset + smallRemainder) + correctionOffset
    );
    points.push(...innerPoints);
  }

  const quarterCircle = Math.PI / 2;
  const lastQuarterPoints = [];
  const lastK = kScale(quarterCircle);
  const sinQuarter = Math.sin(quarterCircle);
  const cosQuarter = Math.cos(quarterCircle);

  lastQuarterPoints.push(radius);
  lastQuarterPoints.push(radius * lastK);
  lastQuarterPoints.push(radius * (cosQuarter + lastK * sinQuarter));
  lastQuarterPoints.push(radius * (sinQuarter - lastK * cosQuarter));
  lastQuarterPoints.push(radius * cosQuarter);
  lastQuarterPoints.push(radius * sinQuarter);

  rotatePoints(lastQuarterPoints, correctionOffset);
  points.push(...lastQuarterPoints);
  points.push(radius);
  points.push(radius * lastK);
  points.push(radius * (cosQuarter + lastK * sinQuarter));
  points.push(radius * (sinQuarter - lastK * cosQuarter));
  points.push(0, finalY);

  return points;
}

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
player.repeat = Infinity;
player.duration = 5000;
player.play();
