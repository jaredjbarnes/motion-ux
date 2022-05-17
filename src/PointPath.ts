import BezierCurve from "./BezierCurve";
import { Path } from "./SvgPath";

export class PointPath implements Path {
  private _xCurves: BezierCurve[] = [];
  private _yCurves: BezierCurve[] = [];

  get xCurves(): readonly BezierCurve[] {
    return this._xCurves;
  }

  get yCurves(): readonly BezierCurve[] {
    return this._yCurves;
  }

  get curveCount(): number {
    return this._xCurves.length;
  }

  constructor(points: number[]) {
    const position = [points[0], points[1]];

    if ((points.length - 2) % 6 !== 0) {
      throw new Error("Needs to be two more than a factor of six.");
    }

    for (let i = 2; i < points.length; i += 6) {
      this._xCurves.push(
        new BezierCurve([position[0], points[i], points[i + 2], points[i + 4]])
      );

      this._yCurves.push(
        new BezierCurve([
          position[1],
          points[i + 1],
          points[i + 3],
          points[i + 5],
        ])
      );
      position[0] = points[i + 4];
      position[1] = points[i + 5];
    }
  }
}
