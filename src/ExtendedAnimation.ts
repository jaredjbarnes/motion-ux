import IAnimation, { AnimationState } from "./IAnimation";
import { PlayerState } from "./Player";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";

const slopeAnimationBuilder = new SlopeAnimationBuilder();

export default class ExtendedAnimation<T> implements IAnimation<T> {
  private animation: IAnimation<T>;
  private animationDuration: number;
  private playerState: PlayerState;
  private extendedDuration: number;
  private slopeAnimation: IAnimation<T>;
  private offset: number;

  public currentValues: AnimationState<T>;
  public name: string;

  constructor(
    animation: IAnimation<T>,
    animationDuration: number,
    offset: number,
    playerState: PlayerState,
    extendedDuration = 0
  ) {
    this.animation = animation;
    this.animationDuration = animationDuration;
    this.offset = offset;
    this.playerState = playerState;
    this.extendedDuration = extendedDuration;
    this.currentValues = this.animation.currentValues;

    this.name = this.animation.name;
    this.slopeAnimation = slopeAnimationBuilder.build(
      this.animation,
      1,
      animationDuration,
      extendedDuration,
      playerState
    );
  }

  update(time: number) {
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
      this.animationDuration,
      this.offset,
      this.playerState,
      this.extendedDuration
    );
  }
}
