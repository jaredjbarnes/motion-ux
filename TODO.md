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
      controlsIn: [],
      easeIn: "",
      duration: 1000,
    },
    display: {
      value: 0,
      controlsIn: [],
      easeIn: "",
      duration: 1000,
    },
  },
  close: {
    opacity: {
      value: 0,
      controlsIn: [],
      easeIn: "",
      duration: 1000,
    },
    display: {
      value: 0,
      controlsIn: [],
      easeIn: "",
      duration: 1000,
    },
  },
};

makeAnimation({});
makeLoop({});
makeStatefulMotion();
makeTransition({});

makeStatefulMotion({x
  open: {
    in: {
      keyframes: {
        from: {
          opacity: {
            value: 0,
            easeOut: "quad",
            controlsOut: [1],
          }
        },
        "50%": {
          opacity: 1
        },
        to: {}
      },
      duration: 1000,
    },
    out: {
      values: {
        opacity: 1
      },
      duration: 1000
    },
  },
  closed: {
    opacity: 0
  },
  bounce: {
    loop: {
      keyframes: {
        from: {},
        to: {}
      }
    }
  }
});
```

THIS IS THE NEWEST OCT 28
This allows for the properties that need to be animated to be on different keyframes.
This will reduce the redundancy that happens when you declare

```ts
const useMotion = makeMotion({
  open: {
    transitionDuration: 1000,
    values: {
      backgroundColor: "rgba(0,0,0,0)",
      opacity: 1,
    },
  },
  closed: {
    transitionDuration: 2000,
    values: {
      backgroundColor: "rgba(255,255,255,0)",
      opacity: 1,
    },
  },
});
```

```ts
export interface IKeyframeControls<T> {
  value: T;
  controlsIn?: T[];
  controlsOut?: T[];
  easeIn?: DynamicEasingNames;
  easeOut?: DynamicEasingNames;
}

export interface IAnimationConfig<T> {
  [key: string]: T | IKeyframes<T>;
}
export interface IKeyframes<T> {
  [key: string]: T | IKeyframeControls<T>;
  from: T | IKeyframeControls<T>;
  to: T | IKeyframeControls<T>;
}

export interface IKeyframesConstrained<T> {
  [key: string]: IKeyframeControls<T>;
  from: IKeyframeControls<T>;
  to: IKeyframeControls<T>;
}

interface IMotionStateBase {
  transitionDuration: number;
  transitionEasing: keyof typeof easings;
  segueTo: string;
}

interface ILoopMotionState extends IMotionStateBase {
  duration: number;
  iterationCount: number; //Default Infinity
  loop: IAnimationConfig;
}

interface IControlledMotionState extends IMotionStateBase {
  enter: IAnimationConfig;
  leave: IAnimationConfig;
}

interface IControlledMotionState<T> extends IMotionStateBase {
  values: {
    [key in keyof T]: T[key];
  };
}
```
