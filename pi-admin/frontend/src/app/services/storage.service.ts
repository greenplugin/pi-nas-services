import {Injectable} from '@angular/core';
import {StorageInterface} from '../interfaces/storage-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageInterface {

  constructor() {
  }

  readonly length: number;

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  getJson(key: string): any {
    return JSON.parse(this.getItem(key));
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setJson(key: string, data: any): void {
    this.setItem(key, JSON.stringify(data));
  }
}
