We need to make Keyframes functions that have a start and end. The new interface would be.

```ts
interface Keyframe<T> {
  startAt: number;
  endAt: number;
  update(time)=>T;
}
```

We would then create function or classes to implement that interface.