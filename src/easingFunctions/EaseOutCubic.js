export default (percentage) => {
  return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1);
};
