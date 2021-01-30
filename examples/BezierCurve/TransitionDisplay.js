import "../../dist/main.js";

const { easings, BlendedEasing, Timeline } = motionUX;

export default class TransitionDisplay {
  constructor(document) {
    this.document = document;
    this.fromEasingInput = null;
    this.toEasingInput = null;
    this.offsetInput = null;
    this.ball = null;
    this.fromCanvas = new EasingCanvas(document);
    this.toCanvas = new EasingCanvas(document);
    this.blendCanvas = new EasingCanvas(document);
    this.timeline = null;
    this.blendedEasing = easings.linear;

    this.createFromDropDown();
    this.createToDropDown();
    this.createOffetRange();
    this.createBall();

    this.build();
    this.update();
  }

  createFromDropDown() {
    this.fromEasingInput = this.document.createElement("select");
    const options = this.createEasingOptions();

    options.forEach((o) => this.fromEasingInput.appendChild(o));

    this.fromEasingInput.addEventListener("change", () => {
      this.update();
    });
  }

  createToDropDown() {
    this.toEasingInput = this.document.createElement("select");
    const options = this.createEasingOptions();

    options.forEach((o) => this.toEasingInput.appendChild(o));

    this.toEasingInput.addEventListener("change", () => {
      this.update();
    });
  }

  createEasingOptions() {
    const keys = Object.keys(easings);

    return keys.map((key) => {
      const option = this.document.createElement("option");
      option.value = key;
      option.innerHTML = key;

      return option;
    });
  }

  createOffetRange() {
    this.offsetInput = document.createElement("input");
    this.offsetInput.type = "range";
    this.offsetInput.min = 0;
    this.offsetInput.max = 1;
    this.offsetInput.step = 0.01;

    this.offsetInput.addEventListener("input", () => {
      this.update();
    });
  }

  createBall() {
    this.ball = document.createElement("div");
    this.ball.style.backgroundColor = "blue";
    this.ball.style.width = "50px";
    this.ball.style.height = "50px";
    this.ball.style.borderRadius = "50%";
  }

  createTimeline() {
    if (this.timeline != null) {
      this.timeline.dispose();
    }

    const timeline = (this.timeline = new Timeline({
      animations: [
        {
          name: "circle",
          property: "transform",
          from: "translate(0px, 0px)",
          to: "translate(400px,0px)",
          startAt: 0,
          endAt: 1,
          easing: this.blendedEasing,
        },
      ],
      duration: 2000,
    }));

    timeline.repeat = Infinity;

    timeline.observe("RENDER", ({ animations }) => {
      Object.keys(animations.circle).forEach((key) => {
        this.ball.style[key] = animations.circle[key];
      });
    });

    timeline.play();
  }

  build() {
    this.document.body.appendChild(this.fromEasingInput);
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.toEasingInput);
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.offsetInput);
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.fromCanvas.getCanvas());
    this.document.body.appendChild(this.toCanvas.getCanvas());
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.blendCanvas.getCanvas());
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.ball);
  }

  getFromEasing() {
    return easings[this.fromEasingInput.value];
  }

  getToEasing() {
    return easings[this.toEasingInput.value];
  }

  getFromEasingName() {
    return this.fromEasingInput.value;
  }

  getToEasingName() {
    return this.toEasingInput.value;
  }

  getOffset() {
    return Number(this.offsetInput.value);
  }

  update() {
    this.updateFromCanvas();
    this.updateToCanvas();
    this.updateBlendCanvas();

    //this.createTimeline();
  }

  updateFromCanvas() {
    const easing = this.getFromEasing();

    this.fromCanvas.clear();
    this.fromCanvas.draw(easing);
  }

  updateToCanvas() {
    const easing = this.getToEasing();

    this.toCanvas.clear();
    this.toCanvas.draw(easing);
  }

  updateBlendCanvas() {
    const size = 100;
    const offset = this.getOffset();

    const fromEasing = this.getFromEasing();
    const toEasing = this.getToEasing();
    const blendedEasing = (this.blendedEasing = new BlendedEasing({
      easingA: fromEasing,
      easingB: toEasing,
      offset,
    }));

    const xOffset = offset * size;
    const yOffset = fromEasing.valueAt(offset) * size;

    this.blendCanvas.setSize(100 + yOffset);
    this.blendCanvas.draw(fromEasing, 0, 0, 100, offset);
    this.blendCanvas.draw(toEasing, xOffset, yOffset, 100, 0);
    this.blendCanvas.draw(blendedEasing, xOffset, yOffset, 100, 1);
  }
}

class EasingCanvas {
  constructor(document) {
    this.document = document;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.color = "#000";
    this.strokeWidth = 4;
    this.bufferSize = 50;
    this.context.save();
    // Set the default height.
    this.setSize(100);
  }

  setSize(size) {
    if (typeof size === "number" && size > 1) {
      this.size = size;

      this.clear();
    }
  }

  getSize() {
    return this.size;
  }

  setColor(color) {
    this.color = color;
  }

  setStrokeWidth(width) {
    if (typeof width === "number" && width > 1) {
      this.strokeWidth = width;
    }
  }

  setEasing(easing) {
    this.easing = easing;
  }

  getCanvas() {
    return this.canvas;
  }

  clear() {
    const fullSize = this.getFullSize();
    this.canvas.width = fullSize;
    this.canvas.height = fullSize;

    this.context.clearRect(0, 0, fullSize, fullSize);
  }

  getFullSize() {
    return this.size + this.bufferSize * 2;
  }

  draw(easing, xOffset, yOffset, size, offset) {
    yOffset = typeof yOffset === "number" ? yOffset : 0;
    xOffset = typeof xOffset === "number" ? xOffset : 0;
    size = typeof size === "number" ? size : 100;
    offset = typeof offset === "number" ? offset : 1;

    const fullSize = this.getFullSize();
    const bufferSize = this.bufferSize;
    const context = this.context;
    let toggleStroke = false;

    context.restore();

    context.strokeStyle = this.color;
    context.lineWidth = this.strokeWidth;
    context.setLineDash([]);
    context.lineCap = "round";

    context.beginPath();
    for (let i = 0; i < 1; i += 0.01) {
      if (!toggleStroke && i > offset) {
        toggleStroke = true;
        context.stroke();
        context.beginPath();
        context.setLineDash([10, 5]);
        context.strokeStyle = "#ccc";
      }

      const x = size * i + xOffset + bufferSize;
      const y = fullSize - (size * easing.valueAt(i) + yOffset + bufferSize);

      if (i === 0) {
        context.moveTo(x, y);
      }

      context.lineTo(x, y);
    }

    const x = size * 1 + xOffset + bufferSize;
    const y = fullSize - (size * easing.valueAt(1) + yOffset + bufferSize);
    context.lineTo(x, y);

    context.stroke();
  }
}
