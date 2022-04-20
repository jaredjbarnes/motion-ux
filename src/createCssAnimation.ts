import CssKeyframesGenerator, {
  IAnimatedProperties,
} from "./CssKeyframesGenerator";
import Animation from "./Animation";

const cssKeyframesGenerator = new CssKeyframesGenerator();

export function createCssAnimation<T>(
  animatedProperties: IAnimatedProperties<T>,
  duration: number
) {
  const keyframes = cssKeyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation("", keyframes);

  animation.duration = duration;
  return animation;
}
