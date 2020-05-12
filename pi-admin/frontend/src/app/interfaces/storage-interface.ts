export interface StorageInterface extends Storage {
  setJson(key: string, data: any): void;

  getJson(key: string): any;
}
