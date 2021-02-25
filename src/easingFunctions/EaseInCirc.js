export default (percentage) => {
  return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
};
