export default (percentage) => {
  return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
};
