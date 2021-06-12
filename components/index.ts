import { CssKeyframe, Animation } from "../src";
import "./mux_player";
import { MuxPlayer } from "./mux_player";

const player = new MuxPlayer();
const animation = new Animation(
  "first",
  CssKeyframe.createKeyframes({
    from: {
      position: "absolute",
      left:"25%",
    },
    to: {
      position: "absolute",
      left: {
        value: "75%",
        easeIn: "elastic",
      },
    },
  })
);

player.animation = animation;
document.body.appendChild(player);
