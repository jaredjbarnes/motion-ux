export default (percentage) => {
  return percentage == 1 ? 1 : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
};
