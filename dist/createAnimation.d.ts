import { IAnimatedProperties } from "./KeyframesGenerator";
import Animation from "./Animation";
export declare function createAnimation<T extends {}>(animatedProperties: IAnimatedProperties<T>): Animation<T>;
