import Timeline from "./Timeline";

export default class TimelineTransition {
  constructor(player) {
    this.player = player;
  }

  transitionTo(timeline, duration, easing) {}
}

const timeline = new TimelineTransition({
  player, // The player you are currently running.
  timeline, // The timeline you want to ease into.
  duration, // The duration of the new timeline.
  easing, // An easing while transitioning, not the animation easing.
});

// Stateful motion.
const useTransition = createStatefulTransition({
  off: {
    animations: [
      {
        name: "divRef",
        property: "color",
        initialValue: "rgba(0,0,0,1)", // Default value is the value.
        value: "rgba(0,0,0,1)",
        easing: "easeIn", // Default linear
        startAt: 0.25, // Default 0
        endAt: 1, // Default 1
      },
    ],
    duration: 300,
    repeat: Infinity,
    repeatDirection: Timeline.repeatDirection.ALTERNATE
  },
  on: {
    animations: [
      {
        name: "divRef",
        property: "color",
        initialValue: "rgba(255,255,255,1)", // Default value is the value.
        value: "rgba(255,255,255,1)",
        controls: ["rgba(255,0,0,1)"],
        easing: "easeIn",
        startAt: 0.25,
        endAt: 1,
      },
    ],
    duration: 300,
  },
});
