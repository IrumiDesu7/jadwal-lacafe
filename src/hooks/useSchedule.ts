import { useState, useCallback } from 'react';
import { type Staff, type Schedule, type DayOfWeek, type ShiftType, DAYS_OF_WEEK } from '@/types/schedule';

export const useSchedule = () => {
  const [staff, setStaff] = useState<Staff[]>([
    { id: '1', name: 'ITA' },
    { id: '2', name: 'EBI' },
    { id: '3', name: 'MIRZAN' },
    { id: '4', name: 'CANTIKA' },
    { id: '5', name: 'GEBI' },
  ]);

  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initialSchedule: Schedule = {};
    staff.forEach(staffMember => {
      initialSchedule[staffMember.id] = {
        SENIN: 'PAGI',
        SELASA: 'PAGI', 
        RABU: 'PAGI',
        KAMIS: 'MALAM',
        JUMAT: 'PAGI',
        SABTU: 'PAGI',
        MINGGU: 'LIBUR'
      };
    });
    
    initialSchedule['1'] = {
      SENIN: 'PAGI',
      SELASA: 'PAGI',
      RABU: 'PAGI',
      KAMIS: 'MALAM',
      JUMAT: 'PAGI',
      SABTU: 'PAGI',
      MINGGU: 'LIBUR'
    };
    
    initialSchedule['2'] = {
      SENIN: 'LIBUR',
      SELASA: 'PAGI',
      RABU: 'PAGI',
      KAMIS: 'PAGI',
      JUMAT: 'PAGI',
      SABTU: 'PAGI',
      MINGGU: 'PAGI'
    };
    
    initialSchedule['3'] = {
      SENIN: 'MALAM',
      SELASA: 'MALAM',
      RABU: 'MALAM',
      KAMIS: 'PAGI',
      JUMAT: 'LIBUR',
      SABTU: 'MALAM',
      MINGGU: 'PAGI'
    };
    
    initialSchedule['4'] = {
      SENIN: 'MALAM',
      SELASA: 'MALAM',
      RABU: 'LIBUR',
      KAMIS: 'MALAM',
      JUMAT: 'MALAM',
      SABTU: 'MALAM',
      MINGGU: 'MALAM'
    };
    
    initialSchedule['5'] = {
      SENIN: 'MALAM',
      SELASA: 'MALAM',
      RABU: 'MALAM',
      KAMIS: 'LIBUR',
      JUMAT: 'MALAM',
      SABTU: 'MALAM',
      MINGGU: 'MALAM'
    };
    
    return initialSchedule;
  });

  const addStaff = useCallback((name: string) => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      name: name.toUpperCase()
    };
    
    setStaff(prev => [...prev, newStaff]);
    
    setSchedule(prev => ({
      ...prev,
      [newStaff.id]: DAYS_OF_WEEK.reduce((acc, day) => {
        acc[day] = 'PAGI';
        return acc;
      }, {} as Record<DayOfWeek, ShiftType>)
    }));
  }, []);

  const removeStaff = useCallback((staffId: string) => {
    setStaff(prev => prev.filter(s => s.id !== staffId));
    setSchedule(prev => {
      const newSchedule = { ...prev };
      delete newSchedule[staffId];
      return newSchedule;
    });
  }, []);

  const updateSchedule = useCallback((staffId: string, day: DayOfWeek, shift: ShiftType) => {
    setSchedule(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        [day]: shift
      }
    }));
  }, []);

  const moveStaff = useCallback((fromIndex: number, toIndex: number) => {
    setStaff(prev => {
      const newStaff = [...prev];
      const [movedStaff] = newStaff.splice(fromIndex, 1);
      newStaff.splice(toIndex, 0, movedStaff);
      return newStaff;
    });
  }, []);

  const swapSchedule = useCallback((
    staffId1: string, 
    day1: DayOfWeek, 
    staffId2: string, 
    day2: DayOfWeek
  ) => {
    setSchedule(prev => {
      const shift1 = prev[staffId1]?.[day1];
      const shift2 = prev[staffId2]?.[day2];
      
      if (!shift1 || !shift2) return prev;
      
      // Handle same staff member swap
      if (staffId1 === staffId2) {
        return {
          ...prev,
          [staffId1]: {
            ...prev[staffId1],
            [day1]: shift2,
            [day2]: shift1
          }
        };
      }
      
      // Handle different staff members swap
      return {
        ...prev,
        [staffId1]: {
          ...prev[staffId1],
          [day1]: shift2
        },
        [staffId2]: {
          ...prev[staffId2],
          [day2]: shift1
        }
      };
    });
  }, []);

  return {
    staff,
    schedule,
    addStaff,
    removeStaff,
    updateSchedule,
    moveStaff,
    swapSchedule
  };
};