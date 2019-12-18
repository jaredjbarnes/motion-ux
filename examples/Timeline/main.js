import "../../dist/main.js";

const { easings, Timeline } = motionUX;
const circleWithBezier = document.createElement("div");

circleWithBezier.style.borderRadius = "50% 50%";
circleWithBezier.style.boxShadow = "0 5px 5px rgba(0,0,0,0.5)";

const referenceCircle = document.createElement("div");
referenceCircle.style.backgroundColor = "blue";
referenceCircle.style.width = "300px";
referenceCircle.style.height = "300px";

document.body.appendChild(circleWithBezier);

const timeline = new Timeline({
  animations: [
    {
      name: "circle",
      property: "transform",
      from: "translate(150px,0px)",
      controls: ["translate(300px,0px)", "translate(300px,150px)"],
      to: "translate(150px,300px)",
      startAt: 0,
      endAt: 1,
      easing: easings.easeOutExpo
    },
    {
      name: "circle",
      property: "background",
      from: "linear-gradient(0deg, rgba(255,0,0,0.8), rgba(255,0,0,0))",
      //controls: ["rgba(0,0,0,0.5)"],
      to: "linear-gradient(720deg, rgba(0,255,0,0.8), rgba(0,255,0,0))",
      startAt: 0,
      endAt: 1,
      easing: easings.easeOutExpo
    }
  ],
  duration: 5000
});

timeline.repeat = 1;
// timeline.repeatDirection = Timeline.repeatDirections.ALTERNATE;

timeline.observeTime(0.75, () => {
  console.log("75");
  //timeline.reverse();
});

timeline.observeTime(0.03, () => {
  console.log("3");
  //timeline.play();
});

timeline.observe("RENDER", ({ animations }) => {
  Object.keys(animations.circle).forEach(key => {
    circleWithBezier.style[key] = animations.circle[key];
  });
});

//timeline.seek(0.35);
timeline.play();

window.timeline = timeline;
