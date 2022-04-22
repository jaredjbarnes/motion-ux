import CssKeyframesGenerator, {
  ICssAnimatedProperties,
} from "./CssKeyframesGenerator";
import Animation from "./Animation";

const cssKeyframesGenerator = new CssKeyframesGenerator();

export function createCssAnimation<T>(
  animatedProperties: ICssAnimatedProperties<T>,
  duration: number
) {
  const keyframes = cssKeyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation("", keyframes);

  animation.duration = duration;
  return animation;
}
