declare type Visitor = (object: any) => number;
export default class ObjectVisitor {
    private visitor;
    constructor(callback?: Visitor);
    visit(object: any): void;
    private walk;
    setVisitor(visitor: Visitor): void;
}
export {};
