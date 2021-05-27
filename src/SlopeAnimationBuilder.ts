import easings from "./easings";
import Keyframe from "./Keyframe";
import Animation from "./Animation";
import ObjectOperator from "./ObjectOperator";
import { PlayerState } from "./Player";

const FORWARD = 1;

export default class SlopeAnimationBuilder {
  public animation: any;
  public slopeAnimation: any;
  public direction: any;
  public newDuration: any;
  public duration: any;
  public offset: any;
  public delta: any;
  public deltaStepValues: any;
  public scaledValues: any;
  public deltaValues: any;
  public nowValues: any;
  public diffValues: any;
  public derivativeValues: any;
  public toValues: any;
  public scaleValues: any;
  public objectOperator = new ObjectOperator();

  constructor() {
    this.animation = null;
    this.slopeAnimation = null;
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
  }

  private cloneValues(values: any) {
    return JSON.parse(JSON.stringify(values));
  }

  build<T>(
    animation: Animation<T>,
    offset: number,
    duration: number,
    newDuration: number,
    direction: PlayerState
  ) {
    this.animation = animation;
    this.offset = offset;
    this.duration = duration;
    this.newDuration = newDuration;
    this.direction = direction;

    this.cacheValues();
    this.calculate();
    this.createSlopeTimeline();

    return this.slopeAnimation as Animation<T>;
  }

  private cacheValues() {
    this.animation.update(this.offset);
    this.nowValues = this.cloneValues(this.animation.getCurrentValues());

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
    } else {
      this.cacheDeltaValueStopped();
    }
  }

  private cacheDeltaStepValues() {
    Object.keys(this.deltaStepValues).forEach((property) => {
      this.objectOperator.assign(this.deltaStepValues[property], this.delta);
    });
  }

  private cacheScaleValues() {
    const scale = this.newDuration / this.duration;

    Object.keys(this.scaleValues).forEach((property) => {
      this.objectOperator.assign(this.scaleValues[property], scale);
    });
  }

  private cacheDeltaValueForward() {
    this.animation.update(this.offset + this.delta);
    this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
  }

  private cacheDeltaValueStopped() {
    this.animation.update(this.offset);
    this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
  }

  private calculate() {
    Object.keys(this.nowValues).forEach((property) => {
      const value = this.nowValues[property];

      if (typeof value === "object" && value != null) {
        this.calculateObject(property);
      } else {
        this.calculatePrimitive(property);
      }
    });
  }

  private calculatePrimitive(property: string) {
    const now = this.nowValues[property];
    const delta = this.deltaValues[property];

    const scale = this.newDuration / this.duration;
    const diff = delta - now;
    const derivative = diff / this.delta;
    const scaled = derivative * scale;
    const to = now + scaled;

    this.toValues[property] = to;
  }

  private calculateObject(property: string) {
    const now = this.nowValues[property];
    const delta = this.deltaValues[property];
    const diff = this.diffValues[property];

    const deltaStep = this.deltaStepValues[property];
    const derivative = this.derivativeValues[property];
    const scale = this.scaleValues[property];
    const scaled = this.scaledValues[property];
    const to = this.toValues[property];

    this.objectOperator.subtract(delta, now, diff);
    this.objectOperator.divide(diff, deltaStep, derivative);
    this.objectOperator.multiply(derivative, scale, scaled);
    this.objectOperator.add(now, scaled, to);

    this.toValues[property] = to;
  }

  private createSlopeTimeline() {
    const keyframes = Object.keys(this.nowValues)
      .map((property) => {
        return new Keyframe({
          property,
          from: this.nowValues[property],
          controls: [],
          to: this.toValues[property],
          startAt: 0,
          endAt: 1,
          easing: easings.linear,
        });
      })
      .flat();

    this.slopeAnimation = new Animation("slope", keyframes);
  }
}
