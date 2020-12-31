import "../../dist/main.js";

const {
  easings,
  Timeline,
  BezierCurve,
  BlendedBezierCurve,
  PointReducer,
} = motionUX;

const jsonTextarea = document.querySelector("textarea");
const stepInput = document.querySelector("input");
const chartButton = document.querySelector("button");
const canvas = document.querySelector("canvas");

const firstEasing = new BezierCurve([0, 1, 1, 1, 1, 1]);
const secondEasing = new BezierCurve([0, 0, 0, 0, 0, 1]);

const blendedBezierCurve = new BlendedBezierCurve({
  bezierCurveA: firstEasing,
  bezierCurveB: secondEasing,
  offset: 0.75,
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
  const step = new Number(stepInput.value);
  if (isNaN(step)) {
    return "0.1";
  }
  return step;
};

const drawPoints = (points, step) => {
  const context = canvas.getContext("2d");
  const bezierCurve = blendedBezierCurve;
  const offset = 0;
  const size = canvas.width;

  context.clearRect(0, 0, 0, 0);

  context.strokeStyle = "#000";
  context.moveTo(offset, offset);

  for (let x = 0; x < 1; x += step) {
    context.lineTo(
      size * x + offset,
      size - (size * bezierCurve.valueAt(x) + offset)
    );
  }

  context.lineTo(
    size * 1 + offset,
    size - (size * bezierCurve.valueAt(1) + offset)
  );

  context.stroke();
};

chartButton.addEventListener("click", () => {});

drawPoints([0, 0, 1], 0.01);
