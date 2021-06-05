import IAnimation, { AnimationState } from "./IAnimation";
import Player from "./Player";
export default class ExtendedAnimation<T> implements IAnimation<T> {
    private animation;
    private slopeAnimation;
    private offset;
    private player;
    currentValues: AnimationState<T>;
    name: string;
    constructor(player: Player, extendedDuration?: number);
    update(time: number): this;
}
