import { useDroppable } from '@dnd-kit/core';
import { type ShiftType } from '@/types/schedule';
import { DraggableScheduleShift } from './DraggableScheduleShift';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ScheduleCellProps {
  staffId: string;
  day: string;
  shift: ShiftType;
  onShiftChange: (shift: ShiftType) => void;
}

export const ScheduleCell = ({ staffId, day, shift, onShiftChange }: ScheduleCellProps) => {
  const dropId = `${staffId}-${day}`;
  const [justSwapped, setJustSwapped] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    data: { staffId, day, type: 'schedule-cell' }
  });

  useEffect(() => {
    if (justSwapped) {
      const timer = setTimeout(() => setJustSwapped(false), 400);
      return () => clearTimeout(timer);
    }
  }, [justSwapped]);

  useEffect(() => {
    // Only trigger swap animation if not currently in a drag operation
    if (!isDragActive) {
      setJustSwapped(true);
    }
  }, [shift, isDragActive]);

  useEffect(() => {
    // Track drag state to prevent animation conflicts
    const handleDragStart = () => setIsDragActive(true);
    const handleDragEnd = () => {
      setIsDragActive(false);
      // Small delay to allow drag to complete before enabling animations
      setTimeout(() => setJustSwapped(true), 50);
    };

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'p-2 h-12 flex items-center justify-center border-r border-gray-200 transition-all duration-200',
        isOver && 'bg-blue-50 border-blue-300 ring-2 ring-blue-400 ring-offset-1 scale-105',
        justSwapped && !isDragActive && 'swap-animation'
      )}
    >
      <DraggableScheduleShift
        id={dropId}
        shift={shift}
        staffId={staffId}
        day={day}
        onClick={() => {
          const shifts: ShiftType[] = ['PAGI', 'MALAM', 'LIBUR'];
          const currentIndex = shifts.indexOf(shift);
          const nextIndex = (currentIndex + 1) % shifts.length;
          onShiftChange(shifts[nextIndex]);
        }}
      />
    </div>
  );
};