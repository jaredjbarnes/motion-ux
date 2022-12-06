// Because decimals are hard in javascript.
export function approximatelyEqual(a: number, b: number) {
  const difference = Math.abs(a - b);
  return difference < 0.01;
}