import BezierCurve from "./BezierCurve";
import Keyframe from "./Keyframe";

export default class Animator<T> {
  public keyframe: Keyframe<T>;
  public bezierCurve: BezierCurve;
  public time: number;

  constructor(keyframe: Keyframe<T>) {
    this.keyframe = keyframe;
    this.time = 0;
    this.bezierCurve = new BezierCurve([]);
  }

  traverse(keyframe: { from: any; controls: any; to: any; result: any }) {

    if (typeof keyframe.from === "string") {
      if (this.time >= this.keyframe.startAt) {
        keyframe.result = keyframe.to;
      } else {
        keyframe.result = keyframe.from;
      }
    } else if (typeof keyframe.from === "number") {
      const elapsedTime = this.time - this.keyframe.startAt;
      const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
      const timeWithEasing = this.keyframe.easing(
        elapsedTime / animationDuration
      );
      const points = [keyframe.from, ...keyframe.controls, keyframe.to];
      this.bezierCurve.setPoints(points);
      keyframe.result = this.bezierCurve.valueAt(timeWithEasing);
    } else if (typeof keyframe.from === "object" && keyframe.from != null) {
      Object.keys(keyframe.from).forEach((key)=>{
        this.traverse({
          from: keyframe.from[key],
          to: keyframe.to[key],
          controls: keyframe.controls[key],
          result: keyframe.result[key]
        });
      });
    }

    // Object.keys(fromObject).forEach((key) => {
    //   const from = fromObject[key];
    //   const to = toObject[key];
    //   if (typeof from === "number") {
    //     const elapsedTime = this.time - this.keyframe.startAt;
    //     const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
    //     const timeWithEasing = this.keyframe.easing(
    //       elapsedTime / animationDuration
    //     );
    //     const controls = controlsObject.map((c: any) => c[key]);
    //     const points = [from, ...controls, to];
    //     this.bezierCurve.setPoints(points);
    //     resultObject[key] = this.bezierCurve.valueAt(timeWithEasing);
    //   } else if (typeof from === "string") {
    //     if (this.time >= this.keyframe.startAt) {
    //       resultObject[key] = to;
    //     } else {
    //       resultObject[key] = from;
    //     }
    //   } else if (typeof from === "object" && from != null) {
    //     this.traverse(
    //       fromObject[key],
    //       controlsObject[key],
    //       toObject[key],
    //       resultObject[key]
    //     );
    //   }
    // });
  }

  update(time: number) {
    this.time = time;

    this.traverse(this.keyframe);

    return this.keyframe.result;
  }
}
