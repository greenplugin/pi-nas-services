export interface AsyncTransformerInterface<I, T> {
  transform(data: I): Promise<T>;
}
