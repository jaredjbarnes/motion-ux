import ExtendedAnimation from "./ExtendedAnimation";
import IAnimation, { AnimationState } from "./IAnimation";
import Animation from "./Animation";
import Player, { RepeatDirection } from "./Player";
import BlendedAnimation from "./BlendedAnimation";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";

export default class Motion<T> {
  protected player = new Player<T>();
  protected keyframeGenerator = new KeyframeGenerator();
  protected observer: TimeObserver<any> | null = null;

  constructor(render: (animation: IAnimation<T>) => void) {
    this.player.render = render;
  }

  segueTo(animation: IAnimation<T>, easing?: EasingFunction) {
    const currentAnimation = this.player.animation;
    this.player.iterations = 0;
    this.player.repeat = 1;

    if (currentAnimation == null) {
      this.player.animation = animation;
    } else {
      const extendDurationBy =
        animation.duration - currentAnimation.duration * this.player.time;

      let fromAnimation: IAnimation<T>;

      if (extendDurationBy > 0) {
        fromAnimation = new ExtendedAnimation(
          currentAnimation,
          this.player.state,
          extendDurationBy
        );
      } else {
        const values = currentAnimation.currentValues;
        const animation = this.makeAnimationFromLastValues(values);
        fromAnimation = animation;
      }

      const newAnimation = new BlendedAnimation(
        fromAnimation,
        animation,
        easing
      );

      this.player.animation = newAnimation;

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        const values = newAnimation.currentValues;
        const animation = this.makeAnimationFromLastValues(values);
        this.player.animation = animation;
      });
    }

    this.player.time = 0;
    this.player.play();
  }

  segueToLoop(animation: IAnimation<T>, easing?: EasingFunction) {
    this.player.repeat = Infinity;
    this.player.repeatDirection = RepeatDirection.DEFAULT;

    if (this.player.animation == null) {
      this.player.animation = animation;
    } else {
      const currentAnimation = this.player.animation;
      const extendDurationBy =
        animation.duration - currentAnimation.duration * this.player.time;

      let fromAnimation: IAnimation<T>;

      if (extendDurationBy > 0) {
        fromAnimation = new ExtendedAnimation(
          currentAnimation,
          this.player.state,
          extendDurationBy
        );
      } else {
        fromAnimation = currentAnimation;
      }

      this.player.animation = new BlendedAnimation(
        fromAnimation,
        animation,
        easing
      );

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        this.player.animation = animation;
      });
    }
    this.player.time = 0;
    this.player.play();
  }

  protected makeAnimationFromLastValues(values: AnimationState<T>) {
    const keyframes = Object.keys(values).reduce((acc, key) => {
      acc[key] = {
        from: JSON.parse(JSON.stringify(values[key])),
        to: JSON.parse(JSON.stringify(values[key])),
      };
      return acc;
    }, {} as any);

    return new Animation<T>(
      "last-animation",
      this.keyframeGenerator.generate(keyframes)
    );
  }

  stop() {
    this.player.stop();
  }

  play() {
    this.player.play();
  }
}
