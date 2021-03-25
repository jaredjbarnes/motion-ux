```ts
const animation = {
  from: {
    fontSize: "10px",
    width: "100%",
    height: "100%",
  },
  "75%": {
    fontSize: "15px",
    width: "300%",
    height: "300%",
  },
  to: {
    fontSize: "20px",
    width: "50%",
    height: "75%",
  },
};
```

Advance values

```ts
const animation = {
  from: {
    fontSize: "10px",
    width: "100%",
    height: "100%",
  },
  "75%": {
    fontSize: "15px",
    width: {
      value: "80%",
      controls: ["25%"],
      easing: "easeOutExpo",
    },
    height: "300%",
  },
  to: {
    fontSize: "20px",
    width: "50%",
    height: "75%",
  },
};
```

```ts
const animation = {
  from: {
    fontSize: "10px",
    width: "100%",
    height: "100%",
  },
  "75%": {
    fontSize: "15px",
    width: {
      value: "80%",
      controls: ["25%"],
      easing: "easeOutExpo",
    },
    height: "300%",
  },
  to: {
    fontSize: "20px",
    width: "50%",
    height: "75%",
  },
};
```

Shortcut to just values

```ts
const animation = {
  to: {
    fontSize: "10px",
    width: "100%",
    height: "100%",
  },
};
```

Stateful Animation

```ts
const animation = {
  off: {
    animation,
    duration,
    iterationCount: 1, // Default 1
    direction: "alternate" // Default normal
    easing: "easeOutExpo" // Default linear
  },
  on: {
    animation: animation2,
    duration
  }
}
```

This will be transformed into this.

```ts
const animation = {
  from: {
    fontSize: "10px",
    width: "100%",
    height: "100%",
  },
  "75%": {
    fontSize: "15px",
    width: "300%",
    height: "300%",
  },
  to: {
    fontSize: "20px",
    width: "50%",
    height: "75%",
  },
};
```

```ts
animations = [
  {
    name: "animation",
    property: "fontSize",
    from: "10px",
    controls: [],
    to: "15px",
    startAt: 0,
    endAt: 0.75,
  },
  {
    name: "animation",
    property: "fontSize",
    from: "15px",
    controls: [],
    to: "20px",
    startAt: 0.75,
    endAt: 1,
  },
  {
    name: "animation",
    property: "width",
    from: "100%",
    controls: [],
    to: "300%",
    startAt: 0,
    endAt: 0.75,
  },
  {
    name: "animation",
    property: "width",
    from: "300%",
    controls: [],
    to: "50%",
    startAt: 0.75,
    endAt: 1,
  },
  {
    name: "animation",
    property: "height",
    from: "100%",
    controls: [],
    to: "300%",
    startAt: 0,
    endAt: 0.75,
  },
  {
    name: "animation",
    property: "height",
    from: "300%",
    controls: [],
    to: "75%",
    startAt: 0.75,
    endAt: 1,
  },
];
```
