We need to make Keyframes functions that have a start and end. The new interface would be.

```ts
interface Keyframe<T> {
  property: string;
  startAt: number;
  endAt: number;
  from: T;
  to: T;
  controls: BezierCurve;
  easing: BezierCurve;
}
```

We would then create function or classes to implement that interface.


There is a problem with extend animation changing its currentValues from the original then
to the extended slopes. We need to make one object that both animations assign on update.
