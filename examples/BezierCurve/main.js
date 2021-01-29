import "../../dist/main.js";

const { easings, Timeline, Easing, BlendedEasing, PointReducer } = motionUX;

const firstJsonTextarea = document.querySelector("#first");
const secondJsonTextarea = document.querySelector("#second");
const offsetInput = document.querySelector("#offset");
const stepInput = document.querySelector("input");
const chartButton = document.querySelector("button");
const canvas = document.querySelector("canvas");
const useFirst = document.querySelector("#use-first");

const firstEasing = new Easing([0, 1]);
const secondEasing = new Easing([0, 1, 1, 1, 1]);

const blendedEasing = new BlendedEasing({
  easingA: firstEasing,
  easingB: secondEasing,
  offset: 0.4,
});

const getFirstJSONPoints = () => {
  const json = firstJsonTextarea.value;
  let points;

  try {
    points = JSON.parse(json);
  } catch (error) {}

  return Array.isArray(points) ? points : [0, 1];
};

const getSecondJSONPoints = () => {
  const json = secondJsonTextarea.value;
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

const getOffset = () => {
  const offset = Number(offsetInput.value);
  if (isNaN(offset)) {
    return 0;
  }
  return offset;
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
  const shouldOnlyUseFirst = useFirst.checked;

  if (shouldOnlyUseFirst) {
    const easing = new Easing(getFirstJSONPoints());
    const step = getStep();

    drawPoints(easings.easeInOutBounce, step);
  } else {
    const firstEasing = new Easing(getFirstJSONPoints());
    const secondEasing = new Easing(getSecondJSONPoints());
    const offset = getOffset();
    const easing = new BlendedEasing({
      easingA: firstEasing,
      easingB: secondEasing,
      offset,
    });
    const step = getStep();

    drawPoints(easing, step);
  }
});

drawPoints(blendedEasing, 0.01);
