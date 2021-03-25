import easeOutBounce from "./easeOutBounce";

export default (percentage: number) => {
  return 1 - easeOutBounce(1 - percentage);
};
