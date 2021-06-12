import { CssKeyframe, Animation } from "../src";
import "./mux_player";
import { MuxPlayer } from "./mux_player";

const player = new MuxPlayer();
const animation = new Animation(
  "first",
  CssKeyframe.createKeyframes({
    from: {
      position: "absolute",
      left: {
        value: "25%",
        easeOut: "quad",
      },
      top: "0px"
    },
    to: {
      position: "absolute",
      left: {
        value: "75%",
        easeIn: "quad",
      },
    },
  })
);

player.animation = animation;
document.body.appendChild(player);
