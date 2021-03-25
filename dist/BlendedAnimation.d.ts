import Animation from "./Animation";
import { EasingFunction } from "./easings";
export default class BlendedAnimation extends Animation {
    fromAnimation: any;
    toAnimation: any;
    constructor(fromAnimation: Animation, toAnimation: Animation, easing: EasingFunction);
    update(time: number): this;
}
