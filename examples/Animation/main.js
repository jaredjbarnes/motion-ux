import "../../dist/index.browser.js";

const { easings, Animation, Player, createDynamicEasing } = motionUX;
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

// const animation = new Animation([
//   {
//     name: "circle",
//     property: "transform",
//     from: "scale(1) translate(0px, 0px)",
//     to: "scale(1) translate(1500px , 1500px)",
//     startAt: 0,
//     endAt: 0.5,
//     easing: "easeInOutQuad",
//   },
//   {
//     name: "circle",
//     property: "transform",
//     from: "scale(1) translate(1500px, 1500px)",
//     to: "scale(1) translate(0px , 0px)",
//     startAt: 0.5,
//     endAt: 1,
//     easing: "easeInOutQuad",
//   },
//   {
//     name: "circle",
//     property: "background",
//     from: "rgba(80,80,255)",
//     to: "rgba(80,80,255)",
//     startAt: 0,
//     endAt: 1,
//     easing: "easeOutExpo",
//   },
// ]);

// const secondAnimation = new Animation([
//   {
//     name: "circle",
//     property: "transform",
//     from: "scale(1) translate(1500px, 0px)",
//     controls: [
//       "scale(1) translate(300px, 0px)",
//       "scale(1) translate(300px, 300px)",
//     ],
//     to: "scale(1) translate(1500px, 300px)",
//     startAt: 0,
//     endAt: 0.5,
//   },
//   {
//     name: "circle",
//     property: "transform",
//     from: "scale(1) translate(1500px, 300px)",
//     controls: [
//       "scale(1) translate(0px, 300px)",
//       "scale(1) translate(0px, 0px)",
//     ],
//     to: "scale(1) translate(1500px, 0px)",
//     startAt: 0.5,
//     endAt: 1,
//   },
//   {
//     name: "circle",
//     property: "background",
//     to: "rgba(255,0,0)",
//     from: "rgba(255,0,0)",
//     startAt: 0,
//     endAt: 1,
//     easing: "easeOutExpo",
//   },
// ]);

// const pulseAnimation = Animation.fromKeyframes("circle", {
//   from: {
//     background: "rgb(255,255,0)",
//     transform: {
//       value: "scale(1) translate(500px, 500px)",
//       easeOut: "quad",
//     },
//   },
//   "50%": {
//     background: "rgb(255,255,0)",
//     transform: {
//       value: "scale(2) translate(500px, 500px)",
//       easeIn: "quad",
//       easeOut: "quad",
//     },
//   },
//   to: {
//     background: "rgb(255,255,0)",
//     transform: {
//       value: "scale(1) translate(500px, 500px)",
//       easeIn: "quad",
//     },
//   },
// });

const leftToRight = Animation.fromKeyframes("circle", {
  from: {
    transform: {
      value: "translate(0px, 0px)",
      easeOut: "quad",
    },
  },
  "50%": {
    transform: {
      value: "translate(500px, 500px)",
      easeIn: "quad",
      easeOut: "quad",
    },
  },
  to: {
    transform: {
      value: "translate(0px, 0px)",
      easeIn: "quad",
    },
  },
});

const rightToLeft = Animation.fromKeyframes("circle", {
  from: {
    transform: {
      value: "translate(500px, 0px)",
      easeOut: "quad",
    },
  },
  "50%": {
    transform: {
      value: "translate(0px, 500px)",
      easeIn: "quad",
      easeOut: "quad",
    },
  },
  to: {
    transform: {
      value: "translate(500px, 0px)",
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

let onAnimation = 1;
const DURATION = 5000;
const player = new Player();
player.animation = leftToRight;
player.duration = DURATION;
player.render = render;
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
      leftToRight,
      DURATION,
      DURATION,
      createDynamicEasing("quad", "back")
    );
  } else {
    onAnimation = 0;
    player.transitionToAnimation(
      rightToLeft,
      DURATION,
      DURATION,
      createDynamicEasing("quad", "back")
    );
  }

  const innerObserver = player.observeTime(1, () => {
    const at = Math.random();
    observer = player.observeTime(at, callback);
    innerObserver.dispose();
  });
}

let observer = player.observeTime(0.5, callback);

//player.time = 1;
player.play();

window.player = player;
window.createDynamicEasing();
