import Animation, { IAnimation } from "./Animation";
import Keyframe from "./Keyframe";
import easings, { EasingFunction } from "./easings";

export default class BlendedAnimation<T> extends Animation<T> {
  public fromAnimation: IAnimation<T>;
  public toAnimation: IAnimation<T>;
  public properties: string[];
  private easing: EasingFunction;

  constructor(
    fromAnimation: IAnimation<T>,
    toAnimation: IAnimation<T>,
    easing: EasingFunction = easings.easeInExpo
  ) {
    const fromValues = fromAnimation.currentValues;
    const toValues = toAnimation.currentValues;
    const properties = Object.keys(fromValues);

    const keyframes = properties
      .map((name) => {
        const from = (fromValues as any)[name];
        const to = (toValues as any)[name];

        if (to == null) {
          throw new Error(
            `Blended animations need to have the same properties to animate.  From Animation: ${JSON.stringify(
              Object.keys(from)
            )}, To Animation: ${JSON.stringify(Object.keys(to))}`
          );
        }

        return new Keyframe({
          property: name,
          startAt: 0,
          endAt: 1,
          from,
          to,
          controls: [],
          easing: easing || easings.linear,
        });
      })
      .flat();

    super(`${fromAnimation.name}-${toAnimation.name}-blended`, keyframes);

    this.easing = easing;
    this.properties = properties;
    this.fromAnimation = fromAnimation;
    this.toAnimation = toAnimation;
  }

  updateKeyframes() {
    const length = this.properties.length;

    for (let x = 0; x < length; x++) {
      const animator = this.animators[x];
      const property = animator.keyframe.property;
      const keyframe = animator.keyframe;

      keyframe.to = (this.toAnimation.currentValues as any)[property];
      keyframe.from = (this.fromAnimation.currentValues as any)[property];
    }
  }

  update(time: number) {
    this.fromAnimation.update(time);
    this.toAnimation.update(time);
    this.updateKeyframes();

    super.update(time);
    return this;
  }

  clone() {
    return new BlendedAnimation<T>(
      this.fromAnimation.clone(),
      this.toAnimation.clone(),
      this.easing
    );
  }
}
