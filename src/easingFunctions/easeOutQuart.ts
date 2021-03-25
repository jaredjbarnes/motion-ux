export default (percentage: number) => {
  return (
    -1 *
    ((percentage = percentage / 1 - 1) * percentage * percentage * percentage -
      1)
  );
};
