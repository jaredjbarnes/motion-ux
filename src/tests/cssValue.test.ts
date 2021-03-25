import { Cursor } from "clarity-pattern-parser";
import cssValue from "../patterns/cssValue";

describe("cssValue", () => {
  test("single unit", () => {
    const cursor = new Cursor("0px");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("unit");
    expect(node?.children[0].children[0].children[0].name).toBe("number");
    expect(node?.children[0].children[0].children[1].name).toBe("unit-type");
    expect(node?.children[0].children[0].children[0].value).toBe("0");
    expect(node?.children[0].children[0].children[1].value).toBe("px");
  });

  test("multiple units", () => {
    const cursor = new Cursor("0px 0px");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("unit");
    expect(node?.children[0].children[0].children[0].name).toBe("number");
    expect(node?.children[0].children[0].children[1].name).toBe("unit-type");
    expect(node?.children[0].children[0].children[0].value).toBe("0");
    expect(node?.children[0].children[0].children[1].value).toBe("px");

    expect(node?.children[0].children[2].children[0].name).toBe("number");
    expect(node?.children[0].children[2].children[1].name).toBe("unit-type");
    expect(node?.children[0].children[2].children[0].value).toBe("0");
    expect(node?.children[0].children[2].children[1].value).toBe("px");
  });

  test("three hex", () => {
    const cursor = new Cursor("#000");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("hex");
    expect(node?.children[0].children[0].value).toBe("#000");
  });

  test("six hex", () => {
    const cursor = new Cursor("#000000");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("hex");
    expect(node?.children[0].children[0].value).toBe("#000000");
  });

  test("single name string", () => {
    const cursor = new Cursor("left");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[0].value).toBe("left");
  });

  test("mulitple name string", () => {
    const cursor = new Cursor("top left");

    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[0].value).toBe("top");
    expect(node?.children[0].children[2].name).toBe("name");
    expect(node?.children[0].children[2].value).toBe("left");
  });

  test("empty method", () => {
    const cursor = new Cursor("translate()");
    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("method");
    expect(node?.children[0].children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[0].children[2].name).toBe("close-paren");
  });

  test("method, one argument", () => {
    const cursor = new Cursor("translate(0px)");
    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("method");
    expect(node?.children[0].children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[0].children[2].name).toBe("arguments");
    expect(node?.children[0].children[0].children[3].name).toBe("close-paren");
    expect(node?.children[0].children[0].children[2].children[0].name).toBe(
      "values"
    );
    expect(
      node?.children[0].children[0].children[2].children[0].children[0].name
    ).toBe("unit");
    expect(
      node?.children[0].children[0].children[2].children[0].children[0]
        .children[0].name
    ).toBe("number");
    expect(
      node?.children[0].children[0].children[2].children[0].children[0]
        .children[1].name
    ).toBe("unit-type");
  });

  test("method, mulitple arguments", () => {
    const cursor = new Cursor("translate(0px, 0px)");
    const node = cssValue.parse(cursor);

    expect(node?.name).toBe("css-value");
    expect(node?.children[0].children[0].name).toBe("method");
    expect(node?.children[0].children[0].children[0].name).toBe("name");
    expect(node?.children[0].children[0].children[1].name).toBe("open-paren");
    expect(node?.children[0].children[0].children[2].name).toBe("arguments");
    expect(node?.children[0].children[0].children[3].name).toBe("close-paren");
    expect(node?.children[0].children[0].children[2].children[0].name).toBe(
      "values"
    );
    expect(
      node?.children[0].children[0].children[2].children[0].children[0].name
    ).toBe("unit");
    expect(
      node?.children[0].children[0].children[2].children[0].children[0]
        .children[0].name
    ).toBe("number");
    expect(
      node?.children[0].children[0].children[2].children[0].children[0]
        .children[1].name
    ).toBe("unit-type");
  });

  test("method, mulitple arguments", () => {
    const cursor = new Cursor(
      "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)"
    );
    const node = cssValue.parse(cursor);
  });

  test("multiple methods, mulitple arguments", () => {
    const cursor = new Cursor(
      "linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
    );
    const node = cssValue.parse(cursor);
  });

  test("multiple methods, mulitple arguments, with other cssValue", () => {
    const cursor = new Cursor(
      "#222 linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%) linear-gradient(to bottom, #555, #555 50%, #eee 75%, #555 75%)"
    );
    const node = cssValue.parse(cursor);
  });

  test("method rgba", () => {
    const cursor = new Cursor("rgba(0,0,0,0)");
    const node = cssValue.parse(cursor);
  });

  test("simple svg path.", () => {
    const cursor = new Cursor("M 0 0 C 0 0, 0 0, 0 0");
    const cursor2 = new Cursor("M 300 300 C 20 20, 10 10, 5 5");

    const node = cssValue.parse(cursor);
    const node2 = cssValue.parse(cursor2);
  });

  test("complex svg path.", () => {
    const cursor = new Cursor(
      "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10"
    );
    const cursor2 = new Cursor("M 300 300 C 20 20, 10 10, 5 5");

    const node = cssValue.parse(cursor);
    const node2 = cssValue.parse(cursor2);
  });
});
