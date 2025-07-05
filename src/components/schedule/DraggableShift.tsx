import { useDraggable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { type ShiftType, SHIFT_COLORS } from '@/types/schedule';
import { cn } from '@/lib/utils';

interface DraggableShiftProps {
  shift: ShiftType;
  id: string;
}

export const DraggableShift = ({ shift, id }: DraggableShiftProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type: 'shift', shift }
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
        'cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105',
        SHIFT_COLORS[shift],
        isDragging && 'opacity-60 z-50 scale-110 shadow-lg'
      )}
    >
      {shift}
    </Badge>
  );
};