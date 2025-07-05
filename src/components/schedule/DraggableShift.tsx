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
  } : undefined;

  return (
    <Badge
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      variant="outline"
      className={cn(
        'cursor-grab active:cursor-grabbing transition-all',
        SHIFT_COLORS[shift],
        isDragging && 'opacity-50 z-50'
      )}
    >
      {shift}
    </Badge>
  );
};