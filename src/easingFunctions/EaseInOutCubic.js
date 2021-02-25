export default (percentage) => {
  if ((percentage /= 1 / 2) < 1)
    return (1 / 2) * percentage * percentage * percentage;
  return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
};
