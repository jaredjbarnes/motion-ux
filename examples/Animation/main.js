import "../../dist/index.browser.js";

const { Animation, StatefulMotion, CssKeyframe } = motionUX;
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

const leftToRight = new Animation(
  "first",
  CssKeyframe.createKeyframes({
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
  })
);

const rightToLeft = new Animation(
  "second",
  CssKeyframe.createKeyframes({
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
  })
);

function render(animation) {
  const values = animation.currentValues;
  Object.keys(values).forEach((key) => {
    circleWithBezier.style[key] = values[key].join("");
  });
}

const statefulMotion = new StatefulMotion();
statefulMotion.player.render = render;
statefulMotion.registerStates({
  first: {
    animation: leftToRight,
    iterationCount: Infinity,
    duration: 3000,
    transitionEasing: "linear",
    transitionDuration: 3000,
  },
  second: {
    animation: rightToLeft,
    iterationCount: Infinity,
    duration: 3000,
    transitionEasing: "linear",
    transitionDuration: 3000,
  },
});

statefulMotion.changeState("first");

window.statefulMotion = statefulMotion;
