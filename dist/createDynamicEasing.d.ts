export declare type IEasingNames = "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic" | "linear";
export default function createDynamicEasing(easingIn: IEasingNames, easingOut: IEasingNames): (percentage: number) => any;
