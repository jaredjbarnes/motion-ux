import { IAnimatedProperties } from "./CssKeyframesGenerator";
import Animation from "./Animation";
export declare function createCssAnimation<T>(animatedProperties: IAnimatedProperties<T>, duration: number): Animation<(string | number)[]>;
