import Animation, { IAnimation } from "./Animation";
import { EasingFunction } from "./easings";
export default class BlendedAnimation<T extends {}> extends Animation<T> {
    fromAnimation: IAnimation<T>;
    toAnimation: IAnimation<T>;
    properties: string[];
    private easing;
    constructor(fromAnimation: IAnimation<T>, toAnimation: IAnimation<T>, easing?: EasingFunction);
    updateKeyframes(): void;
    update(time: number): this;
    clone(): BlendedAnimation<T>;
}
