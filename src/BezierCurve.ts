const defaultPoints: number[] = [];

export default class BezierCurve {
  points: number[] = defaultPoints;
  reducedPoints: number[] = defaultPoints;

  constructor(points: number[]) {
    this.setPoints(points);
  }

  setPoints(points: number[]) {
    this.points = points;
    this.reducedPoints = new Array(points.length);

    Object.freeze(this.points);
  }

  valueAt(percentage: number) {
    const points = this.points;
    const reducedPoints = this.reducedPoints;
    const length = points.length;

    for (let x = 0; x < length; x++) {
      reducedPoints[x] = points[x];
    }

    for (let x = 0; x < length; x++) {
      const innerLength = length - x - 1;

      for (let y = 0; y < innerLength; y++) {
        const nextPoint = reducedPoints[y + 1];
        const point = reducedPoints[y];

        reducedPoints[y] = (nextPoint - point) * percentage + point;
      }
    }

    return reducedPoints[0];
  }

  clone() {
    return new BezierCurve(this.points.slice());
  }
}
