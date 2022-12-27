import ObjectOperator from "../ObjectOperator";

describe("ObjectOperator", ()=>{
  test("Add", ()=>{
    const left = {
      propA: 1,
      propB: 1
    };

    const right = {
      propA: 2,
      propB: 3
    }

    const result = {
      propA: 0,
      propB: 0
    };

    const objectOperator = new  ObjectOperator();
    objectOperator.add(left, right, result);

    expect(result.propA).toBe(3);
    expect(result.propB).toBe(4);

  });
});