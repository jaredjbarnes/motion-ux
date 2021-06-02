import Animation from "./Animation";
import Keyframe from "./Keyframe";
import easings, { EasingFunction } from "./easings";

export default class BlendedAnimation<T> extends Animation<T> {
  public fromAnimation: any;
  public toAnimation: any;

  constructor(
    fromAnimation: Animation<T>,
    toAnimation: Animation<T>,
    easing: EasingFunction
  ) {
    const fromValues = fromAnimation.currentValues;
    const toValues = toAnimation.currentValues;

    const animations = Object.keys(fromValues)
      .map((name) => {
        const fromValue = fromValues[name];
        const toValue = toValues[name];

        if (toValue == null) {
          throw new Error(
            `Blended animations need to have the same properties to animate.  From Animation: ${JSON.stringify(
              Object.keys(fromValues)
            )}, To Animation: ${JSON.stringify(Object.keys(toValues))}`
          );
        }

        return Object.keys(fromValue).map((property) => {
          const from = fromValue[property];
          const to = toValue[property];

          return new Keyframe({
            property,
            startAt: 0,
            endAt: 1,
            from,
            to,
            controls: [],
            easing: easing || easings.linear,
          });
        });
      })
      .flat();

    super(`blended`, animations);

    this.fromAnimation = fromAnimation;
    this.toAnimation = toAnimation;
  }

  update(time: number) {
    this.fromAnimation.update(time);
    this.toAnimation.update(time);

    super.update(time);

    return this;
  }
}
