import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  describe('currentYearMonth()', () => {
    it('should return the current year and month in YYYY-MM format', () => {
      const now = new Date();
      const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      expect(service.currentYearMonth()).toBe(expected);
    });
  });

  describe('today()', () => {
    it('should return current date in YYYY-MM-DD format', () => {
      const now = new Date();
      const expected =
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, '0')}-` +
        `${String(now.getDate()).padStart(2, '0')}`;
      expect(service.today()).toBe(expected);
    });

    it('should return a value whose YYYY-MM prefix matches currentYearMonth()', () => {
      expect(service.today().substring(0, 7)).toBe(service.currentYearMonth());
    });
  });

  describe('previousMonth()', () => {
    it('should decrement month within same year', () => {
      expect(service.previousMonth('2026-06')).toBe('2026-05');
    });

    it('should roll back to December of previous year on January', () => {
      expect(service.previousMonth('2026-01')).toBe('2025-12');
    });

    it('should pad single-digit months with leading zero', () => {
      expect(service.previousMonth('2026-10')).toBe('2026-09');
    });

    it('should throw on empty string', () => {
      expect(() => service.previousMonth('')).toThrow();
    });

    it('should throw on non-numeric input', () => {
      expect(() => service.previousMonth('invalid')).toThrow();
    });

    it('should throw on unpadded month', () => {
      expect(() => service.previousMonth('2026-9')).toThrow();
    });
  });

  describe('getDaysInMonth()', () => {
    it('should return 31 for January', () => {
      expect(service.getDaysInMonth('2026-01')).toBe(31);
    });

    it('should return 28 for February in a non-leap year', () => {
      expect(service.getDaysInMonth('2026-02')).toBe(28);
    });

    it('should return 29 for February in a leap year', () => {
      expect(service.getDaysInMonth('2024-02')).toBe(29);
    });

    it('should return 30 for April', () => {
      expect(service.getDaysInMonth('2026-04')).toBe(30);
    });

    it('should return 31 for December', () => {
      expect(service.getDaysInMonth('2026-12')).toBe(31);
    });

    it('should throw on empty string', () => {
      expect(() => service.getDaysInMonth('')).toThrow();
    });

    it('should throw on non-numeric input', () => {
      expect(() => service.getDaysInMonth('invalid')).toThrow();
    });

    it('should throw on unpadded month', () => {
      expect(() => service.getDaysInMonth('2026-9')).toThrow();
    });
  });

  describe('classifyMonth()', () => {
    it('should return "current" for the current month', () => {
      const now = new Date();
      const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      expect(service.classifyMonth(current)).toBe('current');
    });

    it('should return "past" for a clearly past month', () => {
      expect(service.classifyMonth('2000-01')).toBe('past');
    });

    it('should return "future" for a clearly future month', () => {
      expect(service.classifyMonth('2099-12')).toBe('future');
    });

    it('should throw on unpadded single-digit month', () => {
      expect(() => service.classifyMonth('2026-9')).toThrow();
    });

    it('should throw on invalid format', () => {
      expect(() => service.classifyMonth('')).toThrow();
    });

    it('should throw on month 00', () => {
      expect(() => service.classifyMonth('2026-00')).toThrow();
    });

    it('should throw on month 13', () => {
      expect(() => service.classifyMonth('2026-13')).toThrow();
    });
  });

  describe('isCurrentMonth()', () => {
    it('should return true for the current month', () => {
      const now = new Date();
      const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      expect(service.isCurrentMonth(current)).toBe(true);
    });

    it('should return false for a past month', () => {
      expect(service.isCurrentMonth('2000-01')).toBe(false);
    });

    it('should return false for a future month', () => {
      expect(service.isCurrentMonth('2099-12')).toBe(false);
    });
  });

  describe('isAfterCurrentMonth()', () => {
    it('should return true for a clearly future month', () => {
      expect(service.isAfterCurrentMonth('2099-01')).toBe(true);
    });

    it('should return false for a clearly past month', () => {
      expect(service.isAfterCurrentMonth('2000-01')).toBe(false);
    });

    it('should return false for the current month', () => {
      const now = new Date();
      const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      expect(service.isAfterCurrentMonth(current)).toBe(false);
    });
  });
});
