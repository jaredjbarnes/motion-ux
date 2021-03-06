export default (percentage: number) => {
  if (percentage == 0) return 0;
  if (percentage == 1) return 1;
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * Math.pow(2, 10 * (percentage - 1));
  return (1 / 2) * (-Math.pow(2, -10 * --percentage) + 2);
};
