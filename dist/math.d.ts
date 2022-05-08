export declare function simpsonsRule(lowerBound: number, upperBound: number, f: (x: number) => number, n?: number): number;
export declare function bernsteinPolynomial(v: number, n: number, x: number): number;
export declare function factorial(num: number): number;
export declare function nChooseK(n: number, k: number): number;
export declare function newtonsMethod(fn: (x: number) => number, deltaFn: (x: number) => number, startAt: number, maxIterations?: number, tolerance?: number): number;
