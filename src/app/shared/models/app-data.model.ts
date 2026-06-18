import { Habit } from './habit.model';
import { CheckoffRecord } from './checkoff-record.model';

export interface AppData {
  schemaVersion: number;
  habits: Habit[];
  checkoffs: CheckoffRecord[];
}
