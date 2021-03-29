```ts
const pulse = Animation.fromKeyframes({
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
});

const pulse = Animation.fromKeyframes({
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
});

const shake = Animation.fromKeyframes({
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
});

// This could be react-motion-ux interface.
const statefulMotion = {
  pulsing: {
    animation: pulse,
    duration: 1000,
    blendDuration: 700,
    easing: "easeOutBack",
    iterationCount: Infinity // Defaults to 1
  },
  pacing: {
    animation: pacing,
    duration: 1000,
    easing: "easeOutBack",
    iterationCount: Infinity
  },
  shaking: {
    animation: shake,
    duration: 1000,
    easing: "easeOutBack",
    iterationCount: Infinity,
    // direction: "alternate" | "default"
  },
};
```
