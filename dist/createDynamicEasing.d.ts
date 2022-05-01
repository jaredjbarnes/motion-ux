export declare const easingOutMap: {
    linear: number[];
    quad: number[];
    cubic: number[];
    quart: number[];
    back: number[];
    quint: number[];
    expo: number[];
    circ: number[];
    elastic: number[];
};
export declare const easingInMap: {
    linear: number[];
    quad: number[];
    cubic: number[];
    quart: number[];
    back: number[];
    quint: number[];
    expo: number[];
    circ: number[];
    elastic: number[];
};
export declare type DynamicEasingNames = keyof typeof easingInMap;
export default function createDynamicEasing(easingIn: DynamicEasingNames, easingOut: DynamicEasingNames): (percentage: number) => number;
