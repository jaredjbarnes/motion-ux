```ts
const pulsing = {
  from: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeOut: "quad",
    },
  },
  "50%": {
    transform: {
      value: "scale(2) translate(0px, 0px)",
      easeIn: "quad",
      easeOut: "quad",
    },
  },
  to: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeIn: "quad",
    },
  },
};

const pacing ={
  from: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeOut: "quad",
    },
  },
  "50%": {
    transform: {
      value: "scale(1) translate(150px, 150px)",
      easeIn: "quad",
      easeOut: "quad",
    },
  },
  to: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeIn: "quad",
    },
  },
};

const shake = {
  from: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeOut: "elastic",
    },
  },
  to: {
    transform: {
      value: "scale(1) translate(0px, 0px)",
      easeIn: "elastic",
    },
  },
};

// This could be react-motion-ux interface.
const animation = {
  pulsing: {
    animation: pulse,
    duration: 1000,
    iterationCount: Infinity // Defaults to 1
    transitionDuration: 700, // These are transition
    transitionEasing: "easeOutBack",
  },
  pacing: {
    animation: pacing,
    duration: 1000,
    iterationCount: Infinity
    transitionEasing: "easeOutBack",
  },
  shaking: {
    animation: shake,
    duration: 1000,
    iterationCount: Infinity,
    transitionEasing: "easeOutBack",
  },
};
```

```ts
const transition = {
  open: {
      opacity: {
        value: 0,
        controlsIn:[],
        easeIn: "",
        duration: 1000
      },
      display: {
        value: 0,
        controlsIn:[],
        easeIn: "",
        duration: 1000
      }
  },
  close: {
      opacity: {
        value: 0,
        controlsIn:[],
        easeIn: "",
        duration: 1000
      },
      display: {
        value: 0,
        controlsIn:[],
        easeIn: "",
        duration: 1000
      }
  }
}

makeAnimation({});
makeTransition({});

```