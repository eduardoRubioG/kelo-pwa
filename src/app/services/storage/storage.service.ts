import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  has(key: string): boolean {
    return Boolean(localStorage.getItem(key));
  }

  clearAll(): void {
    localStorage.clear();
  }
}
