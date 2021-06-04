import IAnimation, { AnimationState } from "./IAnimation";
import Player, { PlayerState } from "./Player";
import SlopeAnimationBuilder from "./SlopeAnimationBuilder";

const slopeAnimationBuilder = new SlopeAnimationBuilder();

export default class ExtendedAnimation<T> implements IAnimation<T> {
  private animation: IAnimation<T> | null;
  private slopeAnimation: IAnimation<T> | null;
  private offset: number;
  private player: Player;

  public currentValues: AnimationState<T>;
  public name: string;

  constructor(player: Player, time = 0) {
    if (player.animation == null) {
      throw new Error("Cannot make an extension without an animation.");
    }

    this.player = player;
    this.animation = player.animation;
    this.offset = player.time;
    this.currentValues = this.animation.currentValues;

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

    if (time >= 1) {
      this.slopeAnimation = null;
    }

    if (offsetTime + slopeAnimationBuilder.delta > 1) {
      if (this.slopeAnimation == null) {
        return this;
      }

      this.animation = null;
      const overflowTime = offsetTime - 1;
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
}
