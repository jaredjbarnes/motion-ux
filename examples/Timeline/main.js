import "../../dist/main.js";

const { easings, Timeline, Player } = motionUX;
const circleWithBezier = document.createElement("div");

circleWithBezier.style.borderRadius = "50% 50%";
circleWithBezier.style.boxShadow = "0 5px 5px rgba(0,0,0,0.5)";
circleWithBezier.style.display = "flex";
circleWithBezier.style.alignItems = "center";
circleWithBezier.style.justifyContent = "center";
circleWithBezier.innerHTML = "8";

const referenceCircle = document.createElement("div");
referenceCircle.style.backgroundColor = "blue";
referenceCircle.style.width = "300px";
referenceCircle.style.height = "300px";

document.body.appendChild(circleWithBezier);

const timeline = new Timeline([
  {
    name: "circle",
    property: "transform",
    from: "translate(     150px,   0px )",
    controls: ["translate(    300px , 0px)", "translate(300px   ,     150px)"],
    to: "translate(150px , 300px)",
    startAt: 0,
    endAt: 1,
    easing: "easeOutExpo",
  },
  {
    name: "circle",
    property: "background",
    from: "linear-gradient(0deg, rgba(255,    0,0,0.8), rgba(  255,0,0,0))",
    //controls: ["rgba(0,0,0,0.5)"],
    to: "linear-gradient(720deg, rgba(0,255,0,    0.8), rgba(0, 255 ,0,0))",
    startAt: 0,
    endAt: 1,
    easing: "easeOutExpo",
  },
  {
    name: "circle",
    property: "color",
    from: "#fff",
    to: "#000",
    startAt: 0,
    endAt: 1,
    easing: "easeOutExpo",
  },
]);

const player = new Player(timeline, { duration: 1500 });
player.repeat = 2;
player.repeatDirection = Player.repeatDirections.ALTERNATE;

player.observeTime(0.99, () => {
  console.log("99");
});

player.observeTime(0.03, () => {
  console.log("3");
});

player.observeTime(0.5, () => {
  console.log("5");
});

player.observe("RENDER", ({ timeline }) => {
  const animations = timeline.getCurrentValues();
  Object.keys(animations.circle).forEach((key) => {
    circleWithBezier.style[key] = animations.circle[key].value;
  });
});

player.play();

window.timeline = timeline;
window.player = player;
