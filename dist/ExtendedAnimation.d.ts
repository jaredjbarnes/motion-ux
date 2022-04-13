import IAnimation, { AnimationState } from "./IAnimation";
import { PlayerState } from "./Player";
export default class ExtendedAnimation<T> implements IAnimation<T> {
    private animation;
    private playerState;
    private slopeAnimation;
    private offset;
    currentValues: AnimationState<T>;
    name: string;
    time: number;
    duration: number;
    constructor(animation: IAnimation<T>, playerState?: PlayerState, extendDurationBy?: number);
    update(time: number): this;
    clone(): ExtendedAnimation<T>;
}
