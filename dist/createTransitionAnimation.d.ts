import { IAnimation } from "./Animation";
import BlendedAnimation from "./BlendedAnimation";
export declare function createTransitionAnimation<T extends {}>(fromAnimation: IAnimation<T>, toAnimation: IAnimation<T>, duration: number): BlendedAnimation<T>;
