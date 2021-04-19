import "../../dist/index.browser.js";

const { easings, Animation, Player } = motionUX;
const circleWithBezier = document.createElement("div");

circleWithBezier.style.borderRadius = "50% 50%";
circleWithBezier.style.boxShadow = "0 5px 5px rgba(0,0,0,0.5)";
circleWithBezier.style.transformOrigin = "center center";
circleWithBezier.style.display = "flex";
circleWithBezier.style.alignItems = "center";
circleWithBezier.style.justifyContent = "center";
circleWithBezier.innerHTML = "0";

const referenceCircle = document.createElement("div");
referenceCircle.style.backgroundColor = "blue";
referenceCircle.style.width = "300px";
referenceCircle.style.height = "300px";

document.body.appendChild(circleWithBezier);

const animation = new Animation([
  {
    name: "circle",
    property: "transform",
    from: "scale(1) translate(0px, 0px)",
    to: "scale(1) translate(150px , 150px)",
    startAt: 0,
    endAt: 0.5,
    easing: "easeInOutQuad",
  },
  {
    name: "circle",
    property: "transform",
    from: "scale(1) translate(150px, 150px)",
    to: "scale(1) translate(0px , 0px)",
    startAt: 0.5,
    endAt: 1,
    easing: "easeInOutQuad",
  },
  {
    name: "circle",
    property: "background",
    from: "rgba(80,80,255)",
    to: "rgba(80,80,255)",
    startAt: 0,
    endAt: 1,
    easing: "easeOutExpo",
  },
]);

const secondAnimation = new Animation([
  {
    name: "circle",
    property: "transform",
    from: "scale(1) translate(150px, 0px)",
    controls: [
      "scale(1) translate(300px, 0px)",
      "scale(1) translate(300px, 300px)",
    ],
    to: "scale(1) translate(150px, 300px)",
    startAt: 0,
    endAt: 0.5,
  },
  {
    name: "circle",
    property: "transform",
    from: "scale(1) translate(150px, 300px)",
    controls: [
      "scale(1) translate(0px, 300px)",
      "scale(1) translate(0px, 0px)",
    ],
    to: "scale(1) translate(150px, 0px)",
    startAt: 0.5,
    endAt: 1,
  },
  {
    name: "circle",
    property: "background",
    to: "rgba(255,0,0)",
    from: "rgba(255,0,0)",
    startAt: 0,
    endAt: 1,
    easing: "easeOutExpo",
  },
]);

const pulseAnimation = Animation.fromKeyframes("circle", {
  from: {
    background: "rgb(255,255,0)",
    transform: {
      value: "scale(1) translate(50px, 50px)",
      easeOut: "quad",
    },
  },
  "50%": {
    background: "rgb(255,255,0)",
    transform: {
      value: "scale(2) translate(50px, 50px)",
      easeIn: "quad",
      easeOut: "quad",
    },
  },
  to: {
    background: "rgb(255,255,0)",
    transform: {
      value: "scale(1) translate(50px, 50px)",
      easeIn: "quad",
    },
  },
});

function render(animation) {
  const values = animation.getCurrentValues();
  Object.keys(values.circle).forEach((key) => {
    circleWithBezier.style[key] = values.circle[key].value;
  });
}

let onAnimation = 0;

const player = new Player(animation, { render, duration: 750 });
player.repeat = Infinity;

player.observeTime(1, () => {
  circleWithBezier.innerHTML = player.iterations;
});

player.observeTime(0, () => {
  circleWithBezier.innerHTML = player.iterations;
});

function callback() {
  observer.dispose();

  if (onAnimation === 0) {
    onAnimation = 1;
    player.transitionToAnimation(
      secondAnimation,
      1500,
      1500,
      easings.easeOutBack
    );
  } else if (onAnimation === 1) {
    onAnimation = 2;
    player.transitionToAnimation(animation, 1500, 1500, easings.easeOutBack);
  } else {
    onAnimation = 0;
    player.transitionToAnimation(
      pulseAnimation,
      1500,
      1500,
      easings.easeOutBack
    );
  }

  const innerObserver = player.observeTime(1, () => {
    const at = Math.random();
    observer = player.observeTime(at, callback);
    innerObserver.dispose();
  });
}

let observer = player.observeTime(0.5, callback);

player.play();

window.animation = animation;
window.secondAnimation = secondAnimation;
window.player = player;
