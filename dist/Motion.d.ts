import Animation, { IAnimation } from "./Animation";
import Player from "./Player";
import KeyframeGenerator from "./KeyframesGenerator";
declare function defaultOnComplete(): void;
export default class Motion<T extends {}> {
    protected currentDuration: number;
    protected keyframeGenerator: KeyframeGenerator;
    protected player: Player;
    protected animation: IAnimation<T>;
    protected animationAfterSegue: IAnimation<T>;
    protected onComplete: typeof defaultOnComplete;
    constructor(render: (animation: IAnimation<T>) => void, initialValue: T, duration?: number);
    inject(animation: IAnimation<T>): this;
    segueTo(to: IAnimation<T>, duration?: number, onComplete?: typeof defaultOnComplete): this;
    segueToLoop(to: IAnimation<T>, duration?: number, onComplete?: typeof defaultOnComplete): this;
    private createTransition;
    stop(): this;
    play(): this;
    protected makeAnimationFromValues(values: any): Animation<T>;
}
export {};
