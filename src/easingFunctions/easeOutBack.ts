export default (percentage: number) => {
  const s = 1.70158;
  return (
    1 *
    ((percentage = percentage / 1 - 1) *
      percentage *
      ((s + 1) * percentage + s) +
      1)
  );
};
