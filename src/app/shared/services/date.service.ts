import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
  currentYearMonth(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  /** Returns today's date as YYYY-MM-DD using local time. */
  today(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  previousMonth(yearMonth: string): string {
    if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
      throw new Error(`DateService.previousMonth: invalid input "${yearMonth}"`);
    }
    const [year, month] = yearMonth.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      throw new Error(`DateService.previousMonth: invalid input "${yearMonth}"`);
    }
    if (month === 1) {
      return `${year - 1}-12`;
    }
    return `${year}-${String(month - 1).padStart(2, '0')}`;
  }

  isCurrentMonth(yearMonth: string): boolean {
    return this.classifyMonth(yearMonth) === 'current';
  }

  getDaysInMonth(yearMonth: string): number {
    if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
      throw new Error(`DateService.getDaysInMonth: invalid input "${yearMonth}"`);
    }
    const [year, month] = yearMonth.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      throw new Error(`DateService.getDaysInMonth: invalid input "${yearMonth}"`);
    }
    // month is 1-based from YYYY-MM (January=1, December=12).
    // Passed directly to JS Date's 0-based month arg it points to the month AFTER
    // the input. Day 0 of any month = last day of the previous month, so this
    // returns the last day of the input month.
    // CAUTION: do NOT subtract 1 from month here — that returns the last day of
    // the previous month, not the current one.
    return new Date(year, month, 0).getDate();
  }

  isAfterCurrentMonth(yearMonth: string): boolean {
    return this.classifyMonth(yearMonth) === 'future';
  }

  /**
   * Classifies yearMonth relative to the current month using a single clock
   * snapshot. Use this instead of calling isCurrentMonth() and
   * isAfterCurrentMonth() separately when you need both results to be
   * consistent (avoids a theoretical midnight race between two new Date() calls).
   */
  classifyMonth(yearMonth: string): 'past' | 'current' | 'future' {
    if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
      throw new Error(`DateService.classifyMonth: invalid input "${yearMonth}"`);
    }
    const month = Number(yearMonth.split('-')[1]);
    if (month < 1 || month > 12) {
      throw new Error(`DateService.classifyMonth: invalid month in "${yearMonth}"`);
    }
    const current = this.currentYearMonth();
    if (yearMonth === current) return 'current';
    return yearMonth > current ? 'future' : 'past';
  }
}
