export interface TransformerInterface<I, T> {
  transform(data: I): T;
}
