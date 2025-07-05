import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical, X } from 'lucide-react';
import { type Staff } from '@/types/schedule';
import { cn } from '@/lib/utils';

interface DraggableStaffNameProps {
  staff: Staff;
  onRemove: (staffId: string) => void;
  canRemove?: boolean;
}

export const DraggableStaffName = ({ staff, onRemove, canRemove = true }: DraggableStaffNameProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: staff.id,
    data: { 
      type: 'staff-name',
      staff 
    },
    transition: {
      duration: 250,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 p-2 h-12 bg-white border-r border-gray-200 font-medium transition-all duration-200',
        isDragging && 'opacity-50 z-10 scale-105 shadow-lg'
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing hover:bg-gray-50 rounded p-1 transition-colors duration-150"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      
      <span className="flex-1 text-sm font-medium">{staff.name}</span>
      
      {canRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
          onClick={() => onRemove(staff.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};