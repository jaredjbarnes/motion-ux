export default (percentage: number) => {
  return -Math.cos(percentage * (Math.PI / 2)) + 1;
};
