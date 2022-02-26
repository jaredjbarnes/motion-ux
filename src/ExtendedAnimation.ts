import IAnimation, { AnimationState } from "./IAnimation";
import { PlayerState } from "./Player";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";

const slopeAnimationBuilder = new SlopeAnimationBuilder();

export default class ExtendedAnimation<T> implements IAnimation<T> {
  private animation: IAnimation<T>;
  private playerState: PlayerState;
  private slopeAnimation: IAnimation<T>;
  private offset: number;
  

  public currentValues: AnimationState<T>;
  public name: string;
  public delay: number = 0;
  public time: number = 0;
  public duration: number = 0.0001;

  constructor(
    animation: IAnimation<T>,
    playerState: PlayerState = PlayerState.STOPPED,
    duration = 0,
  ) {
    this.animation = animation;
    this.offset = animation.time;
    this.playerState = playerState;
    this.duration = animation.duration + duration;
    this.currentValues = this.animation.currentValues;
    this.name = this.animation.name;
    this.animation.update(1);
    
    this.slopeAnimation = slopeAnimationBuilder.build(
      this.animation,
      duration,
      playerState
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
      this.playerState,
      this.duration
    );
  }
}
