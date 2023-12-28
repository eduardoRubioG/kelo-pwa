import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, value: unknown, sessionOnly = false): void {
    if (sessionOnly) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Set and return if value does not exist in storage. Otherwise return existing value.
  setIfDoesNotExist<T>(key: string, value: T, sessionOnly = false): T {
    const doesExist = this.has(key, sessionOnly);
    if (!doesExist) {
      this.set(key, value, sessionOnly);
      return value;
    } else {
      return this.get(key, sessionOnly);
    }
  }

  get(key: string, sessionOnly = false): any {
    const value = sessionOnly
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  has(key: string, sessionOnly = false): boolean {
    return sessionOnly
      ? Boolean(sessionStorage.getItem(key))
      : Boolean(localStorage.getItem(key));
  }

  clearAll(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
