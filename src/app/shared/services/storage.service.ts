import { Injectable, signal } from '@angular/core';
import { AppData } from '../models/app-data.model';

export const STORAGE_KEY = 'mht_data';

function defaultAppData(): AppData {
  return { schemaVersion: 1, habits: [], checkoffs: [] };
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly _isAvailable: boolean = this._checkAvailable();
  private readonly _hasError = signal<boolean>(false);
  readonly hasError = this._hasError.asReadonly();

  isAvailable(): boolean {
    return this._isAvailable;
  }

  private _checkAvailable(): boolean {
    try {
      const k = '__mht_avail__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch {
      return false;
    }
  }

  load(): AppData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultAppData();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed?.habits) || !Array.isArray(parsed?.checkoffs)) {
        console.warn('[StorageService] mht_data shape invalid — resetting to defaults');
        this._hasError.set(true);
        return defaultAppData();
      }
      return parsed as AppData;
    } catch {
      console.warn('[StorageService] mht_data corrupted or storage unavailable — resetting to defaults');
      this._hasError.set(true);
      return defaultAppData();
    }
  }

  save(data: AppData): void {
    if (!this._isAvailable) {
      this._hasError.set(true);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this._hasError.set(false);
    } catch (e) {
      this._hasError.set(true);
      console.error('[StorageService] localStorage quota exceeded or write failed', e);
    }
  }
}
