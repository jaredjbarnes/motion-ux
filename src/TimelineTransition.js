import Timeline from "./Timeline";

export default class TimelineTransition {
  constructor(player) {
    this.player = player;
  }

  transitionTo(name) {
    
  }
}

const timeline = new TimelineTransition(player);

// Stateful motion.
const useTransition = makeStyledTransition({
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
    initial: true,
    duration: 300,
    repeat: Infinity,
    repeatDirection: Player.repeatDirections.ALTERNATE
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
