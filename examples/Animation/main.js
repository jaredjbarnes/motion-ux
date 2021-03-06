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

const upToDown = new Animation(
  "third",
  CssKeyframe.createKeyframes({
    from: {
      transform: {
        value: "translate(250px, 0px)",
        easeOut: "quad",
      },
    },
    "50%": {
      transform: {
        value: "translate(250px, 500px)",
        easeIn: "quad",
        easeOut: "quad",
      },
    },
    to: {
      transform: {
        value: "translate(250px, 0px)",
        easeIn: "quad",
      },
    },
  })
);

const sideToSide = new Animation(
  "sixth",
  CssKeyframe.createKeyframes({
    from: {
      transform: {
        value: "translate(0px, 250px)",
        easeOut: "quad",
      },
    },
    "50%": {
      transform: {
        value: "translate(500px, 250px)",
        easeIn: "quad",
        easeOut: "quad",
      },
    },
    to: {
      transform: {
        value: "translate(0px, 250px)",
        easeIn: "quad",
      },
    },
  })
);

const stationary = new Animation(
  "fourth",
  CssKeyframe.createKeyframes({
    from: {
      transform: "translate(250px, 250px)",
    },
    to: {
      transform: "translate(250px, 250px)",
    },
  })
);

const rightUpToDown = new Animation(
  "fifth",
  CssKeyframe.createKeyframes({
    from: {
      transform: {
        value: "translate(500px, 0px)",
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
        value: "translate(500px, 0px)",
        easeIn: "quad",
      },
    },
  })
);

const quarterCircle = new Animation(
  "seven",
  CssKeyframe.createKeyframes({
    from: {
      transform: {
        value: "translate(250px, 0px)",
        controlsOut: ["translate(338px, 0px)"],
      },
    },
    "25%": {
      transform: {
        value: "translate(500px, 250px)",
        controlsIn: ["translate(500px, 112px)"],
        controlsOut: ["translate(500px, 388px)"],
      },
    },
    "50%": {
      transform: {
        value: "translate(250px, 500px)",
        controlsIn: ["translate(388px, 500px)"],
        controlsOut: ["translate(112px, 500px)"],
      },
    },
    "75%": {
      transform: {
        value: "translate(0px, 250px)",
        controlsIn: ["translate(0px, 388px)"],
        controlsOut: ["translate(0px, 112px)"],
      },
    },
    to: {
      transform: {
        value: "translate(250px, 0px)",
        controlsIn: ["translate(112px, 0px)"],
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

const ANIMATION_DURATION = 1000;

const statefulMotion = new StatefulMotion();
statefulMotion.player.render = render;
statefulMotion.registerStates({
  first: {
    animation: leftToRight,
    iterationCount: 3,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
    segueTo: "second",
  },
  second: {
    animation: rightToLeft,
    iterationCount: 4,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
    segueTo: "third",
  },
  third: {
    animation: upToDown,
    iterationCount: Infinity,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
  },
  fourth: {
    animation: stationary,
    iterationCount: 1,
    duration: 0,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
  },
  fifth: {
    animation: rightUpToDown,
    iterationCount: Infinity,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
  },
  sixth: {
    animation: sideToSide,
    iterationCount: Infinity,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
  },
  seven: {
    animation: quarterCircle,
    iterationCount: Infinity,
    duration: ANIMATION_DURATION,
    transitionEasing: "easeOutQuad",
    transitionDuration: ANIMATION_DURATION,
  },
});

statefulMotion.changeState("first");

window.statefulMotion = statefulMotion;
const states = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seven",
];

function change() {
  const delay = Math.random() * 3000;
  setTimeout(() => {
    const index = Math.floor(Math.random() * states.length);
    statefulMotion.changeState(states[index]);
    change();
  }, delay);
}

change();
