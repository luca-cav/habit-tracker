import { Habit } from '../models/habit.model';
import { CheckoffRecord } from '../models/checkoff-record.model';

export const MOCK_HABITS: Habit[] = [
  { id: 'h1-mock-math-uuid-0001', name: 'Matematica', color: '#3F51B5', createdAt: '2026-01-10T08:00:00.000Z', archivedAt: null },
  { id: 'h2-mock-phys-uuid-0002', name: 'Fisica', color: '#009688', createdAt: '2026-01-10T08:01:00.000Z', archivedAt: null },
  { id: 'h3-mock-hist-uuid-0003', name: 'Storia', color: '#FF9800', createdAt: '2026-01-10T08:02:00.000Z', archivedAt: null },
  { id: 'h4-mock-lang-uuid-0004', name: 'Inglese', color: '#E91E63', createdAt: '2026-02-01T08:00:00.000Z', archivedAt: null },
  { id: 'h5-mock-phil-uuid-0005', name: 'Filosofia', color: '#4CAF50', createdAt: '2026-03-01T08:00:00.000Z', archivedAt: null },
];

/**
 * Creates checkoff records relative to the given date.
 * Pass an explicit `now` in tests that control the clock — vi.useFakeTimers()
 * does not re-evaluate this module, so the factory is the only way to get
 * checkoffs tied to a specific point in time.
 *
 * Distribution (days valid in every month, including Feb 28):
 * Current month:  day 5 → 3 habits, day 8 → 1, day 10 → 5 (max), day 15 → 4, day 18 → 2
 * Previous month: day 12 → 2, day 20 → 5 (max), day 25 → 1
 */
export function createMockCheckoffs(now = new Date()): CheckoffRecord[] {
  const curY = now.getFullYear();
  const curM = now.getMonth() + 1;
  const prevM = curM === 1 ? 12 : curM - 1;
  const prevY = curM === 1 ? curY - 1 : curY;
  const CUR = `${curY}-${String(curM).padStart(2, '0')}`;
  const PREV = `${prevY}-${String(prevM).padStart(2, '0')}`;

  return [
    // Current month — 3 habits on day 5
    { id: 'c01-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${CUR}-05`, notes: null, hours: null, createdAt: `${CUR}-05T09:00:00.000Z` },
    { id: 'c02-mock-uuid', habitId: 'h2-mock-phys-uuid-0002', date: `${CUR}-05`, notes: null, hours: null, createdAt: `${CUR}-05T09:01:00.000Z` },
    { id: 'c03-mock-uuid', habitId: 'h3-mock-hist-uuid-0003', date: `${CUR}-05`, notes: null, hours: null, createdAt: `${CUR}-05T09:02:00.000Z` },

    // Current month — 1 habit on day 8
    { id: 'c04-mock-uuid', habitId: 'h2-mock-phys-uuid-0002', date: `${CUR}-08`, notes: null, hours: null, createdAt: `${CUR}-08T10:00:00.000Z` },

    // Current month — 5 habits on day 10 (maximum intensity)
    { id: 'c05-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${CUR}-10`, notes: null, hours: null, createdAt: `${CUR}-10T08:00:00.000Z` },
    { id: 'c06-mock-uuid', habitId: 'h2-mock-phys-uuid-0002', date: `${CUR}-10`, notes: null, hours: null, createdAt: `${CUR}-10T08:01:00.000Z` },
    { id: 'c07-mock-uuid', habitId: 'h3-mock-hist-uuid-0003', date: `${CUR}-10`, notes: null, hours: null, createdAt: `${CUR}-10T08:02:00.000Z` },
    { id: 'c08-mock-uuid', habitId: 'h4-mock-lang-uuid-0004', date: `${CUR}-10`, notes: null, hours: null, createdAt: `${CUR}-10T08:03:00.000Z` },
    { id: 'c09-mock-uuid', habitId: 'h5-mock-phil-uuid-0005', date: `${CUR}-10`, notes: null, hours: null, createdAt: `${CUR}-10T08:04:00.000Z` },

    // Current month — 4 habits on day 15
    { id: 'c10-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${CUR}-15`, notes: null, hours: null, createdAt: `${CUR}-15T09:00:00.000Z` },
    { id: 'c11-mock-uuid', habitId: 'h2-mock-phys-uuid-0002', date: `${CUR}-15`, notes: null, hours: null, createdAt: `${CUR}-15T09:01:00.000Z` },
    { id: 'c12-mock-uuid', habitId: 'h4-mock-lang-uuid-0004', date: `${CUR}-15`, notes: null, hours: null, createdAt: `${CUR}-15T09:02:00.000Z` },
    { id: 'c13-mock-uuid', habitId: 'h5-mock-phil-uuid-0005', date: `${CUR}-15`, notes: null, hours: null, createdAt: `${CUR}-15T09:03:00.000Z` },

    // Current month — 2 habits on day 18
    { id: 'c14-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${CUR}-18`, notes: null, hours: null, createdAt: `${CUR}-18T09:00:00.000Z` },
    { id: 'c15-mock-uuid', habitId: 'h3-mock-hist-uuid-0003', date: `${CUR}-18`, notes: null, hours: null, createdAt: `${CUR}-18T09:01:00.000Z` },

    // Previous month — 2 habits on day 12
    { id: 'c16-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${PREV}-12`, notes: null, hours: null, createdAt: `${PREV}-12T10:00:00.000Z` },
    { id: 'c17-mock-uuid', habitId: 'h4-mock-lang-uuid-0004', date: `${PREV}-12`, notes: null, hours: null, createdAt: `${PREV}-12T10:01:00.000Z` },

    // Previous month — 5 habits on day 20 (maximum intensity)
    { id: 'c18-mock-uuid', habitId: 'h1-mock-math-uuid-0001', date: `${PREV}-20`, notes: null, hours: null, createdAt: `${PREV}-20T08:00:00.000Z` },
    { id: 'c19-mock-uuid', habitId: 'h2-mock-phys-uuid-0002', date: `${PREV}-20`, notes: null, hours: null, createdAt: `${PREV}-20T08:01:00.000Z` },
    { id: 'c20-mock-uuid', habitId: 'h3-mock-hist-uuid-0003', date: `${PREV}-20`, notes: null, hours: null, createdAt: `${PREV}-20T08:02:00.000Z` },
    { id: 'c21-mock-uuid', habitId: 'h4-mock-lang-uuid-0004', date: `${PREV}-20`, notes: null, hours: null, createdAt: `${PREV}-20T08:03:00.000Z` },
    { id: 'c22-mock-uuid', habitId: 'h5-mock-phil-uuid-0005', date: `${PREV}-20`, notes: null, hours: null, createdAt: `${PREV}-20T08:04:00.000Z` },

    // Previous month — 1 habit on day 25
    { id: 'c23-mock-uuid', habitId: 'h3-mock-hist-uuid-0003', date: `${PREV}-25`, notes: null, hours: null, createdAt: `${PREV}-25T09:00:00.000Z` },
  ];
}

// Pre-computed at module load. Use createMockCheckoffs(specificDate) in tests
// that need time control — vi.useFakeTimers() does not re-evaluate this module.
export const MOCK_CHECKOFFS: CheckoffRecord[] = createMockCheckoffs();
