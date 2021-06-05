import IAnimation from "./IAnimation";
import { PlayerState } from "./Player";
export default class SlopeAnimationBuilder {
    direction: number;
    newDuration: number;
    duration: number;
    offset: number;
    delta: number;
    animation: IAnimation<any>;
    slopeAnimation: IAnimation<any>;
    deltaStepValues: any;
    deltaValues: any;
    nowValues: any;
    toValues: any;
    scaleValues: any;
    dynamicValues: any;
    private cloneValues;
    build<T>(animation: IAnimation<T>, offset: number, duration: number, newDuration: number, direction: PlayerState): IAnimation<T>;
    private cacheValues;
    private cacheDeltaStepValues;
    private cacheScaleValues;
    private cacheDeltaValueForward;
    private cacheDeltaValueStopped;
    private calculate;
    private calculatePrimitive;
    private calculateObject;
    private createSlopeTimeline;
}
