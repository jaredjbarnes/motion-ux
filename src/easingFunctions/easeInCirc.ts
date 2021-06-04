export default (percentage: number) => {
  return -(Math.sqrt(1 - percentage * percentage) - 1);
};
