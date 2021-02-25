import easeOutBounce from "./easeOutBounce.js";

export default (percentage) => {
  return 1 - easeOutBounce(1 - percentage);
};
