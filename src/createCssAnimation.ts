import CssKeyframesGenerator, {
  ICssAnimatedProperties,
} from "./CssKeyframesGenerator";
import Animation from "./Animation";

const cssKeyframesGenerator = new CssKeyframesGenerator();
type CssType<T> = { [P in keyof T]: (string | number)[] };

export function createCssAnimation<T>(
  animatedProperties: ICssAnimatedProperties<T>
) {
  const keyframes = cssKeyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation<CssType<T>>("", keyframes);

  return animation;
}
