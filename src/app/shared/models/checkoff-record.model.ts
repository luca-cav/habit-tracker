export interface CheckoffRecord {
  id: string;
  habitId: string;
  date: string;
  notes: string | null;
  hours: number | null;
  createdAt: string;
}
