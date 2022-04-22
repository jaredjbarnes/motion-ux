import IAnimation, { AnimationState } from "./IAnimation";
import Animation from "./Animation";
import Player from "./Player";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";
export default class Motion<T> {
    protected setOnFirst: boolean;
    protected player: Player<T>;
    protected currentDuration: number;
    protected keyframeGenerator: KeyframeGenerator;
    protected observer: TimeObserver<any> | null;
    constructor(render: (animation: IAnimation<T>) => void, setOnFirst?: boolean);
    segueTo(animation: IAnimation<T>, duration?: number, easing?: EasingFunction): void;
    segueToLoop(animation: IAnimation<T>, duration?: number, easing?: EasingFunction): void;
    protected makeAnimationFromLastValues(values: AnimationState<T>): Animation<T>;
    stop(): void;
    play(): void;
}
