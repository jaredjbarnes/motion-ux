import { IAnimation } from "./Animation";
export default class SlopeAnimationBuilder {
    private direction;
    private newDuration;
    private duration;
    private offset;
    delta: number;
    private animation;
    private slopeAnimation;
    private deltaStepValues;
    private deltaValues;
    private nowValues;
    private toValues;
    private scaleValues;
    private dynamicValues;
    private cloneValues;
    build<T>(animation: IAnimation<T>, duration: number, offset: number, extendDurationBy: number, direction?: number): IAnimation<T>;
    private getSafeDuration;
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
