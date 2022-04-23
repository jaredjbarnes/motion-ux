import { IAnimation, AnimationState } from "./Animation";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";

const slopeAnimationBuilder = new SlopeAnimationBuilder();

export default class ExtendedAnimation<T> implements IAnimation<T> {
  private animation: IAnimation<T>;
  private slopeAnimation: IAnimation<T>;
  private offset: number;
  private duration;
  private extendDurationBy;

  public currentValues: AnimationState<T>;
  public name: string;
  public time: number = 0;

  constructor(
    animation: IAnimation<T>,
    duration: number,
    offset: number,
    extendDurationBy = 0
  ) {
    this.duration = duration;
    this.offset = offset;
    this.extendDurationBy = extendDurationBy;

    this.animation = animation;
    this.currentValues = this.animation.currentValues;
    this.name = this.animation.name;

    this.slopeAnimation = slopeAnimationBuilder.build(
      this.animation,
      duration,
      1,
      extendDurationBy,
      1
    );
  }

  update(time: number) {
    this.time = time;
    const offsetTime = this.offset + time;

    if (offsetTime + slopeAnimationBuilder.delta > 1) {
      if (this.slopeAnimation == null) {
        return this;
      }

      const overflowTime = offsetTime + slopeAnimationBuilder.delta - 1;
      this.slopeAnimation.update(overflowTime);
      this.currentValues = this.slopeAnimation.currentValues;
    } else {
      if (this.animation == null) {
        return this;
      }

      this.animation.update(offsetTime);
      this.currentValues = this.animation.currentValues;
    }

    return this;
  }

  clone() {
    return new ExtendedAnimation(
      this.animation.clone(),
      this.duration,
      this.offset,
      this.extendDurationBy
    );
  }
}
