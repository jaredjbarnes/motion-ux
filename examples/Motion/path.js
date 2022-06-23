import {
  UniformPathAnimation,
  Player,
  easings,
  PointPath as Path,
} from "../../dist/index.esm.js";

const circles = [];
const animations = [];
const wrapper = document.querySelector("#wrapper");

for (let x = 0; x < 12; x++) {
  const circle = document.createElement("div");
  const points = createPathForTick(x, 100, 800);
  console.log(points);
  const animation = new UniformPathAnimation(new Path(points), easings.easeOutExpo);

  circle.className = "circle";

  circles.push(circle);
  animations.push(animation);
  wrapper.appendChild(circle);
}

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
  const smallRemainder = (3 - (index % 3)) * (Math.PI / 6);
  const largeRemainder = Math.PI * 2 - smallRemainder - offset;
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

  const remainingParts = Math.round(largeRemainder / (Math.PI / 2));
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
player.duration = 15000;
player.play();
