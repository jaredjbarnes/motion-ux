import easeInBounce from "./easeInBounce.js";
import easeOutBounce from "./easeOutBounce.js";

export default (percentage) => {
  if (percentage < 0.5) {
    return easeInBounce(percentage * 2) * 0.5;
  } else {
    return easeOutBounce(percentage * 2 - 1) * 0.5 + 0.5;
  }
};
