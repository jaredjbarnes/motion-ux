import CssKeyframesGenerator, {
  ICssAnimatedProperties,
} from "./CssKeyframesGenerator";
import Animation from "./Animation";

const cssKeyframesGenerator = new CssKeyframesGenerator();

export function createCssAnimation<T extends {}>(
  animatedProperties: ICssAnimatedProperties<T>
) {
  const keyframes = cssKeyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation("", keyframes);

  return animation;
}
