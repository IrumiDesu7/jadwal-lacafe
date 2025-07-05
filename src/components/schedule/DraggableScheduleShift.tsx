import { useDraggable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { type ShiftType, SHIFT_COLORS } from '@/types/schedule';
import { cn } from '@/lib/utils';

interface DraggableScheduleShiftProps {
  id: string;
  shift: ShiftType;
  staffId: string;
  day: string;
  onClick?: () => void;
}

export const DraggableScheduleShift = ({ 
  id, 
  shift, 
  staffId, 
  day,
  onClick 
}: DraggableScheduleShiftProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { 
      type: 'schedule-shift', 
      shift,
      sourceStaffId: staffId,
      sourceDay: day
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: 'transform 200ms ease',
  } : undefined;

  return (
    <Badge
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      variant="outline"
      className={cn(
        'cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 select-none',
        SHIFT_COLORS[shift],
        isDragging && 'opacity-60 z-50 scale-110'
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {shift}
    </Badge>
  );
};