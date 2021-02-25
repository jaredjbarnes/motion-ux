export default (percentage) => {
  const s = 1.70158 * 1.525;

  if ((percentage /= 1 / 2) < 1) {
    return (1 / 2) * (percentage * percentage * ((s + 1) * percentage - s));
  }

  return (
    (1 / 2) * ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2)
  );
};
