import { Visitor } from "clarity-pattern-parser";
import easings, { EasingNames } from "./easings";
import Keyframe from "./Keyframe";
import cssValue from "./patterns/cssValue";

export interface CssKeyframeConfig {
  name: string;
  property: string;
  to: string;
  from: string;
  endAt?: number;
  startAt?: number;
  controls?: string[];
  easing?: EasingNames;
}

const visitor = new Visitor();

const convertToValue = (value: string) => {
  const node = cssValue.exec(value);
  if (node == null) {
    return [];
  }

  visitor
    .setRoot(node)
    .selectRoot()
    .flatten()
    .deselectNode(node)
    .select((n) => n.name === "spaces")
    .remove();

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
    const toValue = convertToValue(to);
    const fromValue = convertToValue(from);
    const controlsValues = controls.map((c) => convertToValue(c));
    const easingValue = easings[easing];

    super({
      ...config,
      from: fromValue,
      to: toValue,
      controls: controlsValues,
      easing: easingValue,
    });
  }
}
