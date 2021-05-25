import easings from "./easings";
import Keyframe from "./Keyframe";
import Animation from "./Animation";
import ObjectOperator from "./ObjectOperator";
import { PlayerState } from "./Player";

const FORWARD = 1;
const BACKWARD = -1;

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
    Object.keys(this.deltaStepValues).forEach((name) => {
      Object.keys(this.deltaStepValues[name]).forEach((property) => {
        this.objectOperator.assign(
          this.deltaStepValues[name][property],
          this.delta
        );
      });
    });
  }

  private cacheScaleValues() {
    const scale = this.newDuration / this.duration;

    Object.keys(this.scaleValues).forEach((name) => {
      Object.keys(this.scaleValues[name]).forEach((property) => {
        this.objectOperator.assign(this.scaleValues[name][property], scale);
      });
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
    Object.keys(this.nowValues).forEach((name) => {
      Object.keys(this.nowValues[name]).forEach((property) => {
        const value = this.nowValues[name][property];

        if (typeof value === "object" && value != null) {
          this.calculateObject(name, property);
        } else {
          this.calculatePrimitive(name, property);
        }
      });
    });
  }

  private calculatePrimitive(name: string, property: string) {
    const now = this.nowValues[name][property];
    const delta = this.deltaValues[name][property];

    const scale = this.newDuration / this.duration;
    const diff = delta - now;
    const derivative = diff / this.delta;
    const scaled = derivative * scale;
    const to = now + scaled;

    this.toValues[name][property] = to;
  }

  private calculateObject(name: string, property: string) {
    const now = this.nowValues[name][property];
    const delta = this.deltaValues[name][property];
    const diff = this.diffValues[name][property];

    const deltaStep = this.deltaStepValues[name][property];
    const derivative = this.derivativeValues[name][property];
    const scale = this.scaleValues[name][property];
    const scaled = this.scaledValues[name][property];
    const to = this.toValues[name][property];

    this.objectOperator.subtract(delta, now, diff);
    this.objectOperator.divide(diff, deltaStep, derivative);
    this.objectOperator.multiply(derivative, scale, scaled);
    this.objectOperator.add(now, scaled, to);

    this.toValues[name][property] = to;
  }

  private createSlopeTimeline() {
    const keyframes = Object.keys(this.nowValues)
      .map((name) => {
        return Object.keys(this.nowValues[name]).map((property) => {
          return new Keyframe({
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

    this.slopeAnimation = new Animation(keyframes);
  }
}
