import "../../dist/main.js";

const { easings, Timeline, Easing, BlendedEasing, PointReducer } = motionUX;

const jsonTextarea = document.querySelector("textarea");
const stepInput = document.querySelector("input");
const chartButton = document.querySelector("button");
const canvas = document.querySelector("canvas");

const firstEasing = new Easing([0, 1]);
const secondEasing = new Easing([0, 1, 1, 1, 1]);

const blendedEasing = new BlendedEasing({
  easingA: firstEasing,
  easingB: secondEasing,
  offset: 0.4,
});

const getJSONPoints = () => {
  const json = jsonTextarea.value;
  let points;

  try {
    points = JSON.parse(json);
  } catch (error) {}

  return Array.isArray(points) ? points : [0, 1];
};

const getStep = () => {
  const step = Number(stepInput.value);
  if (isNaN(step) || step < 0.01) {
    return 0.01;
  }
  return step;
};

const context = canvas.getContext("2d");
context.save();

const drawPoints = (bezierCurve, step) => {
  const offset = -50;
  const size = 200;

  context.clearRect(0, 0, 300, 300);
  context.restore();

  context.strokeStyle = "#000";
  
  context.beginPath();
  for (let i = 0; i < 1; i += step) {
    const x = size * i - offset;
    const y = size - (size * bezierCurve.valueAt(i) + offset);

    if (i === 0) {
      context.moveTo(x, y);
    }

    context.lineTo(x, y);
  }

  context.stroke();
};

chartButton.addEventListener("click", () => {
  const points = getJSONPoints();
  const easing = new Easing(points);
  const step = getStep();

  drawPoints(easing, step);
});

drawPoints(blendedEasing, 0.01);
