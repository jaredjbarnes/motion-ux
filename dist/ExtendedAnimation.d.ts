import { IAnimation, AnimationState } from "./Animation";
export default class ExtendedAnimation<T> implements IAnimation<T> {
    private animation;
    private slopeAnimation;
    private offset;
    private duration;
    private extendDurationBy;
    currentValues: AnimationState<T>;
    name: string;
    time: number;
    constructor(animation: IAnimation<T>, duration: number, offset: number, extendDurationBy?: number);
    update(time: number): this;
    clone(): ExtendedAnimation<T>;
}
