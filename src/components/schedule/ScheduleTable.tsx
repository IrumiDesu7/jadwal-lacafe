import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { DAYS_OF_WEEK, type Staff, type Schedule, type ShiftType, type DayOfWeek } from '@/types/schedule';
import { DraggableStaffName } from './DraggableStaffName';
import { DraggableShift } from './DraggableShift';
import { ScheduleCell } from './ScheduleCell';
import { StaffManager } from './StaffManager';
import { useState } from 'react';

type StaffDragData = {
  type: 'staff-name';
  staff: Staff;
};

type ShiftDragData = {
  type: 'shift';
  shift: ShiftType;
};

type DragData = StaffDragData | ShiftDragData;

interface ScheduleTableProps {
  staff: Staff[];
  schedule: Schedule;
  onUpdateSchedule: (staffId: string, day: DayOfWeek, shift: ShiftType) => void;
  onMoveStaff: (fromIndex: number, toIndex: number) => void;
  onRemoveStaff: (staffId: string) => void;
  onAddStaff: (name: string) => void;
}

export const ScheduleTable = ({
  staff,
  schedule,
  onUpdateSchedule,
  onMoveStaff,
  onRemoveStaff,
  onAddStaff
}: ScheduleTableProps) => {
  const [draggedItem, setDraggedItem] = useState<DragData | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(event.active.data.current as DragData || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setDraggedItem(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'staff-name' && overData?.type === 'staff-name') {
      const oldIndex = staff.findIndex(s => s.id === active.id);
      const newIndex = staff.findIndex(s => s.id === over.id);
      
      if (oldIndex !== newIndex) {
        onMoveStaff(oldIndex, newIndex);
      }
    }

    if (activeData?.type === 'shift' && overData?.type === 'schedule-cell') {
      const { staffId, day } = overData;
      const shift = activeData.shift as ShiftType;
      onUpdateSchedule(staffId, day as DayOfWeek, shift);
    }

    setDraggedItem(null);
  };

  const renderDragOverlay = () => {
    if (!draggedItem) return null;

    if (draggedItem.type === 'staff-name') {
      const staff = draggedItem.staff;
      return (
        <div className="bg-white border rounded px-2 py-1 shadow-lg">
          {staff.name}
        </div>
      );
    }

    if (draggedItem.type === 'shift') {
      const shift = draggedItem.shift;
      return <DraggableShift shift={shift} id={`overlay-${shift}`} />;
    }

    return null;
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Jadwal Mingguan</h1>
          <StaffManager onAddStaff={onAddStaff} />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Drag shifts:</span>
            <DraggableShift shift="PAGI" id="draggable-pagi" />
            <DraggableShift shift="MALAM" id="draggable-malam" />
            <DraggableShift shift="LIBUR" id="draggable-libur" />
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">NAMA</TableHead>
                {DAYS_OF_WEEK.map((day) => (
                  <TableHead key={day} className="text-center">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext items={staff.map(s => s.id)} strategy={verticalListSortingStrategy}>
                {staff.map((staffMember) => (
                  <TableRow key={staffMember.id}>
                    <TableCell className="p-0">
                      <DraggableStaffName
                        staff={staffMember}
                        onRemove={onRemoveStaff}
                        canRemove={staff.length > 1}
                      />
                    </TableCell>
                    {DAYS_OF_WEEK.map((day) => (
                      <TableCell key={day} className="p-0">
                        <ScheduleCell
                          staffId={staffMember.id}
                          day={day}
                          shift={schedule[staffMember.id]?.[day] || 'PAGI'}
                          onShiftChange={(shift) => onUpdateSchedule(staffMember.id, day, shift)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </Card>
      </div>

      <DragOverlay>{renderDragOverlay()}</DragOverlay>
    </DndContext>
  );
};