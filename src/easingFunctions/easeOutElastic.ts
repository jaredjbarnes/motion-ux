export default (percentage: number) => {
  const p = 0.3 / 1;
  const s = p / 4;
  const a = 1;

  if (percentage <= 0) return 0;
  if (percentage >= 1) return 1;

  return (
    a *
      Math.pow(2, -10 * percentage) *
      Math.sin(((percentage - s) * (2 * Math.PI)) / p) +
    1
  );
};
