import easings from "./easings";
import Keyframe from "./Keyframe";
import IAnimation from "./IAnimation";
import Animation from "./Animation";
import ObjectOperator from "./ObjectOperator";
import Player, { PlayerState } from "./Player";
import { deepClone } from "./deepClone";

const nullableAnimation = new Animation("null", [
  new Keyframe({ from: 0, to: 0, property: "null" }),
]);

const objectOperator = new ObjectOperator();

const FORWARD = 1;

export default class SlopeAnimationBuilder {
  public direction = 0;
  public newDuration = 0;
  public duration = 0;
  public offset = 0;
  public delta = 0.01;
  public animation: IAnimation<any> = nullableAnimation;
  public slopeAnimation!: IAnimation<any>;
  public deltaStepValues: any;
  public deltaValues: any;
  public nowValues: any;
  public toValues: any;
  public scaleValues: any;
  public dynamicValues: any;

  private cloneValues(values: any) {
    return deepClone(values);
  }

  build<T>(
    animation: IAnimation<T>,
    duration: number,
    offset: number,
    extendDurationBy: number,
    direction = 0
  ) {
    this.animation = animation;
    this.offset = offset;
    this.duration = duration;
    this.newDuration = extendDurationBy;
    this.direction = direction;

    // If the offset is at or near the end get the last slope.
    if (this.offset + this.delta > 1) {
      this.offset -= this.delta;
    }

    this.calculate();
    this.createSlopeTimeline();

    return this.slopeAnimation as IAnimation<T>;
  }

  private cacheValues() {
    this.deltaStepValues = this.cloneValues(this.nowValues);
    this.scaleValues = this.cloneValues(this.nowValues);
    this.dynamicValues = this.cloneValues(this.nowValues);

    this.cacheDeltaStepValues();
    this.cacheScaleValues();
  }

  private cacheDeltaStepValues() {
    Object.keys(this.deltaStepValues).forEach((property) => {
      objectOperator.assign(this.deltaStepValues[property], this.delta);
    });
  }

  private cacheScaleValues() {
    const scale = this.newDuration / this.duration;

    Object.keys(this.scaleValues).forEach((property) => {
      objectOperator.assign(this.scaleValues[property], scale);
    });
  }

  private cacheDeltaValueForward() {
    this.animation.update(this.offset + this.delta);
    this.deltaValues = this.cloneValues(this.animation.currentValues);
  }

  private cacheDeltaValueStopped() {
    this.animation.update(this.offset);
    this.deltaValues = this.cloneValues(this.animation.currentValues);
  }

  private calculate() {
    this.animation.update(this.offset);
    this.nowValues = this.cloneValues(this.animation.currentValues);
    this.toValues = this.cloneValues(this.nowValues);

    if (this.direction === FORWARD) {
      this.cacheDeltaValueForward();
    } else {
      this.cacheDeltaValueStopped();
    }

    Object.keys(this.nowValues).forEach((property) => {
      const value = this.nowValues[property];

      if (typeof value === "object" && value != null) {
        this.cacheValues();
        this.calculateObject(property);
      } else {
        this.calculatePrimitive(property);
      }
    });
  }

  private calculatePrimitive(property: string) {
    const now = this.nowValues[property];
    const dxNow = this.deltaValues[property];

    const scale = this.newDuration / this.duration;
    const diff = dxNow - now;
    const derivative = diff / this.delta;
    const scaled = derivative * scale;
    const to = now + scaled;

    this.toValues[property] = to;
  }

  private calculateObject(property: string) {
    const now = this.nowValues[property];
    const delta = this.deltaValues[property];
    const deltaStep = this.deltaStepValues[property];
    const scale = this.scaleValues[property];
    const dynamicValue = this.dynamicValues[property];
    const to = this.toValues[property];

    objectOperator.subtract(delta, now, dynamicValue);
    objectOperator.divide(dynamicValue, deltaStep, dynamicValue);
    objectOperator.multiply(dynamicValue, scale, dynamicValue);
    objectOperator.add(now, dynamicValue, to);

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
