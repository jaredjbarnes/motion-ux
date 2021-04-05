import Observable from "./Observable";
import { IClock } from "./IClock";
import { EasingFunction } from "./easings";
import Animation from "./Animation";
export declare type RepeatDirection = 0 | 1;
export declare type States = 1 | -1 | 0;
export interface PlayerOptions {
    clock?: IClock;
    duration: number;
    repeatDirection: RepeatDirection;
    states: States;
    timeScale: number;
    render: () => void;
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
    _animation: any;
    _clock: any;
    _state: any;
    _render: any;
    _slopeAnimationBuilder: any;
    constructor(animation: Animation, { clock, duration, timeScale, repeatDirection, render }: PlayerOptions);
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
    get animation(): any;
    set animation(animation: any);
    get iterations(): any;
    play(): void;
    tick(): void;
    stepForward(): void;
    stepBackward(): void;
    seek(time: number): void;
    stop(): void;
    reverse(): void;
    transitionToAnimation(animation: Animation, duration: number, easing: EasingFunction): this;
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
