export type TickCallback = () => void;

export interface IClock {
  register(callback: TickCallback): void;
  unregister(callback: TickCallback): void;
  now(): number;
}
