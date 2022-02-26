export type AnimationState<T> = { [key: string]: T };

export default interface IAnimation<T> {
  name: string;
  time: number;
  delay: number;
  duration: number;
  currentValues: AnimationState<T>;
  update(time: number): IAnimation<T>;
  clone(): IAnimation<T>;
}
