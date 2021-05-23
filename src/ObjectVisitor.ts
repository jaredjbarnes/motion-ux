const emptyFn = () => 0;

type Visitor = (object: any) => number;

export default class ObjectVisitor {
  private visitor: Visitor = emptyFn;

  constructor(callback: Visitor = emptyFn) {
    this.setVisitor(callback);
  }

  visit(object: any) {
    this.walk(object);
  }

  private walk(object: any) {
    if (typeof object === "object" && object != null) {
      for (let key in object) {
        if (typeof object[key] === "number") {
          object[key] = this.visitor(object[key]);
        } else if (typeof object[key] === "object") {
          this.walk(object[key]);
        }
      }
    }
  }

  setVisitor(visitor: Visitor) {
    if (typeof visitor === "function") {
      this.visitor = visitor;
    } else {
      this.visitor = emptyFn;
    }

    this.visitor = visitor;
  }
}
