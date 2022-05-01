import "../../dist/index.browser.js";

const { easings, createDynamicEasing, easingInMap, easingOutMap } = motionUX;
const dynamicEasingOutNames = Object.keys(easingInMap);
const dynamicEasingInNames = Object.keys(easingOutMap);

export default class TransitionDisplay {
  constructor(document) {
    this.document = document;
    this.easingInput = null;
    this.dynamicEasingInInput = null;
    this.dynamicEasingOutInput = null;
    this.transitionSpanInput = null;
    this.ball = null;
    this.easingCanvas = new EasingCanvas(document);
    this.dynamicEasingCanvas = new EasingCanvas(document);
    this.timeline = null;
    this.blendedEasing = easings.linear;

    this.createDropDown();
    this.createDynamicInEasing();
    this.createDynamicOutEasing();

    this.build();
    this.update();
  }

  createDropDown() {
    this.easingInput = this.document.createElement("select");
    const options = this.createEasingOptions();

    options.forEach((o) => this.easingInput.appendChild(o));

    this.easingInput.addEventListener("change", () => {
      this.updateEasingCanvas();
    });
  }

  createDynamicInEasing() {
    this.dynamicEasingInInput = this.document.createElement("select");
    const options = this.createDynamicEasingInOptions();

    options.forEach((o) => this.dynamicEasingInInput.appendChild(o));

    this.dynamicEasingInInput.addEventListener("change", () => {
      this.updateDynamicEasingCanvas();
    });
  }

  createDynamicOutEasing() {
    this.dynamicEasingOutInput = this.document.createElement("select");
    const options = this.createDynamicEasingOutOptions();

    options.forEach((o) => this.dynamicEasingOutInput.appendChild(o));

    this.dynamicEasingOutInput.addEventListener("change", () => {
      this.updateDynamicEasingCanvas();
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

  createDynamicEasingOutOptions() {
    const keys = dynamicEasingOutNames;

    return keys.map((key) => {
      const option = this.document.createElement("option");
      option.value = key;
      option.innerHTML = key;

      return option;
    });
  }

  createDynamicEasingInOptions() {
    const keys = dynamicEasingInNames;

    return keys.map((key) => {
      const option = this.document.createElement("option");
      option.value = key;
      option.innerHTML = key;

      return option;
    });
  }

  build() {
    this.document.body.appendChild(this.easingInput);
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.easingCanvas.getCanvas());
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.dynamicEasingInInput);
    this.document.body.appendChild(this.dynamicEasingOutInput);
    this.document.body.appendChild(this.document.createElement("br"));
    this.document.body.appendChild(this.dynamicEasingCanvas.getCanvas());
  }

  getEasing() {
    return easings[this.easingInput.value];
  }

  getOffset() {
    return Number(this.offsetInput.value);
  }

  getTransitionSpan() {
    return Number(this.transitionSpanInput.value);
  }

  update() {
    this.updateEasingCanvas();
    this.updateDynamicEasingCanvas();
  }

  updateEasingCanvas() {
    const size = 100;

    this.easingCanvas.setSize(size);
    this.easingCanvas.draw(this.getEasing(), 0, 0, size, 1);
  }

  updateDynamicEasingCanvas() {
    const size = 100;

    const easing = createDynamicEasing(
      this.dynamicEasingInInput.value,
      this.dynamicEasingOutInput.value
    );
    this.dynamicEasingCanvas.setSize(size);
    this.dynamicEasingCanvas.draw(easing, 0, 0, size, 1);
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
      const y = fullSize - (size * easing(i) + yOffset + bufferSize);

      if (i === 0) {
        context.moveTo(x, y);
      }

      context.lineTo(x, y);
    }

    const x = size * 1 + xOffset + bufferSize;
    const y = fullSize - (size * easing(1) + yOffset + bufferSize);
    context.lineTo(x, y);

    context.stroke();
  }
}
