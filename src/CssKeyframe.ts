import { Visitor } from "clarity-pattern-parser";
import easings from "./easings";
import Keyframe, { KeyframeConfig } from "./Keyframe";
import cssValue from "./patterns/cssValue";

const visitor = new Visitor();

const convertValue = (value: string) => {
  const node = cssValue.exec(String(value));
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

export default class CssKeyframe extends Keyframe<
  Record<string, (string | number)[]>
> {
  constructor({
    from,
    to,
    easing = easings.linear,
    controls = [],
    ...config
  }: KeyframeConfig<Record<string, string>>) {
    const toValue = convertValue(to);
    const fromValue = convertValue(from);
    const controlsValues = controls.map((c) => convertValue(c));

    super({
      ...config,
      from: fromValue,
      to: toValue,
      controls: controlsValues,
      easing,
    });
  }
}
