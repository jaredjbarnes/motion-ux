import BezierCurve from "./BezierCurve";
import { Path } from "./SvgPath";

export interface Position {
  x: number;
  y: number;
}

export type BezierCurvePoints = [Position, Position, Position];

export class PointPath implements Path {
  private _xCurves: BezierCurve[] = [];
  private _yCurves: BezierCurve[] = [];

  get xCurves(): readonly BezierCurve[] {
    return this._xCurves;
  }

  get yCurves(): readonly BezierCurve[] {
    return this.yCurves;
  }

  get curveCount(): number {
    return this._xCurves.length;
  }

  constructor(startPosition: Position, points: BezierCurvePoints[]) {
    const position = startPosition;

    points.forEach((point) => {
      const xPoints = [];
      const yPoints = [];

      xPoints.push(position.x);
      yPoints.push(position.y);

      xPoints.concat(point.map((p) => p.x));
      yPoints.concat(point.map((p) => p.y));

      position.x = point[2].x;
      position.y = point[2].y;

      this._xCurves.push(new BezierCurve(xPoints));
      this._yCurves.push(new BezierCurve(yPoints));
    });
  }
}
