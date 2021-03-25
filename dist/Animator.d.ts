import { Node } from "clarity-pattern-parser";
import BezierCurve from "./BezierCurve";
import Keyframe from "./Keyframe";
export default class Animator {
    keyframe: Keyframe;
    time: number;
    bezierCurve: BezierCurve;
    keyframeGraphs: Node[];
    constructor(keyframe: Keyframe);
    private updateKeyframeGraphs;
    visit(nodes: Node[]): void;
    update(time: number): any;
}
