import IAnimation, { AnimationState } from "./IAnimation";
import { PlayerState } from "./Player";
export default class ExtendedAnimation<T> implements IAnimation<T> {
    private animation;
    private animationDuration;
    private playerState;
    private extendedDuration;
    private slopeAnimation;
    private offset;
    currentValues: AnimationState<T>;
    name: string;
    constructor(animation: IAnimation<T>, animationDuration: number, offset: number, playerState: PlayerState, extendedDuration?: number);
    update(time: number): this;
    clone(): ExtendedAnimation<T>;
}
