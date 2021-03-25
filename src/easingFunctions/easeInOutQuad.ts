export default (percentage: number) => {
  if ((percentage /= 1 / 2) < 1) return (1 / 2) * percentage * percentage;
  return (-1 / 2) * (--percentage * (percentage - 2) - 1);
};
