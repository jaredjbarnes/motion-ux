import { Visitor } from "clarity-pattern-parser";
import easings, { EasingNames } from "./easings";
import Keyframe from "./Keyframe";
import cssValue from "./patterns/cssValue";

export interface CssKeyframeConfig {
  property: string;
  to: string;
  from: string;
  endAt?: number;
  startAt?: number;
  controls?: string[];
  easing?: EasingNames | ((percentage: number) => number);
}

const visitor = new Visitor();

const convertValue = (value: string) => {
  const node = cssValue.exec(value);
  if (node == null) {
    return [];
  }

  visitor
    .setRoot(node)
    .selectRoot()
    .flatten()
    .clear()
    .select((n) => n.name === "optional-spaces")
    .remove()
    .clear()
    .select((n) => n.name === "spaces")
    .transform((n) => {
      n.value = " ";
      return n;
    });

  return node.children.map((n) => {
    if (n.name === "number") {
      return parseFloat(n.value);
    } else {
      return n.value;
    }
  });
};

export default class CssKeyframe extends Keyframe<(string | number)[]> {
  constructor({
    from,
    to,
    easing = "linear",
    controls = [],
    ...config
  }: CssKeyframeConfig) {
    const toValue = convertValue(to);
    const fromValue = convertValue(from);
    const controlsValues = controls.map((c) => convertValue(c));
    const easingValue = typeof easing === "string" ? easings[easing] : easing;

    super({
      ...config,
      from: fromValue,
      to: toValue,
      controls: controlsValues,
      easing: easingValue,
    });
  }
}
