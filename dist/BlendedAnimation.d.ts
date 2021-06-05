import Animation from "./Animation";
import IAnimation from "./IAnimation";
import { EasingFunction } from "./easings";
export default class BlendedAnimation<T> extends Animation<T> {
    fromAnimation: any;
    toAnimation: any;
    properties: string[];
    private easing;
    constructor(fromAnimation: IAnimation<T>, toAnimation: IAnimation<T>, easing?: EasingFunction);
    updateKeyframes(): void;
    update(time: number): this;
    clone(): BlendedAnimation<T>;
}
