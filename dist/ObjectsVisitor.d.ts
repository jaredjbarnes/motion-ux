declare type Visitor = (left: number, right: number) => number;
export default class ObjectsVisitor {
    private visitor;
    constructor(callback?: Visitor);
    visit(left: any, right: any, output: any): void;
    private walk;
    setVisitor(visitor: Visitor): void;
}
export {};
