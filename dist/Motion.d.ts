import Animation, { IAnimation } from "./Animation";
import Player from "./Player";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";
export default class Motion<T> {
    protected setOnFirst: boolean;
    protected currentDuration: number;
    protected keyframeGenerator: KeyframeGenerator;
    protected observer: TimeObserver<any> | null;
    protected player: Player;
    animation: IAnimation<T> | null;
    constructor(render: (animation: IAnimation<T>) => void, setOnFirst?: boolean, player?: Player);
    inject(animation: IAnimation<T>): this;
    segueTo(animation: IAnimation<T>, duration?: number, easing?: EasingFunction): void;
    segueToLoop(animation: IAnimation<T>, duration?: number, easing?: EasingFunction): void;
    protected makeAnimationFromLastValues(values: any): Animation<T>;
}
