export declare type DynamicEasingNames = "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic" | "linear";
export default function createDynamicEasing(easingIn: DynamicEasingNames, easingOut: DynamicEasingNames): (percentage: number) => number;
