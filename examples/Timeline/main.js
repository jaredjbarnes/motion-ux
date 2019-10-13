import Timeline from "../../src/Timeline.js";
import easings from "../../src/easings.js";

const div = document.createElement("div");
const cardSideA = document.createElement("div");
const cardSideB = document.createElement("div");

div.innerText = "Text";

cardSideB.style.backgroundColor = "blue";
cardSideB.style.top = "300px";
cardSideB.style.left = "150px";
cardSideA.style.top = "300px";
cardSideA.style.left = "150px";

document.body.appendChild(div);
document.body.appendChild(cardSideA);
document.body.appendChild(cardSideB);

const timeline = new Timeline({
  animations: [
    {
      target: div.style,
      name: "background-color",
      from: "rgba(0,255,0,1)",
      to: "rgba(255,0,0,1)",
      startAt: 0,
      endAt: 0.5,
      easing: easings.linear
    },
    {
      target: div.style,
      name: "font-size",
      from: "14px",
      to: "50px",
      startAt: 0,
      endAt: 1,
      easing: easings.linear
    },
    {
      target: div.style,
      name: "background-color",
      from: "rgba(255,0,0,1)",
      to: "rgba(0,0,255,1)",
      startAt: 0.5,
      endAt: 1,
      easing: easings.easeOutBounce
    },
    {
      target: div.style,
      name: "transform",
      from: "translate(0px,0px) rotate(0deg)",
      to: "translate(400px,400px) rotate(720deg)",
      startAt: 0,
      endAt: 0.75,
      easing: easings.easeOutElastic
    },
    {
      target: div.style,
      name: "width",
      from: "100px",
      to: "400px",
      startAt: 0,
      endAt: 1,
      easing: easings.easeOutExpo
    },
    {
      target: div.style,
      name: "height",
      from: "100px",
      to: "400px",
      startAt: 0,
      endAt: 1,
      easing: easings.easeOutElastic
    },
    {
      target: cardSideA.style,
      name: "transform",
      from: "rotateY(0deg) scaleX(1)",
      to: "rotateY(180deg) scaleX(3)",
      startAt: 0,
      endAt: 0.35,
      easing: easings.easeInOutQuad
    },
    {
      target: cardSideB.style,
      name: "transform",
      from: "rotateY(180deg) scaleX(1)",
      to: "rotateY(360deg) scaleX(3)",
      startAt: 0,
      endAt: 0.35,
      easing: easings.easeInOutQuad
    },
    {
      target: cardSideA.style,
      name: "border-radius",
      from: "0%",
      to: "50%",
      startAt: 0,
      endAt: 0.75,
      easing: easings.linear
    },
    {
      target: cardSideB.style,
      name: "border-radius",
      from: "0%",
      to: "50%",
      startAt: 0,
      endAt: 0.75,
      easing: easings.linear
    }
  ],
  duration: 5000
});

timeline.repeat = Infinity;
timeline.repeatDirection = Timeline.repeatDirections.ALTERNATE;

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
