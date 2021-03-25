export default (percentage: number) => {
  if ((percentage /= 1 / 2) < 1)
    return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
  return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
};
