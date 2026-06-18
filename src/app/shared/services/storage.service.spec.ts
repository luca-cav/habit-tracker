import { TestBed } from '@angular/core/testing';
import { StorageService, STORAGE_KEY } from './storage.service';
import { AppData } from '../models/app-data.model';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return default AppData when localStorage is empty', () => {
    const result = service.load();
    expect(result).toEqual({ schemaVersion: 1, habits: [], checkoffs: [] });
  });

  it('should persist and reload AppData unchanged', () => {
    const data: AppData = {
      schemaVersion: 1,
      habits: [{ id: 'abc-123', name: 'Math', color: '#3F51B5', createdAt: '2026-06-16T10:00:00.000Z', archivedAt: null }],
      checkoffs: [],
    };
    service.save(data);
    expect(service.load()).toEqual(data);
  });

  it('should write only to key mht_data', () => {
    service.save({ schemaVersion: 1, habits: [], checkoffs: [] });
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it('should return default AppData when localStorage contains corrupted JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');
    expect(service.load()).toEqual({ schemaVersion: 1, habits: [], checkoffs: [] });
  });

  it('should return default AppData when localStorage contains valid JSON with wrong shape', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
    expect(service.load()).toEqual({ schemaVersion: 1, habits: [], checkoffs: [] });
  });

  describe('isAvailable()', () => {
    it('should return true when localStorage is functional', () => {
      expect(service.isAvailable()).toBe(true);
    });

    it('should set hasError to true and call console.error on QuotaExceededError in save()', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      service.save({ schemaVersion: 1, habits: [], checkoffs: [] });

      expect(service.hasError()).toBe(true);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should reset hasError to false when a subsequent save succeeds', () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      service.save({ schemaVersion: 1, habits: [], checkoffs: [] });
      expect(service.hasError()).toBe(true);

      service.save({ schemaVersion: 1, habits: [], checkoffs: [] });
      expect(service.hasError()).toBe(false);
    });
  });

  describe('isAvailable() — unavailable path', () => {
    let unavailableService: StorageService;

    beforeEach(() => {
      // Reset TestBed first, then mock setItem BEFORE service construction
      TestBed.resetTestingModule();
      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new DOMException('SecurityError', 'SecurityError');
      });
      TestBed.configureTestingModule({});
      unavailableService = TestBed.inject(StorageService);
    });

    it('should return false when localStorage.setItem throws on init', () => {
      expect(unavailableService.isAvailable()).toBe(false);
    });
  });
});
