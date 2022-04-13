import IAnimation from "./IAnimation";
import Player from "./Player";
import { EasingFunction } from "./easings";
export default class Motion<T> {
    protected player: Player<any>;
    constructor(render: (animation: IAnimation<T>) => void);
    segueTo(animation: IAnimation<T>, easing?: EasingFunction): void;
    segueToLoop(animation: IAnimation<T>, easing?: EasingFunction): void;
    stop(): void;
    play(): void;
}
