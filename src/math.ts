// https://en.wikipedia.org/wiki/Simpson%27s_rule
export function simpsonsRule(
  lowerBound: number,
  upperBound: number,
  f: (x: number) => number,
  n: number = 4
) {
  let stripAmount = f(lowerBound);
  const stepAmount = (upperBound - lowerBound) / n;
  let currentX = lowerBound;

  for (let x = 0; x < n - 1; x++) {
    currentX += stepAmount;
    let coefficient = 4;

    if (x % 2 !== 0) {
      coefficient = 2;
    }

    stripAmount += coefficient * f(currentX);
  }

  stripAmount += f(upperBound);

  return (stepAmount / 3) * stripAmount;
}

// https://en.wikipedia.org/wiki/Bernstein_polynomial
export function bernsteinPolynomial(v: number, n: number, x: number) {
  if (v > n || v < 0) {
    return 0;
  }

  // https://en.wikipedia.org/wiki/Binomial_coefficient
  const binomialCoefficient = nChooseK(n, v);

  // This is almost a 10 times faster than math.pow.
  let tValue = x;
  for (let i = 1; i < v; i++) {
    tValue *= x;
  }
  tValue = v <= 0 ? 1 : tValue;

  const remainder = 1 - x;
  let remainingT = remainder;
  for (let i = 1; i < n - v; i++) {
    remainingT *= remainder;
  }
  remainingT = n - v <= 0 ? 1 : remainingT;

  return binomialCoefficient * tValue * remainingT;
}

// We cache factorials so we can save on computations.
const factorialCache = new Map<number, number>();

// https://en.wikipedia.org/wiki/Factorial
export function factorial(num: number) {
  const cache = factorialCache.get(num);

  if (cache != null){
    return cache;
  }

  let result = 1;
  for (let i = 2; i <= num; i++) result = result * i;

  factorialCache.set(num, result);
  return result;
}

// We cache nChooseK so we can save on computations.
const nChooseKCache = new Map<string, number>();
export function nChooseK(n: number, k: number) {
  const key = `${n}|${k}`;
  const cache = nChooseKCache.get(key);

  if (cache != null) {
    return cache;
  }

  const result = factorial(n) / (factorial(k) * factorial(n - k));
  nChooseKCache.set(key, result);
  return result;
}

export function newtonsMethod(
  fn: (x: number) => number,
  deltaFn: (x: number) => number,
  startAt: number,
  maxIterations = Infinity,
  tolerance = 0.001
) {
  let x = startAt;
  let lastX = Infinity;
  let difference = Math.abs(x - lastX);
  let count = 0;

  while (difference > tolerance) {
    if (count >= maxIterations) {
      return Infinity;
    }
    x = x - fn(x) / deltaFn(x);
    difference = Math.abs(x - lastX);
    lastX = x;
    count++;
  }

  return x;
}
