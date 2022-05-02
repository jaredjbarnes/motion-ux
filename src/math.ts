export function simpsonsRule(
  lowerBound: number,
  upperBound: number,
  f: (x: number) => number,
  n: number = 4
) {
  // Use Simpsons Rule to calculate the distance.
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

export function bernsteinPolynomial(v: number, n: number, x: number) {
  if (v > n || v < 0) {
    return 0;
  }
  const binomialCoefficient = nChooseK(n, v);
  const tValue = Math.pow(x, v);
  const remainingT = Math.pow(1 - x, n - v);

  return binomialCoefficient * tValue * remainingT;
}

export function factorial(num: number) {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}

export function nChooseK(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}
