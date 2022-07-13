import { createAnimation, Motion } from "../../dist/index.esm.js";

const div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.backgroundColor = "rgba(255, 0, 0, 1)";

const blueButton = document.createElement("button");
const redButton = document.createElement("button");
const greenButton = document.createElement("button");

blueButton.innerHTML = "Blue";
redButton.innerHTML = "Red";
greenButton.innerHTML = "Green";

const red = createAnimation({
  backgroundColor: {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
  },
});

const blue = createAnimation({
  backgroundColor: {
    red: 0,
    green: 0,
    blue: 255,
    alpha: 1,
  },
});

const green = createAnimation({
  backgroundColor: {
    from: {
      red: 0,
      green: 255,
      blue: 0,
      alpha: 0,
    },
    "50%": {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    to: {
      red: 0,
      green: 255,
      blue: 0,
      alpha: 1,
    },
  },
});

const motion = new Motion(({ currentValues }) => {
  const { red, green, blue, alpha } = currentValues.backgroundColor;
  div.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}, true);

motion.segueTo(red, 3000);

document.body.appendChild(div);
document.body.appendChild(blueButton);
document.body.appendChild(redButton);
document.body.appendChild(greenButton);

blueButton.addEventListener("click", () => {
  motion.segueTo(blue, 3000);
});
redButton.addEventListener("click", () => {
  motion.segueTo(red, 3000);
});
greenButton.addEventListener("click", () => {
  motion.segueTo(green, 3000);
});
