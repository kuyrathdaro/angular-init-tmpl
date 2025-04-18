import { Injectable } from '@angular/core';
import { LocalStorageEnum } from "../types/enums/local-storage.enum";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {  
  constructor() { }

  get(key: LocalStorageEnum): string | null {
    const prefix = btoa(key).replace(/=/g, '');
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    try {
      const base64 = atob(item).replace(prefix, '');
      return atob(base64);
    } catch (error) {
      return '';
    }
  }

  set(key: LocalStorageEnum, value: string) {
    const prefix = btoa(key).replace(/=/g, '');
    const base64 = btoa(value);
    localStorage.setItem(key, btoa(prefix + base64));
  }

  setArray(key: LocalStorageEnum, values: string[]) {
    const value = values.toString();
    this.set(key, value);
  }

  getArray(key: LocalStorageEnum): string[] {
    const value = this.get(key);
    return value ? value.split(',') : [];
  }

  delete(key: LocalStorageEnum) {
    localStorage.removeItem(key);
  }
  
}
