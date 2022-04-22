import { ICssAnimatedProperties } from "./CssKeyframesGenerator";
import Animation from "./Animation";
export declare function createCssAnimation<T>(animatedProperties: ICssAnimatedProperties<T>, duration: number): Animation<(string | number)[]>;
