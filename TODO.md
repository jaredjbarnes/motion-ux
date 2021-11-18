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
export type IMotionState<T> =
  | IValuesMotionState<T>
  | IControlledMotionState<T>
  | ILoopMotionState;

export interface IMotionStateBase {
  duration: number;
  easing: keyof typeof easings;
  segueTo: string;
}

export interface ILoopMotionState<T> extends IMotionStateBase {
  iterationCount: number; //Default Infinity
  duration: number;
  loop: IAnimationConfig<T>;
}

export interface IControlledMotionState<T> extends IMotionStateBase {
  enter: IAnimationConfig<T>;
  leave: IAnimationConfig<T>;
}

export interface IValuesMotionState<T> extends IMotionStateBase {
  values: IAnimationConfig<T>;
}

export interface IAnimationConfig<T> {
  [key in keyof T]: T[key] | IKeyframes<T[key]>;
}

export interface IKeyframes<TValue> {
  [key: string]: TValue | IKeyframeControls<TValue>;
  from: TValue | IKeyframeControls<TValue>;
  to: TValue | IKeyframeControls<TValue>;
}

export interface IKeyframeControls<TValue> {
  value: TValue;
  controlsIn?: TValue[];
  controlsOut?: TValue[];
  easeIn?: DynamicEasingNames;
  easeOut?: DynamicEasingNames;
}


const config: IMotionState = {
  opened: {
    duration: 1000,
    values: {
      background: "rgba()",
      opacity: 1,
      color: "rgba()"
    }
  },
  closed: {
    duration: 1000
    enter: {
      background: "rgba(255, 255, 255, 0)",
      opacity: {
        from: 0.5,
        to: 1
      },
      color: {
        from: {
          value: "rgba()",
          controlsIn: ["rgba()"]
        },
        to: {

        }
      }
    }
  }
}

// Gets converted to
const config: IMotionState = {
  opened: {
    duration: 1000,
    values: {
      background: {
        from: {
          value: "rgba()"
        },
        to: {
          value: "rgba()"
        }
      },
      opacity:  {
        from: {
          value: 1
        },
        to: {
          value: 1
        }
      },
      color: {
        from: {
          value: "rgba()"
        },
        to: {
          value: "rgba()"
        }
      }Î
    }
  },
  closed: {
    duration: 1000
    enter: {
      background: "rgba(255, 255, 255, 0)",
      opacity: {
        from: 0.5,
        to: 1
      },
      color: {
        from: {
          value: "rgba()",
          controlsIn: ["rgba()"]
        },
        to: {

        }
      }
    }
  }
}



```
