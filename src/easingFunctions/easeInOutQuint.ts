export default (percentage: number) => {
  if ((percentage /= 1 / 2) < 1)
    return (
      (1 / 2) * percentage * percentage * percentage * percentage * percentage
    );
  return (
    (1 / 2) *
    ((percentage -= 2) * percentage * percentage * percentage * percentage + 2)
  );
};
