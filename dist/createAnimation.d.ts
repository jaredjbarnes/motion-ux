import { IAnimatedProperties, IPercentageKeyframes } from "./KeyframesGenerator";
import Animation from "./Animation";
declare type ExtractType<TProps extends IAnimatedProperties<unknown>> = {
    [P in keyof TProps]: TProps[P] extends IPercentageKeyframes<infer TP> ? TP : TProps[P];
};
export declare function createAnimation<T>(animatedProperties: IAnimatedProperties<T>): Animation<ExtractType<IAnimatedProperties<T>>>;
export {};
