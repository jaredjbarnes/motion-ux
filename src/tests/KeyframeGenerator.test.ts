import KeyframesGenerator from "../KeyframesGenerator";

describe("KeyframeGenerator", () => {
  test("Simple test", () => {
    const keyframeGenerator = new KeyframesGenerator();
    const keyframes = keyframeGenerator.generate({
      backgroundColor: "rgba(0,0,0,0)",
      opacity: 1,
    });

    expect(keyframes.length).toBe(2);

    expect(keyframes[0].property).toBe("backgroundColor");
    expect(keyframes[0].from).toBe("rgba(0,0,0,0)");
    expect(keyframes[0].to).toBe("rgba(0,0,0,0)");
    expect(keyframes[0].controls.length).toBe(0);
    expect(keyframes[0].startAt).toBe(0);
    expect(keyframes[0].endAt).toBe(1);

    expect(keyframes[1].property).toBe("opacity");
    expect(keyframes[1].from).toBe(1);
    expect(keyframes[1].to).toBe(1);
    expect(keyframes[1].controls.length).toBe(0);
    expect(keyframes[1].startAt).toBe(0);
    expect(keyframes[1].endAt).toBe(1);
  });

  test("Custom Percentages.", () => {
    const keyframeGenerator = new KeyframesGenerator();
    const keyframes = keyframeGenerator.generate({
      backgroundColor: {
        from: "rgba(0,0,0,0)",
        "50%": "rgba(0,0,0,0.5)",
        to: "rgba(0,0,0,1)",
      },
      opacity: {
        from: 0,
        "50%": 0.5,
        to: 1,
      },
    });

    expect(keyframes.length).toBe(4);

    expect(keyframes[0].property).toBe("backgroundColor");
    expect(keyframes[0].from).toBe("rgba(0,0,0,0)");
    expect(keyframes[0].to).toBe("rgba(0,0,0,0.5)");
    expect(keyframes[0].controls.length).toBe(0);
    expect(keyframes[0].startAt).toBe(0);
    expect(keyframes[0].endAt).toBe(0.5);

    expect(keyframes[1].property).toBe("backgroundColor");
    expect(keyframes[1].from).toBe("rgba(0,0,0,0.5)");
    expect(keyframes[1].to).toBe("rgba(0,0,0,1)");
    expect(keyframes[1].controls.length).toBe(0);
    expect(keyframes[1].startAt).toBe(0.5);
    expect(keyframes[1].endAt).toBe(1);

    expect(keyframes[2].property).toBe("opacity");
    expect(keyframes[2].from).toBe(0);
    expect(keyframes[2].to).toBe(0.5);
    expect(keyframes[2].controls.length).toBe(0);
    expect(keyframes[2].startAt).toBe(0);
    expect(keyframes[2].endAt).toBe(0.5);

    expect(keyframes[3].property).toBe("opacity");
    expect(keyframes[3].from).toBe(0.5);
    expect(keyframes[3].to).toBe(1);
    expect(keyframes[3].controls.length).toBe(0);
    expect(keyframes[3].startAt).toBe(0.5);
    expect(keyframes[3].endAt).toBe(1);
  });

  test("Complex easings Percentages.", () => {
    const keyframeGenerator = new KeyframesGenerator();
    const keyframes = keyframeGenerator.generate({
      backgroundColor: {
        from: {
          value: "rgba(0,0,0,0)",
          easeOut: "quad",
        },
        "50%": {
          value: "rgba(0,0,0,0.5)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "rgba(0,0,0,1)",
          easeIn: "quad",
        },
      }
    });

    expect(keyframes.length).toBe(4);

    expect(keyframes[0].property).toBe("backgroundColor");
    expect(keyframes[0].from).toBe("rgba(0,0,0,0)");
    expect(keyframes[0].to).toBe("rgba(0,0,0,0.5)");
    expect(keyframes[0].controls.length).toBe(0);
    expect(keyframes[0].startAt).toBe(0);
    expect(keyframes[0].endAt).toBe(0.5);

    expect(keyframes[1].property).toBe("backgroundColor");
    expect(keyframes[1].from).toBe("rgba(0,0,0,0.5)");
    expect(keyframes[1].to).toBe("rgba(0,0,0,1)");
    expect(keyframes[1].controls.length).toBe(0);
    expect(keyframes[1].startAt).toBe(0.5);
    expect(keyframes[1].endAt).toBe(1);

  });
});
