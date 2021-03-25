import { ValueNode } from "clarity-pattern-parser";
import { CompositeNode } from "clarity-pattern-parser";
export default class HexColor {
    hexString: any;
    rgba: any;
    constructor(hexString: string);
    setHex(hexString: string): void;
    saveRgba(): void;
    toComplexNode(): CompositeNode;
    toValueNode(): ValueNode;
    toRgbString(): string;
    normalizeHex(): void;
    numberToHex(number: number): string;
    toHexString(): string;
}
