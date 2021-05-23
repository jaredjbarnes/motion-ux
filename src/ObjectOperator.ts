import ObjectVisitor from "./ObjectVisitor";
import ObjectsVisitor from "./ObjectsVisitor";

const add = (left: number, right: number) => {
  return left + right;
};

const subtract = (left: number, right: number) => {
  return left - right;
};

const multiply = (left: number, right: number) => {
  return left * right;
};

const divide = (left: number, right: number) => {
  return left / right;
};

export default class ObjectOperator {
  public visitor: ObjectVisitor;
  public objectsVisitor: ObjectsVisitor;

  constructor() {
    this.objectsVisitor = new ObjectsVisitor();
    this.visitor = new ObjectVisitor();
  }

  assign<T>(object: T, number: number) {
    this.visitor.setVisitor(() => {
      return number;
    });

    this.visitor.visit(object);
  }

  add<T>(left: T, right: T, output: T) {
    this.objectsVisitor.setVisitor(add);
    this.objectsVisitor.visit(left, right, output);
  }

  subtract<T>(left: T, right: T, output: T) {
    this.objectsVisitor.setVisitor(subtract);
    this.objectsVisitor.visit(left, right, output);
  }

  multiply<T>(left: T, right: T, output: T) {
    this.objectsVisitor.setVisitor(multiply);
    this.objectsVisitor.visit(left, right, output);
  }

  divide<T>(left: T, right: T, output: T) {
    this.objectsVisitor.setVisitor(divide);
    this.objectsVisitor.visit(left, right, output);
  }
}
