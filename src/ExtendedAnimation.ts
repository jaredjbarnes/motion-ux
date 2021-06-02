import IAnimation, { AnimationState } from "./IAnimation";
import Player, { PlayerState } from "./Player";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";

const slopeAnimationBuilder = new SlopeAnimationBuilder();

export default class ExtendedAnimation<T> implements IAnimation<T> {
  private animation: IAnimation<T>;
  private slopeAnimation: IAnimation<T>;
  private offset: number;
  private player: Player;

  public currentValues: AnimationState<T>;
  public name: string;

  constructor(player: Player, time = 0) {
    this.animation = player.animation;
    this.offset = player.time;

    this.name = this.animation.name;
    this.slopeAnimation = slopeAnimationBuilder.build(
      this.animation,
      1,
      this.player.duration,
      time,
      this.player.state
    );
  }

  update(time: number) {
    const offsetTime = this.offset + time;

    if (offsetTime > 1) {
      const overflowTime = offsetTime - 1;
      this.slopeAnimation.update(overflowTime);
      this.currentValues = this.slopeAnimation.currentValues;
    } else {
      this.animation.update(offsetTime);
      this.currentValues = this.animation.currentValues;
    }

    return this;
  }
}
