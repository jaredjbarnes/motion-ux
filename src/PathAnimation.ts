import { CompositeNode, Cursor, Visitor } from "clarity-pattern-parser";
import Animation, { AnimationState, IAnimation } from "./Animation";
import easings, { EasingFunction } from "./easings";
import Keyframe from "./Keyframe";
import { path } from "./patterns/path";

const visitor = new Visitor();

export class PathAnimation implements IAnimation<number> {
  private easing: EasingFunction;
  private animation: Animation<number>;
  private position = { x: 0, y: 0 };
  private pathString: string;

  name: string = "";

  get currentValues(): AnimationState<number> {
    return this.animation.currentValues;
  }

  constructor(pathString: string, easing: EasingFunction = easings.linear) {
    const tree = path.parse(new Cursor(pathString));
    this.pathString = pathString;

    visitor
      .setRoot(tree)
      .selectRoot()
      .clear()
      .select((n) => n.name === "optional-spaces")
      .remove()
      .clear()
      .select((n) => n.name === "spaces")
      .remove()
      .clear()
      .select((n) => n.name === "divider")
      .remove();

    if (tree == null) {
      throw new Error("Invalid path.");
    }

    this.easing = easing;
    let length = tree.children.filter((n) => n.name != "moveTo").length;
    let moveToAmount = 0;

    const keyframes = tree.children.reduce((acc, n, index) => {
      const currentIndex = index - moveToAmount;

      if (n.name === "moveTo") {
        moveToAmount++;
      }

      const nextIndex = index + 1 - moveToAmount;

      const results = (this as any)[n.name](
        n,
        length > 0 ? currentIndex / length : 0,
        length > 0 ? nextIndex / length : 0
      );
      return acc.concat(results);
    }, []);

    this.animation = new Animation("path", keyframes);
  }

  private moveTo(n: CompositeNode, startAt: number, endAt: number) {
    const xValue = Number(n.children[1].value);
    const yValue = Number(n.children[2].value);

    const x = new Keyframe({
      property: "x",
      from: xValue,
      to: xValue,
      startAt,
      endAt,
    });

    const y = new Keyframe({
      property: "y",
      from: yValue,
      to: yValue,
      startAt: startAt,
      endAt: endAt,
    });

    this.position.x = xValue;
    this.position.y = yValue;

    return [x, y];
  }

  private absoluteVerticalLine(
    n: CompositeNode,
    startAt: number,
    endAt: number
  ) {
    const yValue = Number(n.children[1].value);

    const y = new Keyframe({
      property: "y",
      from: this.position.y,
      to: yValue,
      startAt: startAt,
      endAt: endAt,
    });

    this.position.y = yValue;

    return [y];
  }

  private relativeVerticalLine(
    n: CompositeNode,
    startAt: number,
    endAt: number
  ) {
    const yValue = Number(n.children[1].value) + this.position.y;

    const y = new Keyframe({
      property: "y",
      from: this.position.y,
      to: yValue,
      startAt: startAt,
      endAt: endAt,
    });

    this.position.y = yValue;

    return [y];
  }

  private absoluteHorizontalLine(
    n: CompositeNode,
    startAt: number,
    endAt: number
  ) {
    const xValue = Number(n.children[1].value);

    const x = new Keyframe({
      property: "x",
      from: this.position.x,
      to: xValue,
      startAt,
      endAt,
    });

    this.position.x = xValue;

    return [x];
  }

  private relativeHorizontalLine(
    n: CompositeNode,
    startAt: number,
    endAt: number
  ) {
    const xValue = Number(n.children[1].value) + this.position.x;

    const x = new Keyframe({
      property: "x",
      from: this.position.x,
      to: xValue,
      startAt,
      endAt,
    });

    this.position.x = xValue;

    return [x];
  }

  private absoluteCurvedLine(n: CompositeNode, startAt: number, endAt: number) {
    const startXValue = this.position.x;
    const startYValue = this.position.y;

    const xControl1 = Number(n.children[1].value);
    const yControl1 = Number(n.children[2].value);

    const xControl2 = Number(n.children[3].value);
    const yControl2 = Number(n.children[4].value);

    const endXValue = Number(n.children[5].value);
    const endYValue = Number(n.children[6].value);

    const x = new Keyframe({
      property: "x",
      from: startXValue,
      to: endXValue,
      controls: [xControl1, xControl2],
      startAt,
      endAt,
    });

    const y = new Keyframe({
      property: "y",
      from: startYValue,
      to: endYValue,
      controls: [yControl1, yControl2],
      startAt: startAt,
      endAt: endAt,
    });

    this.position.x = endXValue;
    this.position.y = endYValue;

    return [x, y];
  }

  private relativeCurvedLine(n: CompositeNode, startAt: number, endAt: number) {
    const startXValue = this.position.x;
    const startYValue = this.position.y;

    const xControl1 = Number(n.children[1].value + startXValue);
    const yControl1 = Number(n.children[2].value + startYValue);

    const xControl2 = Number(n.children[3].value + startXValue);
    const yControl2 = Number(n.children[4].value + startYValue);

    const endXValue = Number(n.children[5].value + startXValue);
    const endYValue = Number(n.children[6].value + startYValue);

    const x = new Keyframe({
      property: "x",
      from: startXValue,
      to: endXValue,
      controls: [xControl1, xControl2],
      startAt,
      endAt,
    });

    const y = new Keyframe({
      property: "y",
      from: startYValue,
      to: endYValue,
      controls: [yControl1, yControl2],
      startAt: startAt,
      endAt: endAt,
    });

    this.position.x = endXValue;
    this.position.y = endYValue;

    return [x, y];
  }

  update(time: number): IAnimation<number> {
    const adjustedTime = this.easing(time);
    this.animation.update(adjustedTime);

    return this;
  }

  extend(): IAnimation<number>{
    throw new Error();
  }

  clone(): IAnimation<number> {
    return new PathAnimation(this.pathString, this.easing);
  }
}
