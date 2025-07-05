export type ShiftType = 'PAGI' | 'MALAM' | 'LIBUR';

export type DayOfWeek = 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU' | 'MINGGU';

export interface Staff {
  id: string;
  name: string;
}

export interface ScheduleEntry {
  staffId: string;
  day: DayOfWeek;
  shift: ShiftType;
}

export interface Schedule {
  [staffId: string]: {
    [day in DayOfWeek]: ShiftType;
  };
}

export interface DragItem {
  id: string;
  type: 'staff' | 'shift';
  data: Staff | ShiftType;
}

export interface DropResult {
  staffId: string;
  day: DayOfWeek;
  shift?: ShiftType;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'SENIN',
  'SELASA', 
  'RABU',
  'KAMIS',
  'JUMAT',
  'SABTU',
  'MINGGU'
];

export const SHIFT_TYPES: ShiftType[] = ['PAGI', 'MALAM', 'LIBUR'];

export const SHIFT_COLORS = {
  PAGI: 'bg-green-100 text-green-800 border-green-300',
  MALAM: 'bg-blue-100 text-blue-800 border-blue-300',
  LIBUR: 'bg-gray-100 text-gray-800 border-gray-300'
} as const;