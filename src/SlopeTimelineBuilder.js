import easings from "./easings.js";
import GraphOperator from "./GraphOperator.js";
import Animation from "./Animation.js";
import Timeline from "./Timeline.js";

const FORWARD = 1;
const BACKWARD = -1;

export default class SlopeTimelineBuilder {
  constructor() {
    this.timeline = null;
    this.slopeTimeline = null;
    this.direction = 0;
    this.newDuration = 0;
    this.duration = 0;
    this.offset = 0;
    this.delta = 0.0001;
    this.deltaStepValues = null;
    this.scaledValues = null;
    this.deltaValues = null;
    this.nowValues = null;
    this.diffValues = null;
    this.derivativeValues = null;
    this.scaledValues = null;
    this.toValues = null;
    this.graphOperator = new GraphOperator();
  }

  cloneValues(values) {
    return Object.keys(values).reduce((clone, name) => {
      clone[name] = Object.keys(values[name]).reduce((clone, property) => {
        clone[property] = values[name][property].clone();
        return clone;
      }, {});
      return clone;
    }, {});
  }

  build(timeline, offset, duration, newDuration, direction) {
    this.timeline = timeline;
    this.offset = offset;
    this.duration = duration;
    this.newDuration = newDuration;
    this.direction = direction;

    this.cacheValues();
    this.calculate();
    this.createSlopeTimeline();

    return this.slopeTimeline;
  }

  cacheValues() {
    this.timeline.update(this.offset);
    this.nowValues = this.cloneValues(this.timeline.getCurrentValues());

    this.deltaStepValues = this.cloneValues(this.nowValues);
    this.scaleValues = this.cloneValues(this.nowValues);
    this.diffValues = this.cloneValues(this.nowValues);
    this.derivativeValues = this.cloneValues(this.nowValues);
    this.scaledValues = this.cloneValues(this.nowValues);
    this.toValues = this.cloneValues(this.nowValues);

    this.cacheDeltaStepValues();
    this.cacheScaleValues();

    if (this.direction === FORWARD) {
      this.cacheDeltaValueForward();
    } else if (this.direction === BACKWARD) {
      this.cacheDeltaValueBackward();
    } else {
      this.cacheDeltaValueStopped();
    }
  }

  cacheDeltaStepValues() {
    Object.keys(this.deltaStepValues).forEach((name) => {
      Object.keys(this.deltaStepValues[name]).forEach((property) => {
        this.graphOperator.assign(
          this.deltaStepValues[name][property].graph,
          this.delta
        );
      });
    });
  }

  cacheScaleValues() {
    const scale = this.newDuration / this.duration;

    Object.keys(this.scaleValues).forEach((name) => {
      Object.keys(this.scaleValues[name]).forEach((property) => {
        this.graphOperator.assign(
          this.scaleValues[name][property].graph,
          scale
        );
      });
    });
  }

  cacheDeltaValueForward() {
    this.timeline.update(this.offset + this.delta);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  cacheDeltaValueBackward() {
    this.timeline.update(this.offset - this.delta);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  cacheDeltaValueStopped() {
    this.timeline.update(this.offset);
    this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
  }

  calculate() {
    Object.keys(this.nowValues).forEach((name) => {
      Object.keys(this.nowValues[name]).forEach((property) => {
        const now = this.nowValues[name][property].graph;
        const delta = this.deltaValues[name][property].graph;
        const diff = this.diffValues[name][property].graph;

        const deltaStep = this.deltaStepValues[name][property].graph;
        const derivative = this.derivativeValues[name][property].graph;
        const scale = this.scaleValues[name][property].graph;
        const scaled = this.scaledValues[name][property].graph;
        const to = this.toValues[name][property].graph;

        this.graphOperator.subtract([delta, now, diff]);
        this.graphOperator.divide([diff, deltaStep, derivative]);
        this.graphOperator.multiply([derivative, scale, scaled]);
        this.graphOperator.add([now, scaled, to]);

        // Lets update the ParsedValue.value.
        this.toValues[name][property].value = to.toString();
      });
    });
  }

  createSlopeTimeline() {
    const animations = Object.keys(this.nowValues)
      .map((name) => {
        return Object.keys(this.nowValues[name]).map((property) => {
          return new Animation({
            name,
            property,
            from: this.nowValues[name][property],
            controls: [],
            to: this.toValues[name][property],
            startAt: 0,
            endAt: 1,
            easing: easings.linear,
          });
        });
      })
      .flat();

    this.slopeTimeline = new Timeline(animations);
  }
}
