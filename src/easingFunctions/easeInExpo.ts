export default (percentage: number) => {
  return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
};
