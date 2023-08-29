import { IAnimation } from "./Animation";
export default class ExtendedAnimation<T> implements IAnimation<T> {
    private animation;
    private slopeAnimation;
    private offset;
    private duration;
    private extendDurationBy;
    currentValues: T;
    deltaValues: T;
    name: string;
    time: number;
    constructor(animation: IAnimation<T>, duration: number, offset: number, extendDurationBy?: number);
    private getSafeDuration;
    update(time: number): this;
    clone(): ExtendedAnimation<T>;
}
