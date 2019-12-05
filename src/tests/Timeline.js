import Timeline from "../Timeline.js";

exports["Timeline: Get current values as 0."] = () => {
  const target = {};

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "opacity",
        startAt: 0,
        endAt: 1,
        from: "0",
        to: "1"
      }
    ],
    duration: 1000
  });

 const values = timeline.getValuesAt(0);
};
