import { ICssAnimatedProperties } from "./CssKeyframesGenerator";
import Animation from "./Animation";
declare type CssType<T> = {
    [P in keyof T]: (string | number)[];
};
export declare function createCssAnimation<T>(animatedProperties: ICssAnimatedProperties<T>): Animation<CssType<T>>;
export {};
