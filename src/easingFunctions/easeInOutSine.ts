export default (percentage: number) => {
  return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
};
