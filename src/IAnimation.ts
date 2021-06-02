export type AnimationState<T> = { [key: string]: T };

export default interface IAnimation<T> {
  name: string;
  currentValues: AnimationState<T>;
  update(time: number): IAnimation<T>;
}
