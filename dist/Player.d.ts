import Observable from "./Observable";
import { IClock } from "./IClock";
import { EasingFunction } from "./easings";
import Animation from "./Animation";
export declare type RepeatDirection = 0 | 1;
export declare type PlayerState = 1 | -1 | 0;
export interface PlayerOptions {
    clock?: IClock;
    duration?: number;
    repeatDirection?: RepeatDirection;
    timeScale?: number;
    render?: (animation: Animation) => void;
}
export default class Player extends Observable {
    _timeScale: number;
    _time: number;
    _step: any;
    _duration: number;
    _lastTimestamp: number;
    _animationFrame: any;
    _iterations: any;
    _repeat: any;
    _repeatDirection: any;
    _animation: Animation;
    _clock: any;
    _state: any;
    _render: any;
    _slopeAnimationBuilder: any;
    constructor(animation: Animation, options?: PlayerOptions);
    get time(): number;
    get timeScale(): number;
    set timeScale(value: number);
    get duration(): number;
    set duration(value: number);
    get repeat(): any;
    set repeat(value: any);
    get repeatDirection(): RepeatDirection;
    set repeatDirection(value: RepeatDirection);
    get state(): any;
    get animation(): Animation;
    set animation(animation: Animation);
    get render(): (animation: Animation) => void;
    set render(render: (animation: Animation) => void);
    get iterations(): any;
    play(): this;
    private tick;
    private stepForward;
    private stepBackward;
    seek(time: number): this;
    stop(): this;
    reverse(): this;
    transitionToAnimation(animation: Animation, duration: number, transitionDuration?: number, transitionEasing?: EasingFunction): this;
    dispose(): void;
    static get repeatDirections(): {
        DEFAULT: number;
        ALTERNATE: number;
    };
    static get states(): {
        FORWARD: number;
        REVERSE: number;
        STOPPED: number;
    };
}
