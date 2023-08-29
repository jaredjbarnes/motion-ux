import { ICssAnimatedProperties } from "./CssKeyframesGenerator";
import Animation from "./Animation";
export declare function createCssAnimation<T extends {}>(animatedProperties: ICssAnimatedProperties<T>): Animation<Record<string, (string | number)[]>>;
