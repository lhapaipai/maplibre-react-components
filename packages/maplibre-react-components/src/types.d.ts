export interface Event<T> {
  readonly type: string;
  target: T;
}
