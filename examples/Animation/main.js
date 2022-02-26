import "../../dist/index.browser.js";
const { StatefulMotion } = motionUX;

const ANIMATION_DURATION = 1000;
const first = {
  "@segueTo": "second",
  "@loop": {
    iterationCount: 3,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(0px, 0px)",
          easeOut: "quad",
        },
        "50%": {
          value: "translate(500px, 500px)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "translate(0px, 0px)",
          easeIn: "quad",
        },
      },
    },
  },
};

const second = {
  "@segueTo": "third",
  "@loop": {
    iterationCount: 4,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(500px, 0px)",
          easeOut: "quad",
        },
        "50%": {
          value: "translate(0px, 500px)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "translate(500px, 0px)",
          easeIn: "quad",
        },
      },
    },
  },
};

const third = {
  "@loop": {
    iterationCount: Infinity,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(250px, 0px)",
          easeOut: "quad",
        },
        "50%": {
          value: "translate(250px, 500px)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "translate(250px, 0px)",
          easeIn: "quad",
        },
      },
    },
  },
};

const fourth = {
  "@loop": {
    iterationCount: Infinity,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(0px, 250px)",
          easeOut: "quad",
        },
        "50%": {
          value: "translate(500px, 250px)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "translate(0px, 250px)",
          easeIn: "quad",
        },
      },
    },
  },
};

const fifth = {
  "@values": {
    transform: "translate(250px, 250px)",
  }
};

const sixth = {
  "@loop": {
    iterationCount: Infinity,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(500px, 0px)",
          easeOut: "quad",
        },
        "50%": {
          value: "translate(500px, 500px)",
          easeIn: "quad",
          easeOut: "quad",
        },
        to: {
          value: "translate(500px, 0px)",
          easeIn: "quad",
        },
      }
    }
  },
};

const seven = {
  "@loop": {
    iterationCount: Infinity,
    easing: "easeOutQuad",
    duration: ANIMATION_DURATION,
    keyframes: {
      transform: {
        from: {
          value: "translate(250px, 0px)",
          controlsOut: ["translate(338px, 0px)"],
        },
        "25%": {
          value: "translate(500px, 250px)",
          controlsIn: ["translate(500px, 112px)"],
          controlsOut: ["translate(500px, 388px)"],
        },
        "50%": {
          value: "translate(250px, 500px)",
          controlsIn: ["translate(388px, 500px)"],
          controlsOut: ["translate(112px, 500px)"],
        },
        "75%": {
          value: "translate(0px, 250px)",
          controlsIn: ["translate(0px, 388px)"],
          controlsOut: ["translate(0px, 112px)"],
        },
        to: {
          value: "translate(250px, 0px)",
          controlsIn: ["translate(112px, 0px)"],
        },
      },
    },
  },
};

const eight = {
  "@enter": {
    keyframes: {
      transform: {
        from: "translate(300px, 300px)",
        to: {
          value: "translate(800px, 300px)",
          easeIn: "expo",
        },
      },
    }

  },
  "@leave": {
    keyframes: {
      transform: {
        from: {
          value: "translate(800px, 300px)",
          easeOut: "expo",
        },
        to: "translate(300px, 300px)",
      },
    }
  },
};

class StatefulAnimation {
  constructor(id) {
    this.timeoutId = null;

    const circleWithBezier = document.createElement("div");

    circleWithBezier.style.backgroundColor = this.getRandomColor();
    circleWithBezier.style.borderRadius = "50% 50%";
    circleWithBezier.style.boxShadow = "0 5px 5px rgba(0,0,0,0.5)";
    circleWithBezier.style.transformOrigin = "center center";
    circleWithBezier.style.display = "flex";
    circleWithBezier.style.alignItems = "center";
    circleWithBezier.style.justifyContent = "center";
    circleWithBezier.innerHTML = id;
    this.circleWithBezier = circleWithBezier;

    document.body.appendChild(circleWithBezier);

    const statefulMotion = new StatefulMotion();
    statefulMotion.player.render = (animation) => this.render(animation);
    statefulMotion.addStates({
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seven,
      eight,
    });

    statefulMotion.changeState("first");

    this.statefulMotion = statefulMotion;
    this.states = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seven",
      "eight",
    ];
  }

  getRandomColor() {
    const red = Math.round(Math.random() * 255);
    const green = Math.round(Math.random() * 255);
    const blue = Math.round(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue}`;
  }

  render(animation) {
    const values = animation.currentValues;
    Object.keys(values).forEach((key) => {
      this.circleWithBezier.style[key] = values[key].join("");
    });
  }

  change() {
    const states = this.states;
    const statefulMotion = this.statefulMotion;
    const delay = Math.random() * 3000;
    const index = Math.floor(Math.random() * states.length);

    statefulMotion.changeState(states[index]);

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.change();
    }, delay);
  }

  start() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.change();
    }
  }
}

for (let x = 0; x < 10; x++) {
  const animation = new StatefulAnimation(x);
  animation.start();

  window.animation = animation;
}
