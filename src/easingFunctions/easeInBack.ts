export default (percentage: number) => {
  const s = 1.70158;
  return percentage * percentage * ((s + 1) * percentage - s);
};
