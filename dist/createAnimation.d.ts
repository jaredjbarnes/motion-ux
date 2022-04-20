import { IAnimatedProperties } from "./KeyframesGenerator";
import Animation from "./Animation";
export declare function createAnimation<T>(animatedProperties: IAnimatedProperties<T>, duration: number): Animation<T>;
