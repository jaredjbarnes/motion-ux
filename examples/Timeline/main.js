import "../../dist/main.js";

const { easings, Timeline } = motionUX;
const circleWithBezier = document.createElement("div");

circleWithBezier.style.borderRadius = "50% 50%";
circleWithBezier.style.boxShadow = "0 5px 5px rgba(0,0,0,0.5)";

const referenceCircle = document.createElement("div");
referenceCircle.style.backgroundColor = "blue";
referenceCircle.style.width = "300px";
referenceCircle.style.height = "300px";
document.body.appendChild(referenceCircle);

document.body.appendChild(circleWithBezier);

const timeline = new Timeline({
  animations: [
    {
      target: circleWithBezier.style,
      name: "transform",
      from: "translate(150px,0px)",
      controls: [
        "translate(300px,0px)",
        "translate(300px,0px)"
      ],
      to:"translate(300px,150px)",
      startAt: 0,
      endAt: 0.25,
      easing: easings.linear
    },
    {
      target: circleWithBezier.style,
      name: "transform",
      from: "translate(300px,150px)",
      controls: [
        "translate(300px,300px)",
        "translate(300px,300px)"
      ],
      to: "translate(150px,300px)",
      startAt: 0.25,
      endAt: 0.5,
      easing: easings.linear
    }
  ],
  duration: 5000
});

timeline.repeat = Infinity;
// timeline.repeatDirection = Timeline.repeatDirections.ALTERNATE;

timeline.observeTime(0.75, () => {
  console.log("75");
  //timeline.reverse();
});

timeline.observeTime(0.03, () => {
  console.log("3");
  //timeline.play();
});

//timeline.seek(0.35);
timeline.play();

window.timeline = timeline;
