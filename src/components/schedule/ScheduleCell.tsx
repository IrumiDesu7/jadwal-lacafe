import { useDroppable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { type ShiftType, SHIFT_COLORS } from '@/types/schedule';
import { cn } from '@/lib/utils';

interface ScheduleCellProps {
  staffId: string;
  day: string;
  shift: ShiftType;
  onShiftChange: (shift: ShiftType) => void;
}

export const ScheduleCell = ({ staffId, day, shift, onShiftChange }: ScheduleCellProps) => {
  const dropId = `${staffId}-${day}`;
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    data: { staffId, day, type: 'schedule-cell' }
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'p-2 h-12 flex items-center justify-center border-r border-gray-200 transition-colors',
        isOver && 'bg-blue-50 border-blue-300'
      )}
    >
      <Badge
        variant="outline"
        className={cn(
          'cursor-pointer transition-colors',
          SHIFT_COLORS[shift]
        )}
        onClick={() => {
          const shifts: ShiftType[] = ['PAGI', 'MALAM', 'LIBUR'];
          const currentIndex = shifts.indexOf(shift);
          const nextIndex = (currentIndex + 1) % shifts.length;
          onShiftChange(shifts[nextIndex]);
        }}
      >
        {shift}
      </Badge>
    </div>
  );
};