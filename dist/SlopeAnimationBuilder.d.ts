import Animation from "./Animation";
import { States } from "./Player";
export default class SlopeAnimationBuilder {
    animation: any;
    slopeAnimation: any;
    direction: any;
    newDuration: any;
    duration: any;
    offset: any;
    delta: any;
    deltaStepValues: any;
    scaledValues: any;
    deltaValues: any;
    nowValues: any;
    diffValues: any;
    derivativeValues: any;
    toValues: any;
    graphOperator: any;
    scaleValues: any;
    constructor();
    private cloneValues;
    build(animation: Animation, offset: number, duration: number, newDuration: number, direction: States): any;
    private cacheValues;
    private cacheDeltaStepValues;
    private cacheScaleValues;
    private cacheDeltaValueForward;
    private cacheDeltaValueBackward;
    private cacheDeltaValueStopped;
    private calculate;
    private createSlopeTimeline;
}
