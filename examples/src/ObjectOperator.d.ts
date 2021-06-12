import ObjectVisitor from "./ObjectVisitor";
import ObjectsVisitor from "./ObjectsVisitor";
export default class ObjectOperator {
    visitor: ObjectVisitor;
    objectsVisitor: ObjectsVisitor;
    constructor();
    assign<T>(object: T, number: number): void;
    add<T>(left: T, right: T, output: T): void;
    subtract<T>(left: T, right: T, output: T): void;
    multiply<T>(left: T, right: T, output: T): void;
    divide<T>(left: T, right: T, output: T): void;
}
