import KeyframesGenerator, {
  IAnimatedProperties,
  IPercentageKeyframes,
} from "./KeyframesGenerator";
import Animation from "./Animation";

const keyframesGenerator = new KeyframesGenerator();

type ExtractType<TProps extends IAnimatedProperties<unknown>> = {
  [P in keyof TProps]: TProps[P] extends IPercentageKeyframes<infer TP>
    ? TP
    : TProps[P];
};

export function createAnimation<T>(animatedProperties: IAnimatedProperties<T>) {
  const keyframes = keyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation<ExtractType<IAnimatedProperties<T>>>("", keyframes);

  return animation;
}
