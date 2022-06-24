import { CompositeNode, Cursor, Visitor } from "clarity-pattern-parser";
import BezierCurve from "./BezierCurve";
import Animation, { AnimationState, IAnimation } from "./Animation";
import easings, { EasingFunction } from "./easings";
import Keyframe from "./Keyframe";
import { path } from "./patterns/path";

const visitor = new Visitor();

export class PathAnimation implements IAnimation<{ x: number; y: number }> {
  protected easing: EasingFunction;
  protected position = { x: 0, y: 0 };
  protected pathString: string;
  protected _currentValues = {
    x: 0,
    y: 0,
  };
  protected _deltaValues = {
    x: 0,
    y: 0,
  };

  readonly xBezierCurves: BezierCurve[] = [];
  readonly yBezierCurves: BezierCurve[] = [];

  name: string = "";

  get curveCount() {
    return this.xBezierCurves.length;
  }

  get currentValues(): { x: number; y: number } {
    return this._currentValues;
  }

  get deltaValues(): AnimationState<number> {
    return this._deltaValues;
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

    tree.children.forEach((n, index) => {
      (this as any)[n.name](n);
    });
  }

  private moveTo(n: CompositeNode) {
    const xValue = Number(n.children[1].value);
    const yValue = Number(n.children[2].value);

    this.position.x = xValue;
    this.position.y = yValue;
  }

  private absoluteVerticalLine(n: CompositeNode) {
    const yValue = Number(n.children[1].value);
    const y = new BezierCurve([this.position.y, yValue]);
    const x = new BezierCurve([this.position.x, this.position.x]);

    this.position.y = yValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
  }

  private relativeVerticalLine(n: CompositeNode) {
    const yValue = Number(n.children[1].value) + this.position.y;
    const y = new BezierCurve([this.position.y, yValue]);
    const x = new BezierCurve([this.position.x, this.position.x]);

    this.position.y = yValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
  }

  private absoluteHorizontalLine(n: CompositeNode) {
    const xValue = Number(n.children[1].value);
    const x = new BezierCurve([this.position.x, xValue]);
    const y = new BezierCurve([this.position.y, this.position.y]);
    this.position.x = xValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
  }

  private relativeHorizontalLine(n: CompositeNode) {
    const xValue = Number(n.children[1].value) + this.position.x;
    const x = new BezierCurve([this.position.x, xValue]);
    const y = new BezierCurve([this.position.y, this.position.y]);

    this.position.x = xValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
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

    const x = new BezierCurve([startXValue, xControl1, xControl2, endXValue]);
    const y = new BezierCurve([startYValue, yControl1, yControl2, endYValue]);

    this.position.x = endXValue;
    this.position.y = endYValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
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

    const x = new BezierCurve([startXValue, xControl1, xControl2, endXValue]);
    const y = new BezierCurve([startYValue, yControl1, yControl2, endYValue]);

    this.position.x = endXValue;
    this.position.y = endYValue;

    this.xBezierCurves.push(x);
    this.yBezierCurves.push(y);
  }

  update(time: number): IAnimation<{ x: number; y: number }> {
    const length = this.xBezierCurves.length;
    const parts = 1 / length;
    const adjustedTime = this.easing(time);
    const index = Math.max(
      Math.min(Math.floor(adjustedTime / parts), length - 1),
      0
    );
    const indexTime = (adjustedTime % parts) / parts;

    const x = this.xBezierCurves[index].valueAt(indexTime);
    const y = this.yBezierCurves[index].valueAt(indexTime);
    const deltaX = this.xBezierCurves[index].deltaAt(indexTime);
    const deltaY = this.yBezierCurves[index].deltaAt(indexTime);

    this._currentValues.x = x;
    this._currentValues.y = y;
    this._deltaValues.x = deltaX;
    this._deltaValues.y = deltaY;

    return this;
  }

  clone(): IAnimation<{ x: number; y: number }> {
    return new PathAnimation(this.pathString, this.easing);
  }
}
