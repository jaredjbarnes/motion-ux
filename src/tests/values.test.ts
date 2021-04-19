import { Cursor } from "clarity-pattern-parser";
import values from "../patterns/values";

describe("Patterns", () => {
  test("single unit", () => {
    const cursor = new Cursor("0px");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("unit");
    expect(node?.children[0].children[0].name).toBe("number");
    expect(node?.children[0].children[1].name).toBe("unit-type");
    expect(node?.children[0].children[0].value).toBe("0");
    expect(node?.children[0].children[1].value).toBe("px");
  });

  test("multiple units", () => {
    const cursor = new Cursor("0px 0px");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("unit");
    expect(node?.children[0].children[0].name).toBe("number");
    expect(node?.children[0].children[1].name).toBe("unit-type");
    expect(node?.children[0].children[0].value).toBe("0");
    expect(node?.children[0].children[1].value).toBe("px");

    expect(node?.children[2].children[0].name).toBe("number");
    expect(node?.children[2].children[1].name).toBe("unit-type");
    expect(node?.children[2].children[0].value).toBe("0");
    expect(node?.children[2].children[1].value).toBe("px");
  });

  test("three hex", () => {
    const cursor = new Cursor("#000");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("hex");
    expect(node?.children[0].value).toBe("#000");
  });

  test("six hex", () => {
    const cursor = new Cursor("#000000");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("hex");
    expect(node?.children[0].value).toBe("#000000");
  });

  test("single name string", () => {
    const cursor = new Cursor("left");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("name");
    expect(node?.children[0].value).toBe("left");
  });

  test("mulitple name string", () => {
    const cursor = new Cursor("top left");

    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("name");
    expect(node?.children[0].value).toBe("top");
    expect(node?.children[2].name).toBe("name");
    expect(node?.children[2].value).toBe("left");
  });

  test("empty method", () => {
    const cursor = new Cursor("translate()");
    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("method");
    expect(node?.children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[2].name).toBe("close-paren");
  });

  test("method, one argument", () => {
    const cursor = new Cursor("translate(0px)");
    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("method");
    expect(node?.children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[2].name).toBe("arguments");
    expect(node?.children[0].children[3].name).toBe("close-paren");
    expect(node?.children[0].children[2].children[0].name).toBe("values");
    expect(node?.children[0].children[2].children[0].children[0].name).toBe(
      "unit"
    );
    expect(
      node?.children[0].children[2].children[0].children[0].children[0].name
    ).toBe("number");
    expect(
      node?.children[0].children[2].children[0].children[0].children[1].name
    ).toBe("unit-type");
  });

  test("method, mulitple arguments", () => {
    const cursor = new Cursor("translate(0px, 0px)");
    const node = values.parse(cursor);

    expect(node?.name).toBe("values");
    expect(node?.children[0].name).toBe("method");
    expect(node?.children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[2].name).toBe("arguments");
    expect(node?.children[0].children[3].name).toBe("close-paren");
    expect(node?.children[0].children[2].children[0].name).toBe("values");
    expect(node?.children[0].children[2].children[0].children[0].name).toBe(
      "unit"
    );
    expect(
      node?.children[0].children[2].children[0].children[0].children[0].name
    ).toBe("number");
    expect(
      node?.children[0].children[2].children[0].children[0].children[1].name
    ).toBe("unit-type");
  });

  test("method, mulitple arguments", () => {
    const cursor = new Cursor(
      "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)"
    );
    const node = values.parse(cursor);
  });

  test("multiple methods, mulitple arguments", () => {
    const cursor = new Cursor(
      "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
    );
    const node = values.parse(cursor);
  });

  test("multiple methods, mulitple arguments, with other values", () => {
    const cursor = new Cursor(
      "#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
    );
    const node = values.parse(cursor);
  });

  test("method rgba", () => {
    const cursor = new Cursor("rgba(0,0,0,0)");
    const node = values.parse(cursor);
  });

  test("radial gradient", () => {
    const cursor = new Cursor(
      "radial-gradient(at 40% 40%, rgba(187,202,218,1) 0%, rgba(187,202,218,1) 20%, rgba(187,202,218,1) 100%)"
    );
    const node = values.parse(cursor);
  });

  test("array", () => {
    const cursor = new Cursor("[0,30,0,0]");
    const node = values.parse(cursor);
    expect(node?.toString()).toBe("[0,30,0,0]");
  });
});
