import Animation, { IAnimation } from "./Animation";
import Player from "./Player";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";
declare function defaultOnComplete(): void;
export default class Motion<T> {
    protected setOnFirst: boolean;
    protected currentDuration: number;
    protected keyframeGenerator: KeyframeGenerator;
    protected observer: TimeObserver<any> | null;
    protected player: Player;
    animation: IAnimation<T> | null;
    constructor(render: (animation: IAnimation<T>) => void, setOnFirst?: boolean, player?: Player);
    inject(animation: IAnimation<T>): this;
    segueTo(animation: IAnimation<T>, duration?: number, easing?: EasingFunction, onComplete?: typeof defaultOnComplete): void;
    segueToLoop(animation: IAnimation<T>, duration?: number, easing?: EasingFunction): void;
    stop(): this;
    play(): this;
    protected makeAnimationFromLastValues(values: any): Animation<T>;
}
export {};
