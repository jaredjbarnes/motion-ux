export default (percentage) => {
  return -Math.cos(percentage * (Math.PI / 2)) + 1;
};
